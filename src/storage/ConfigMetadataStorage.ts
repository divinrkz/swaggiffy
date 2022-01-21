import {Express} from 'express';
import { PathString, TOpenApiVersion } from '../typings';

/**
 * Global storage for registered schemas
 */
export class ConfigMetadataStorage {
    
    /**
     * Application Name
     */
    appName: string;


    /**
     * Express Application Storage
     */
    expressApplication: Express;


    /**
     * Open API Version
     */
    openApiVersion: TOpenApiVersion;


    /**
     * Swagger Documentation EndPoint Url
     */
    swaggerEndPointUrl: PathString;

    
    /**
     * Swagger Config File Path
     */
    swaggerConfigPath: string;


}
