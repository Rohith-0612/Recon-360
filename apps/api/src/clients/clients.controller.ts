import { Controller, Get, Param, Query } from '@nestjs/common';
import { ClientsService } from './clients.service';

@Controller()
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get('portfolio')
  getPortfolio() {
    return this.clientsService.getPortfolio();
  }

  @Get('search')
  search(@Query('q') q = '') {
    return this.clientsService.search(q);
  }

  @Get('clients/:id')
  getClient(@Param('id') id: string) {
    return this.clientsService.getClientDetail(id);
  }

  @Get('clients/:id/trends')
  getTrends(@Param('id') id: string) {
    return this.clientsService.getTrends(id);
  }

  @Get('clients/:id/value-report')
  getValueReport(@Param('id') id: string) {
    return this.clientsService.getValueReport(id);
  }
}
