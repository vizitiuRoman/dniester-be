import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

import { Trim } from '../../../../core/decorators/transforms.decorator';

export class CreateCmpCompanyDto {
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

    @ApiProperty({ minLength: 6 })
    @IsString()
    @MinLength(6)
    readonly fullName: string;
}
