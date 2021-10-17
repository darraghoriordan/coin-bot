import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { CustomBotService } from "./custom-bot.service";
import { CreateCustomBotDto } from "./dto/create-custom-bot.dto";
import { UpdateCustomBotDto } from "./dto/update-custom-bot.dto";

@ApiTags("Custom Bot")
@Controller("custom-bot")
export class CustomBotController {
    constructor(private readonly customBotService: CustomBotService) {}

    @Post()
    @ApiCreatedResponse()
    create(@Body() createCustomBotDto: CreateCustomBotDto) {
        return this.customBotService.create(createCustomBotDto);
    }

    @Post("trigger/:uuid")
    @ApiOkResponse()
    trigger(@Param("uuid") uuid: string) {
        return this.customBotService.trigger(uuid);
    }

    @Get()
    @ApiOkResponse()
    findAll() {
        return this.customBotService.findAll();
    }

    @Get(":uuid")
    @ApiOkResponse()
    findOne(@Param("uuid") uuid: string) {
        return this.customBotService.findOne(uuid);
    }

    @Patch(":uuid")
    @ApiOkResponse()
    update(
        @Param("uuid") uuid: string,
        @Body() updateCustomBotDto: UpdateCustomBotDto
    ) {
        return this.customBotService.update(uuid, updateCustomBotDto);
    }

    @Delete(":uuid")
    @ApiOkResponse()
    remove(@Param("uuid") uuid: string) {
        return this.customBotService.remove(uuid);
    }
}
