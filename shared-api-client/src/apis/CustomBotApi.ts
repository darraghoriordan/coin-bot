/* tslint:disable */
/* eslint-disable */
/**
 * Coin bot Api
 * Describes the backend api
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import {
    CreateCustomBotDto,
    CreateCustomBotDtoFromJSON,
    CreateCustomBotDtoToJSON,
    CreateTriggerDto,
    CreateTriggerDtoFromJSON,
    CreateTriggerDtoToJSON,
    CustomBot,
    CustomBotFromJSON,
    CustomBotToJSON,
    Trigger,
    TriggerFromJSON,
    TriggerToJSON,
    UpdateCustomBotDto,
    UpdateCustomBotDtoFromJSON,
    UpdateCustomBotDtoToJSON,
    UpdateTriggerDto,
    UpdateTriggerDtoFromJSON,
    UpdateTriggerDtoToJSON,
} from '../models';

export interface CustomBotControllerCreateRequest {
    createCustomBotDto: CreateCustomBotDto;
}

export interface CustomBotControllerFindOneRequest {
    uuid: string;
}

export interface CustomBotControllerRemoveRequest {
    uuid: string;
}

export interface CustomBotControllerTriggerRequest {
    uuid: string;
}

export interface CustomBotControllerUpdateRequest {
    uuid: string;
    updateCustomBotDto: UpdateCustomBotDto;
}

export interface TriggerControllerCreateRequest {
    botuuid: string;
    createTriggerDto: CreateTriggerDto;
}

export interface TriggerControllerRemoveRequest {
    botuuid: string;
    triggeruuid: string;
}

export interface TriggerControllerUpdateRequest {
    botuuid: string;
    updateTriggerDto: UpdateTriggerDto;
}

/**
 * CustomBotApi - interface
 * 
 * @export
 * @interface CustomBotApiInterface
 */
export interface CustomBotApiInterface {
    /**
     * 
     * @param {CreateCustomBotDto} createCustomBotDto 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CustomBotApiInterface
     */
    customBotControllerCreateRaw(requestParameters: CustomBotControllerCreateRequest): Promise<runtime.ApiResponse<CustomBot>>;

    /**
     */
    customBotControllerCreate(requestParameters: CustomBotControllerCreateRequest): Promise<CustomBot>;

    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CustomBotApiInterface
     */
    customBotControllerFindAllRaw(): Promise<runtime.ApiResponse<Array<CustomBot>>>;

    /**
     */
    customBotControllerFindAll(): Promise<Array<CustomBot>>;

    /**
     * 
     * @param {string} uuid 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CustomBotApiInterface
     */
    customBotControllerFindOneRaw(requestParameters: CustomBotControllerFindOneRequest): Promise<runtime.ApiResponse<CustomBot>>;

    /**
     */
    customBotControllerFindOne(requestParameters: CustomBotControllerFindOneRequest): Promise<CustomBot>;

    /**
     * 
     * @param {string} uuid 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CustomBotApiInterface
     */
    customBotControllerRemoveRaw(requestParameters: CustomBotControllerRemoveRequest): Promise<runtime.ApiResponse<void>>;

    /**
     */
    customBotControllerRemove(requestParameters: CustomBotControllerRemoveRequest): Promise<void>;

    /**
     * 
     * @param {string} uuid 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CustomBotApiInterface
     */
    customBotControllerTriggerRaw(requestParameters: CustomBotControllerTriggerRequest): Promise<runtime.ApiResponse<void>>;

    /**
     */
    customBotControllerTrigger(requestParameters: CustomBotControllerTriggerRequest): Promise<void>;

    /**
     * 
     * @param {string} uuid 
     * @param {UpdateCustomBotDto} updateCustomBotDto 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CustomBotApiInterface
     */
    customBotControllerUpdateRaw(requestParameters: CustomBotControllerUpdateRequest): Promise<runtime.ApiResponse<CustomBot>>;

    /**
     */
    customBotControllerUpdate(requestParameters: CustomBotControllerUpdateRequest): Promise<CustomBot>;

    /**
     * 
     * @param {string} botuuid 
     * @param {CreateTriggerDto} createTriggerDto 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CustomBotApiInterface
     */
    triggerControllerCreateRaw(requestParameters: TriggerControllerCreateRequest): Promise<runtime.ApiResponse<Trigger>>;

    /**
     */
    triggerControllerCreate(requestParameters: TriggerControllerCreateRequest): Promise<Trigger>;

    /**
     * 
     * @param {string} botuuid 
     * @param {string} triggeruuid 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CustomBotApiInterface
     */
    triggerControllerRemoveRaw(requestParameters: TriggerControllerRemoveRequest): Promise<runtime.ApiResponse<void>>;

    /**
     */
    triggerControllerRemove(requestParameters: TriggerControllerRemoveRequest): Promise<void>;

    /**
     * 
     * @param {string} botuuid 
     * @param {UpdateTriggerDto} updateTriggerDto 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CustomBotApiInterface
     */
    triggerControllerUpdateRaw(requestParameters: TriggerControllerUpdateRequest): Promise<runtime.ApiResponse<Trigger>>;

    /**
     */
    triggerControllerUpdate(requestParameters: TriggerControllerUpdateRequest): Promise<Trigger>;

}

/**
 * 
 */
export class CustomBotApi extends runtime.BaseAPI implements CustomBotApiInterface {

    /**
     */
    async customBotControllerCreateRaw(requestParameters: CustomBotControllerCreateRequest): Promise<runtime.ApiResponse<CustomBot>> {
        if (requestParameters.createCustomBotDto === null || requestParameters.createCustomBotDto === undefined) {
            throw new runtime.RequiredError('createCustomBotDto','Required parameter requestParameters.createCustomBotDto was null or undefined when calling customBotControllerCreate.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("bearer", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/custom-bot`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateCustomBotDtoToJSON(requestParameters.createCustomBotDto),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => CustomBotFromJSON(jsonValue));
    }

    /**
     */
    async customBotControllerCreate(requestParameters: CustomBotControllerCreateRequest): Promise<CustomBot> {
        const response = await this.customBotControllerCreateRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async customBotControllerFindAllRaw(): Promise<runtime.ApiResponse<Array<CustomBot>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("bearer", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/custom-bot`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(CustomBotFromJSON));
    }

    /**
     */
    async customBotControllerFindAll(): Promise<Array<CustomBot>> {
        const response = await this.customBotControllerFindAllRaw();
        return await response.value();
    }

    /**
     */
    async customBotControllerFindOneRaw(requestParameters: CustomBotControllerFindOneRequest): Promise<runtime.ApiResponse<CustomBot>> {
        if (requestParameters.uuid === null || requestParameters.uuid === undefined) {
            throw new runtime.RequiredError('uuid','Required parameter requestParameters.uuid was null or undefined when calling customBotControllerFindOne.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("bearer", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/custom-bot/{uuid}`.replace(`{${"uuid"}}`, encodeURIComponent(String(requestParameters.uuid))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => CustomBotFromJSON(jsonValue));
    }

    /**
     */
    async customBotControllerFindOne(requestParameters: CustomBotControllerFindOneRequest): Promise<CustomBot> {
        const response = await this.customBotControllerFindOneRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async customBotControllerRemoveRaw(requestParameters: CustomBotControllerRemoveRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.uuid === null || requestParameters.uuid === undefined) {
            throw new runtime.RequiredError('uuid','Required parameter requestParameters.uuid was null or undefined when calling customBotControllerRemove.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("bearer", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/custom-bot/{uuid}`.replace(`{${"uuid"}}`, encodeURIComponent(String(requestParameters.uuid))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async customBotControllerRemove(requestParameters: CustomBotControllerRemoveRequest): Promise<void> {
        await this.customBotControllerRemoveRaw(requestParameters);
    }

    /**
     */
    async customBotControllerTriggerRaw(requestParameters: CustomBotControllerTriggerRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.uuid === null || requestParameters.uuid === undefined) {
            throw new runtime.RequiredError('uuid','Required parameter requestParameters.uuid was null or undefined when calling customBotControllerTrigger.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("bearer", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/custom-bot/trigger/{uuid}`.replace(`{${"uuid"}}`, encodeURIComponent(String(requestParameters.uuid))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async customBotControllerTrigger(requestParameters: CustomBotControllerTriggerRequest): Promise<void> {
        await this.customBotControllerTriggerRaw(requestParameters);
    }

    /**
     */
    async customBotControllerUpdateRaw(requestParameters: CustomBotControllerUpdateRequest): Promise<runtime.ApiResponse<CustomBot>> {
        if (requestParameters.uuid === null || requestParameters.uuid === undefined) {
            throw new runtime.RequiredError('uuid','Required parameter requestParameters.uuid was null or undefined when calling customBotControllerUpdate.');
        }

        if (requestParameters.updateCustomBotDto === null || requestParameters.updateCustomBotDto === undefined) {
            throw new runtime.RequiredError('updateCustomBotDto','Required parameter requestParameters.updateCustomBotDto was null or undefined when calling customBotControllerUpdate.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("bearer", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/custom-bot/{uuid}`.replace(`{${"uuid"}}`, encodeURIComponent(String(requestParameters.uuid))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: UpdateCustomBotDtoToJSON(requestParameters.updateCustomBotDto),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => CustomBotFromJSON(jsonValue));
    }

    /**
     */
    async customBotControllerUpdate(requestParameters: CustomBotControllerUpdateRequest): Promise<CustomBot> {
        const response = await this.customBotControllerUpdateRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async triggerControllerCreateRaw(requestParameters: TriggerControllerCreateRequest): Promise<runtime.ApiResponse<Trigger>> {
        if (requestParameters.botuuid === null || requestParameters.botuuid === undefined) {
            throw new runtime.RequiredError('botuuid','Required parameter requestParameters.botuuid was null or undefined when calling triggerControllerCreate.');
        }

        if (requestParameters.createTriggerDto === null || requestParameters.createTriggerDto === undefined) {
            throw new runtime.RequiredError('createTriggerDto','Required parameter requestParameters.createTriggerDto was null or undefined when calling triggerControllerCreate.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("bearer", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/custom-bot/{botuuid}/trigger`.replace(`{${"botuuid"}}`, encodeURIComponent(String(requestParameters.botuuid))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateTriggerDtoToJSON(requestParameters.createTriggerDto),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => TriggerFromJSON(jsonValue));
    }

    /**
     */
    async triggerControllerCreate(requestParameters: TriggerControllerCreateRequest): Promise<Trigger> {
        const response = await this.triggerControllerCreateRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async triggerControllerRemoveRaw(requestParameters: TriggerControllerRemoveRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.botuuid === null || requestParameters.botuuid === undefined) {
            throw new runtime.RequiredError('botuuid','Required parameter requestParameters.botuuid was null or undefined when calling triggerControllerRemove.');
        }

        if (requestParameters.triggeruuid === null || requestParameters.triggeruuid === undefined) {
            throw new runtime.RequiredError('triggeruuid','Required parameter requestParameters.triggeruuid was null or undefined when calling triggerControllerRemove.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("bearer", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/custom-bot/{botuuid}/trigger/{triggeruuid}`.replace(`{${"botuuid"}}`, encodeURIComponent(String(requestParameters.botuuid))).replace(`{${"triggeruuid"}}`, encodeURIComponent(String(requestParameters.triggeruuid))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async triggerControllerRemove(requestParameters: TriggerControllerRemoveRequest): Promise<void> {
        await this.triggerControllerRemoveRaw(requestParameters);
    }

    /**
     */
    async triggerControllerUpdateRaw(requestParameters: TriggerControllerUpdateRequest): Promise<runtime.ApiResponse<Trigger>> {
        if (requestParameters.botuuid === null || requestParameters.botuuid === undefined) {
            throw new runtime.RequiredError('botuuid','Required parameter requestParameters.botuuid was null or undefined when calling triggerControllerUpdate.');
        }

        if (requestParameters.updateTriggerDto === null || requestParameters.updateTriggerDto === undefined) {
            throw new runtime.RequiredError('updateTriggerDto','Required parameter requestParameters.updateTriggerDto was null or undefined when calling triggerControllerUpdate.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("bearer", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/custom-bot/{botuuid}/trigger`.replace(`{${"botuuid"}}`, encodeURIComponent(String(requestParameters.botuuid))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: UpdateTriggerDtoToJSON(requestParameters.updateTriggerDto),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => TriggerFromJSON(jsonValue));
    }

    /**
     */
    async triggerControllerUpdate(requestParameters: TriggerControllerUpdateRequest): Promise<Trigger> {
        const response = await this.triggerControllerUpdateRaw(requestParameters);
        return await response.value();
    }

}
