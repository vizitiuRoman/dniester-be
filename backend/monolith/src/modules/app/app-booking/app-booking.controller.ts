import { Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthCompany } from '../../../core/decorators/auth-company.decorator';
import { CompanyAuth } from '../../../core/decorators/http.decorators';
import { BookingDto } from '../../general/booking/dto/BookingDto';
import { CompanyEntity } from '../../general/company/company.entity';
import { AppBookingService } from './app-booking.service';

@Controller('app/bookings')
@ApiTags('app/bookings')
export class AppBookingController {
    constructor(private bookingService: AppBookingService) {}
    @Get()
    @CompanyAuth()
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get bookings list',
        type: BookingDto,
    })
    getBookings(@AuthCompany() company: CompanyEntity): Promise<BookingDto[]> {
        return this.bookingService.getBookingsByCompany(company.id);
    }

    @Post()
    @CompanyAuth()
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Create booking',
        type: BookingDto,
    })
    createBooking(
        @AuthCompany() company: CompanyEntity,
    ): Promise<BookingDto[]> {
        return this.bookingService.getBookingsByCompany(company.id);
    }
}
