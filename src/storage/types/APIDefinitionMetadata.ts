import { APIPathDefinition, TSwaggerSchema } from '../../typings';

export interface APIDefinitionMetadata {
    /**
     * Router which owns the API Definition
     */
    readonly router: any;


    /**
     * Swagger Definition for the schema
     */
    readonly apiDefinition: APIPathDefinition;
}
