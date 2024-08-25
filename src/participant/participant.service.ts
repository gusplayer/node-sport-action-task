import { Injectable } from "@nestjs/common"
import { Prisma } from "@prisma/client"

import { PrismaService } from "@/shared/services"
import { PaginationUtil } from "@/shared/utils"

import { FilterParcicipantsDto } from "./dtos/filter-participants.dto"

interface ParticipantsQueryResult {
	match_date: string
	coach_id: number
	first_name: string
	last_name: string
	venue_name: string
	team_count: number
	total_records: number
}

@Injectable()
export class ParticipantService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly paginationUtil: PaginationUtil
	) {}

	async findParticipants(filter: FilterParcicipantsDto) {
		const { page = 1, limit = 10, firstName, lastName } = filter
		const offset = (page - 1) * limit

		const result = await this.prismaService.$queryRaw<Array<ParticipantsQueryResult>>(Prisma.sql`
      WITH venue_counts AS (
        SELECT
            f.match_date,
            u.id AS coach_id,
            u.first_name,
            u.last_name,
            v.short_name AS venue_name,
            COUNT(DISTINCT t.id) AS team_count,
            COUNT(*) OVER() AS total_count -- Contar el total de filas en el mismo conjunto de resultados
        FROM
            fixture f
        JOIN
            draws d ON f.draw_id = d.id
        JOIN
            team t ON t.id IN (d.team1_id, d.team2_id)
        JOIN
            participant p ON p.team_id = t.id AND p.role = 'COACH'
        JOIN
            "user" u ON u.id = p.user_id
        JOIN
            venue_court vc ON f.venue_court_id = vc.id
        JOIN
            venue v ON vc.venue_id = v.id
        ${firstName || lastName ? Prisma.sql`WHERE` : Prisma.empty}
        ${firstName ? Prisma.sql`u.first_name ILIKE ${"%" + firstName + "%"}` : Prisma.empty}
        ${firstName && lastName ? Prisma.sql`AND` : Prisma.empty}
        ${lastName ? Prisma.sql`u.last_name ILIKE ${"%" + lastName + "%"}` : Prisma.empty}
        GROUP BY
            f.match_date, u.id, v.short_name
      )
      SELECT *,
             (SELECT total_count FROM venue_counts LIMIT 1) AS total_records
      FROM venue_counts
      ORDER BY match_date, coach_id
      LIMIT ${+limit} OFFSET ${+offset};
    `)

		const totalRecords = result.length > 0 ? result[0].total_records : 0

		const normalizedResult = result.map(({ team_count, ...rest }) => {
			return {
				...rest,
				team_count: Number(team_count)
			}
		})

		const allVenues = normalizedResult.map((row) => row.venue_name)

		const pagination = this.paginationUtil.getPaginationResponse(
			+page,
			+limit,
			Number(totalRecords)
		)

		return {
			participants: this.processVenueCounts(normalizedResult),
			allVenues: Array.from(new Set(allVenues)),
			pagination
		}
	}

	processVenueCounts(data: Array<ParticipantsQueryResult>) {
		const result = {}

		data.forEach((row) => {
			const dateKey = this.normalizeDate(row.match_date)
			const coachKey = `${row.first_name} ${row.last_name}`

			if (!result[dateKey]) {
				result[dateKey] = []
			}

			let coachEntry = result[dateKey].find((entry) => entry.coach === coachKey)

			if (!coachEntry) {
				coachEntry = {
					coach: coachKey,
					total: 0,
					venues: {}
				}
				result[dateKey].push(coachEntry)
			}

			coachEntry.total += row.team_count
			coachEntry.venues[row.venue_name] = row.team_count
		})

		return result
	}

	normalizeDate(date: string) {
		return new Date(date).toISOString().split("T")[0]
	}
}
