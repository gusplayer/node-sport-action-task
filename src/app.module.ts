import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompetitionModule } from './competition/competition.module';
import { DrawModule } from './draw/draw.module';
import { FixtureModule } from './fixture/fixture.module';
import { ParticipantModule } from './participant/participant.module';
import configuration from './shared/config/configuration';
import { SharedModule } from './shared/shared.module';
import { TeamModule } from './team/team.module';
import { UserModule } from './user/user.module';
import { VenueModule } from './venue/venue.module';
import { VenueCourtModule } from './venue-court/venue-court.module';

@Module({
  imports: [
    SharedModule,
    ConfigModule.forRoot(configuration),
    UserModule,
    ParticipantModule,
    TeamModule,
    CompetitionModule,
    DrawModule,
    VenueModule,
    VenueCourtModule,
    FixtureModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
