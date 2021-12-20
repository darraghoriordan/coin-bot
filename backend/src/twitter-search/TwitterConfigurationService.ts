/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { IsDefined, IsString } from "class-validator";
import { ValidatedConfigurationService } from "@darraghor/nest-backend-libs";

@Injectable()
export class TwitterConfigurationService extends ValidatedConfigurationService {
    constructor(private configService: ConfigService) {
        super();
    }

    @IsDefined()
    @IsString()
    get appBearerToken(): string {
        return this.configService.get<string>("twitter.appBearerToken")!;
    }
}
