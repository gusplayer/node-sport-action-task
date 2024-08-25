import { Injectable } from "@nestjs/common"

@Injectable()
export class PaginationUtil {
	getPagination(page: number, limit: number) {
		return {
			take: +limit,
			skip: (page - 1) * +limit
		}
	}

	getPaginationResponse(page: number, limit: number, total: number) {
		return {
			page: +page,
			limit: +limit,
			total: +total,
			totalPages: Math.ceil(total / limit),
			hasPrevious: page > 1,
			hasNext: total > page * limit
		}
	}
}
