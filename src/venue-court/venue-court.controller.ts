import { Controller } from '@nestjs/common';

import { VenueCourtService } from './venue-court.service';

@Controller('venue-court')
export class VenueCourtController {
  constructor(private readonly venueCourtService: VenueCourtService) {}
}
