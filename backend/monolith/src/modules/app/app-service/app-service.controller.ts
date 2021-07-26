import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthUser } from '../../../decorators/auth-user.decorator';
import { UserAuth, UUIDParam } from '../../../decorators/http.decorators';
import { ServiceDto } from '../../general/service/dto/ServiceDto';
import { UserEntity } from '../../general/user/user.entity';
import { AppUserService } from '../app-user/app-user.service';
import { AppServiceService } from './app-service.service';

@Controller('app/services')
@ApiTags('app/services')
export class AppServiceController {
    constructor(
        private appServiceService: AppServiceService,
        private appUserService: AppUserService,
    ) {}

    @Get()
    @UserAuth()
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get services list',
        type: ServiceDto,
    })
    getServices(@AuthUser() user: UserEntity): Promise<ServiceDto[]> {
        return this.appServiceService.getServices(user.id, {
            relations: ['staffs', 'branch', 'bookings'],
        });
    }

    @Get('favorites')
    @UserAuth()
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get favorite services',
        type: ServiceDto,
    })
    async getFavoriteServices(
        @AuthUser() user: UserEntity,
    ): Promise<ServiceDto[]> {
        return (
            (await this.appUserService.getUserWithFavoriteServices(user.id))
                ?.favoritesUserServices ?? []
        );
    }

    @Get(':id')
    @UserAuth()
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get service',
        type: ServiceDto,
    })
    getService(
        @AuthUser() user: UserEntity,
        @UUIDParam('id') serviceId: string,
    ): Promise<ServiceDto> {
        return this.appServiceService.getService(serviceId, user.id);
    }
}
