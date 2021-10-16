import fs = require("fs");
import dotenv from "dotenv";
import { TypeOrmConfigurationProvider } from "@darraghor/nest-backend-libs";
dotenv.config();

fs.writeFileSync(
    "ormconfig.json",
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    JSON.stringify(
        TypeOrmConfigurationProvider.getTypeOrmConfig(),
        undefined,
        2
    )
);
