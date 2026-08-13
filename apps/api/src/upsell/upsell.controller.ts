import { Controller, Get } from '@nestjs/common';
import { UpsellService } from './upsell.service';

@Controller('upsell')
export class UpsellController {
  constructor(private readonly upsellService: UpsellService) {}

  @Get()
  getUpsell() {
    return this.upsellService.getUpsell();
  }
}
