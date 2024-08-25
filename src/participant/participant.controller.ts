import { Controller, Get, Param, Query } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"

import { FilterParcicipantsDto } from "./dtos/filter-participants.dto"
import { ParticipantService } from "./participant.service"

@ApiTags("Participants")
@Controller("participants")
export class ParticipantController {
	constructor(private readonly participantService: ParticipantService) {}

	@Get(":id")
	async findParticipantById(@Param("id") id: string) {
		return this.participantService.findParticipantById(id)
	}

	@Get()
	async findParticipants(@Query() filter: FilterParcicipantsDto) {
		return this.participantService.findParticipants(filter)
	}
}
