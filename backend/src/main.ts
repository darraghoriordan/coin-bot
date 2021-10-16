import { INestApplication } from "@nestjs/common";
import {
    CoreModule,
    CoreConfigurationService,
    SwaggerGen,
} from "@darraghor/nest-backend-libs";
import { MainModule } from "./main.module";

CoreModule.initApplication(MainModule, async (app: INestApplication) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const configService: CoreConfigurationService = app.get(
        CoreConfigurationService
    );

    const swaggerGen = app.get(SwaggerGen);
    swaggerGen.generate(app, "open-api/swagger.json");

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    await app.listen(configService.webPort);
});
