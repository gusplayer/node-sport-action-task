import { Module } from '@nestjs/common';

import { PrismaService } from './services';
import { PaginationUtil } from './utils';

@Module({
  imports: [],
  providers: [PrismaService, PaginationUtil],
  exports: [PrismaService, PaginationUtil],
})
export class SharedModule {}
