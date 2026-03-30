import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { TripsService } from './trips.service';

@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Get()
  findAll() {
    return this.tripsService.findAll();
  }

  @Post()
  create(@Body() payload: CreateTripDto) {
    return this.tripsService.create(payload);
  }

  @Patch(':tripId/payment/paid')
  markPaid(
    @Param('tripId') tripId: string,
    @Body() payload: { orderId: string; captureId?: string },
  ) {
    return this.tripsService.markPaid(tripId, payload);
  }

  @Patch(':tripId/status')
  updateStatus(
    @Param('tripId') tripId: string,
    @Body() payload: { status: 'accepted' | 'in_progress' | 'completed' | 'cancelled'; driverId?: string },
  ) {
    return this.tripsService.updateStatus(tripId, payload.status, payload.driverId);
  }
}
