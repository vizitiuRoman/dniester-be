import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

import { Trim } from '../../../../core/decorators/transforms.decorator';

export class UserRegisterDto {
    @ApiProperty()
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @Trim()
    readonly email: string;

    @ApiProperty({ minLength: 6 })
    @IsString()
    @MinLength(6)
    readonly password: string;

    @ApiProperty({ minLength: 3 })
    @IsString()
    @MinLength(3)
    readonly name: string;

    @ApiProperty({ minLength: 3 })
    @IsString()
    @MinLength(3)
    readonly lastName: string;
}
