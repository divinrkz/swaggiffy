import {Express} from 'express';
import { PathString } from '../typings';

/**
 * Global storage for registered schemas
 */
export class ConfigMetadataStorage {
    
    /**
     * Express Application Storage
     */
    expressApplication: Express;


    /**
     * Swagger Documentation EndPoint Url 
     */
    swaggerEndPointUrl: PathString;


    /**
     * Swagger Config File Path
     */
    swaggerConfigPath: string;

}

