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
    Person,
    PersonFromJSON,
    PersonToJSON,
} from '../models';

export interface PersonControllerCreateRequest {
    body: object;
}

export interface PersonControllerRemoveRequest {
    id: string;
}

export interface PersonControllerUpdateRequest {
    id: string;
    body: object;
}

/**
 * PersonsApi - interface
 * 
 * @export
 * @interface PersonsApiInterface
 */
export interface PersonsApiInterface {
    /**
     * 
     * @param {object} body 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PersonsApiInterface
     */
    personControllerCreateRaw(requestParameters: PersonControllerCreateRequest): Promise<runtime.ApiResponse<Person>>;

    /**
     */
    personControllerCreate(requestParameters: PersonControllerCreateRequest): Promise<Person>;

    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PersonsApiInterface
     */
    personControllerFindSelfRaw(): Promise<runtime.ApiResponse<Person>>;

    /**
     */
    personControllerFindSelf(): Promise<Person>;

    /**
     * 
     * @param {string} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PersonsApiInterface
     */
    personControllerRemoveRaw(requestParameters: PersonControllerRemoveRequest): Promise<runtime.ApiResponse<Person>>;

    /**
     */
    personControllerRemove(requestParameters: PersonControllerRemoveRequest): Promise<Person>;

    /**
     * 
     * @param {string} id 
     * @param {object} body 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PersonsApiInterface
     */
    personControllerUpdateRaw(requestParameters: PersonControllerUpdateRequest): Promise<runtime.ApiResponse<Person>>;

    /**
     */
    personControllerUpdate(requestParameters: PersonControllerUpdateRequest): Promise<Person>;

}

/**
 * 
 */
export class PersonsApi extends runtime.BaseAPI implements PersonsApiInterface {

    /**
     */
    async personControllerCreateRaw(requestParameters: PersonControllerCreateRequest): Promise<runtime.ApiResponse<Person>> {
        if (requestParameters.body === null || requestParameters.body === undefined) {
            throw new runtime.RequiredError('body','Required parameter requestParameters.body was null or undefined when calling personControllerCreate.');
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
            path: `/person`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.body as any,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => PersonFromJSON(jsonValue));
    }

    /**
     */
    async personControllerCreate(requestParameters: PersonControllerCreateRequest): Promise<Person> {
        const response = await this.personControllerCreateRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async personControllerFindSelfRaw(): Promise<runtime.ApiResponse<Person>> {
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
            path: `/person`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => PersonFromJSON(jsonValue));
    }

    /**
     */
    async personControllerFindSelf(): Promise<Person> {
        const response = await this.personControllerFindSelfRaw();
        return await response.value();
    }

    /**
     */
    async personControllerRemoveRaw(requestParameters: PersonControllerRemoveRequest): Promise<runtime.ApiResponse<Person>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling personControllerRemove.');
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
            path: `/person/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => PersonFromJSON(jsonValue));
    }

    /**
     */
    async personControllerRemove(requestParameters: PersonControllerRemoveRequest): Promise<Person> {
        const response = await this.personControllerRemoveRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async personControllerUpdateRaw(requestParameters: PersonControllerUpdateRequest): Promise<runtime.ApiResponse<Person>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling personControllerUpdate.');
        }

        if (requestParameters.body === null || requestParameters.body === undefined) {
            throw new runtime.RequiredError('body','Required parameter requestParameters.body was null or undefined when calling personControllerUpdate.');
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
            path: `/person/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.body as any,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => PersonFromJSON(jsonValue));
    }

    /**
     */
    async personControllerUpdate(requestParameters: PersonControllerUpdateRequest): Promise<Person> {
        const response = await this.personControllerUpdateRaw(requestParameters);
        return await response.value();
    }

}
