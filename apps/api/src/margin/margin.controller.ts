import { Controller, Get, Query } from '@nestjs/common';
import { MarginService } from './margin.service';

@Controller('margin')
export class MarginController {
  constructor(private readonly marginService: MarginService) {}

  @Get()
  getMargin(
    @Query('base') base?: string,
    @Query('intensity') intensity?: string,
    @Query('overage') overage?: string,
  ) {
    return this.marginService.getMargin(
      Number(base ?? 30),
      Number(intensity ?? 40),
      Number(overage ?? 8),
    );
  }
}
