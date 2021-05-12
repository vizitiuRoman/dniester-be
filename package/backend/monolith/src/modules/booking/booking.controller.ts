import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthUser } from '../../decorators/auth-user.decorator';
import { Auth } from '../../decorators/http.decorators';
import { UserEntity } from '../user/user.entity';
import { BookingService } from './booking.service';
import { BookingDto } from './dto/BookingDto';

@Controller('bookings')
@ApiTags('bookings')
export class BookingController {
    constructor(private bookingService: BookingService) {}

    @Get()
    @Auth()
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get bookings list',
        type: BookingDto,
    })
    getBookings(@AuthUser() user: UserEntity): Promise<BookingDto[]> {
        return this.bookingService.getBookingsByUser(user.id);
    }
}