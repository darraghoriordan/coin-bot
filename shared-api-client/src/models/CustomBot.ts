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

import { exists, mapValues } from '../runtime';
import {
    RunningStateEnum,
    RunningStateEnumFromJSON,
    RunningStateEnumFromJSONTyped,
    RunningStateEnumToJSON,
    Trigger,
    TriggerFromJSON,
    TriggerFromJSONTyped,
    TriggerToJSON,
} from './';

/**
 * 
 * @export
 * @interface CustomBot
 */
export interface CustomBot {
    /**
     * 
     * @type {number}
     * @memberof CustomBot
     */
    id: number;
    /**
     * 
     * @type {string}
     * @memberof CustomBot
     */
    uuid: string;
    /**
     * 
     * @type {string}
     * @memberof CustomBot
     */
    ownerId: string;
    /**
     * 
     * @type {string}
     * @memberof CustomBot
     */
    name: string;
    /**
     * 
     * @type {Array<Trigger>}
     * @memberof CustomBot
     */
    triggers: Array<Trigger>;
    /**
     * 
     * @type {number}
     * @memberof CustomBot
     */
    runEveryInSeconds: number;
    /**
     * 
     * @type {Date}
     * @memberof CustomBot
     */
    lastRun: Date;
    /**
     * 
     * @type {RunningStateEnum}
     * @memberof CustomBot
     */
    runningState: RunningStateEnum;
    /**
     * 
     * @type {Date}
     * @memberof CustomBot
     */
    createdDate: Date;
    /**
     * 
     * @type {Date}
     * @memberof CustomBot
     */
    updateDate: Date;
    /**
     * 
     * @type {Date}
     * @memberof CustomBot
     */
    deletedDate: Date;
}

export function CustomBotFromJSON(json: any): CustomBot {
    return CustomBotFromJSONTyped(json, false);
}

export function CustomBotFromJSONTyped(json: any, ignoreDiscriminator: boolean): CustomBot {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'uuid': json['uuid'],
        'ownerId': json['ownerId'],
        'name': json['name'],
        'triggers': ((json['triggers'] as Array<any>).map(TriggerFromJSON)),
        'runEveryInSeconds': json['runEveryInSeconds'],
        'lastRun': (new Date(json['lastRun'])),
        'runningState': RunningStateEnumFromJSON(json['runningState']),
        'createdDate': (new Date(json['createdDate'])),
        'updateDate': (new Date(json['updateDate'])),
        'deletedDate': (new Date(json['deletedDate'])),
    };
}

export function CustomBotToJSON(value?: CustomBot | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'uuid': value.uuid,
        'ownerId': value.ownerId,
        'name': value.name,
        'triggers': ((value.triggers as Array<any>).map(TriggerToJSON)),
        'runEveryInSeconds': value.runEveryInSeconds,
        'lastRun': (value.lastRun.toISOString()),
        'runningState': RunningStateEnumToJSON(value.runningState),
        'createdDate': (value.createdDate.toISOString()),
        'updateDate': (value.updateDate.toISOString()),
        'deletedDate': (value.deletedDate.toISOString()),
    };
}


