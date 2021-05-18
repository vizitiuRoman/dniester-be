import './boilerplate.polyfill';

import type { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I18nJsonParser, I18nModule } from 'nestjs-i18n';
import path from 'path';

import { contextMiddleware } from './middlewares';
import { AuthModule } from './modules/auth/auth.module';
import { BookingModule } from './modules/booking/booking.module';
import { MathModule } from './modules/math/math.module';
import { ServiceModule } from './modules/service/service.module';
import { CompanyModule } from './modules/company/company.module';
import { ConfigService } from './shared/services/config.service';
import { SharedModule } from './shared/shared.module';

@Module({
    imports: [
        AuthModule,
        CompanyModule,
        ServiceModule,
        BookingModule,
        MathModule,
        TypeOrmModule.forRootAsync({
            imports: [SharedModule],
            useFactory: (configService: ConfigService) =>
                configService.typeOrmConfig,
            inject: [ConfigService],
        }),
        I18nModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                fallbackLanguage: configService.fallbackLanguage,
                parserOptions: {
                    path: path.join(__dirname, '/i18n/'),
                    watch: configService.isDevelopment,
                },
            }),
            imports: [SharedModule],
            parser: I18nJsonParser,
            inject: [ConfigService],
        }),
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
        consumer.apply(contextMiddleware).forRoutes('*');
    }
}
