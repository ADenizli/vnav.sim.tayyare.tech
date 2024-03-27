import { Controller, Get } from '@nestjs/common';
import { AircraftService } from './aircraft.service';
import IFlight from './interfaces/Flight.interface';

@Controller('aircraft')
export class AircraftController {
  constructor(private readonly aircraftService: AircraftService) {}

  @Get()
  getCurrentStatus(): IFlight {
    return this.aircraftService.currentStatus();
  }

  @Get('climb-test')
  async climbTest(): Promise<any> {
    return await this.aircraftService.climbTest();
  }
}
