import { Controller, Get } from '@nestjs/common';
import { MarginService } from './margin.service';

@Controller('margin')
export class MarginController {
  constructor(private readonly marginService: MarginService) {}

  @Get()
  getMargin() {
    return this.marginService.getMargin();
  }
}
