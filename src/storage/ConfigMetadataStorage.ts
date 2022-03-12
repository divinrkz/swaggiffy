import { Express } from 'express';
import { ConfigurationProps, PathString, TFormat, TOpenApiVersion } from '../typings';

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
     * Format Type
     */
    format: TFormat;
    /**
     * Open API Version
     */
    openApiVersion: TOpenApiVersion;

    /**
     * Swagger Documentation EndPoint Url
     */
    swaggerEndPointUrl: PathString;

    /**
     * Swagger Definition File Path
     */
    swaggerDefinitionFilePath: string;

    init(config: ConfigurationProps) {
        this.appName = config.projectName;
        this.openApiVersion = config.openApiVersion;
        this.swaggerEndPointUrl = config.apiRoute;
        this.swaggerDefinitionFilePath = config.outFile;
        this.format = config.format;

        return this;
    }
}
