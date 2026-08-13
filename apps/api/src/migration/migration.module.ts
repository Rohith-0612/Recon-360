import { Module } from '@nestjs/common';
import { ClientsModule } from '../clients/clients.module';
import { MarginModule } from '../margin/margin.module';
import { UpsellModule } from '../upsell/upsell.module';
import { MigrationController } from './migration.controller';
import { MigrationService } from './migration.service';

@Module({
  imports: [ClientsModule, MarginModule, UpsellModule],
  controllers: [MigrationController],
  providers: [MigrationService],
})
export class MigrationModule {}
