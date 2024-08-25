import { Module } from '@nestjs/common';

import { SharedModule } from '@/shared/shared.module';

import { ParticipantController } from './participant.controller';
import { ParticipantService } from './participant.service';

@Module({
  controllers: [ParticipantController],
  providers: [ParticipantService],
  exports: [ParticipantService],
  imports: [SharedModule],
})
export class ParticipantModule {}
