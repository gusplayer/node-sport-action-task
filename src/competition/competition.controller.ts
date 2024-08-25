import { Controller } from '@nestjs/common';

import { CompetitionService } from './competition.service';

@Controller('competition')
export class CompetitionController {
  constructor(private readonly competitionService: CompetitionService) {}
}
