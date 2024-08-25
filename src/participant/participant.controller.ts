import { Controller, Get, Query } from "@nestjs/common"

import { FilterParcicipantsDto } from "./dtos/filter-participants.dto"
import { ParticipantService } from "./participant.service"

@Controller("participants")
export class ParticipantController {
	constructor(private readonly participantService: ParticipantService) {}

	@Get()
	async findParticipants(@Query() filter: FilterParcicipantsDto) {
		return this.participantService.findParticipants(filter)
	}
}
