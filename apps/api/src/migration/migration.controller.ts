import { Controller, Get, Param } from '@nestjs/common';
import { MigrationService } from './migration.service';

@Controller('migration')
export class MigrationController {
  constructor(private readonly migrationService: MigrationService) {}

  @Get('overview')
  getOverview() {
    return this.migrationService.getOverview();
  }

  @Get('queue')
  getQueue() {
    return this.migrationService.getQueue();
  }

  @Get('accounts/:id')
  getAccount(@Param('id') id: string) {
    return this.migrationService.getAccountDetail(id);
  }
}
