import { Module } from "@nestjs/common";
import "reflect-metadata";
import {
    CoreModule,
    AuthzModule,
    DatabaseModule,
    EmailClientModule,
} from "@darraghor/nest-backend-libs";

@Module({
    imports: [CoreModule, DatabaseModule, AuthzModule, EmailClientModule],
    providers: [],
})
export class MainModule {}
