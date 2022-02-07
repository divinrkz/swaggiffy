import { APIPathDefinition, TSwaggerSchema } from '../../typings';
import * as express from 'express';

export interface APIDefinitionMetadata {
    /**
     * Router which owns the API Definition
     */
    readonly router: express.Router;

    /**
     * Swagger Definition for the schema
     */
    readonly apiDefinition: APIPathDefinition;
}
