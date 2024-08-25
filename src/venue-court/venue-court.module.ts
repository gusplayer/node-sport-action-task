import { Module } from '@nestjs/common';

import { VenueCourtController } from './venue-court.controller';
import { VenueCourtService } from './venue-court.service';

@Module({
  controllers: [VenueCourtController],
  providers: [VenueCourtService],
})
export class VenueCourtModule {}
