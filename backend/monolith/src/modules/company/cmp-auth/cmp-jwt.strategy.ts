import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ConfigService } from '../../../shared/services/config.service';
import { CmpCompanyService } from '../cmp-company/cmp-company.service';

@Injectable()
export class CmpJwtStrategy extends PassportStrategy(
    Strategy,
    'company_jwt',
) {
    constructor(
        public readonly configService: ConfigService,
        public readonly cmpCompanyService: CmpCompanyService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET_KEY'),
        });
    }

    async validate({ iat, exp, id: companyId }) {
        const timeDiff = exp - iat;
        if (timeDiff <= 0) {
            throw new UnauthorizedException();
        }
        const company = await this.cmpCompanyService.findOne(companyId);

        if (!company) {
            throw new UnauthorizedException();
        }
        return company;
    }
}
