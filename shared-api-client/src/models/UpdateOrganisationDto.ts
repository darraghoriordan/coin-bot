/* tslint:disable */
/* eslint-disable */
/**
 * Coin bot BE Api
 * Describes the backend api
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import {
    Person,
    PersonFromJSON,
    PersonFromJSONTyped,
    PersonToJSON,
} from './';

/**
 * 
 * @export
 * @interface UpdateOrganisationDto
 */
export interface UpdateOrganisationDto {
    /**
     * 
     * @type {Array<Person>}
     * @memberof UpdateOrganisationDto
     */
    members?: Array<Person>;
    /**
     * 
     * @type {Person}
     * @memberof UpdateOrganisationDto
     */
    owner?: Person;
    /**
     * 
     * @type {string}
     * @memberof UpdateOrganisationDto
     */
    name?: string;
}

export function UpdateOrganisationDtoFromJSON(json: any): UpdateOrganisationDto {
    return UpdateOrganisationDtoFromJSONTyped(json, false);
}

export function UpdateOrganisationDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): UpdateOrganisationDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'members': !exists(json, 'members') ? undefined : ((json['members'] as Array<any>).map(PersonFromJSON)),
        'owner': !exists(json, 'owner') ? undefined : PersonFromJSON(json['owner']),
        'name': !exists(json, 'name') ? undefined : json['name'],
    };
}

export function UpdateOrganisationDtoToJSON(value?: UpdateOrganisationDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'members': value.members === undefined ? undefined : ((value.members as Array<any>).map(PersonToJSON)),
        'owner': PersonToJSON(value.owner),
        'name': value.name,
    };
}

