import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ClientsModule } from './clients/clients.module';
import { UpsellModule } from './upsell/upsell.module';
import { MarginModule } from './margin/margin.module';
import { AlertsModule } from './alerts/alerts.module';
import { MigrationModule } from './migration/migration.module';

@Module({
  imports: [ClientsModule, UpsellModule, MarginModule, AlertsModule, MigrationModule],
  controllers: [AppController],
})
export class AppModule {}
