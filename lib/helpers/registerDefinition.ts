import * as express from 'express';
import { APIDefinitionOptions, APIDocResponse, APIParameters, APIPathDefinition, APIRegisterMeta } from '../typings';
import { getAPIDefinitionMetadataStorage } from '../globals';
import { APIDefinitionMetadata } from '../storage/types/APIDefinitionMetadata';

/**
 * Create swagger path definition
 * @param router Express router
 * @returns apiPathDefinitions {APIPathDefinition}
 */
export function registerDefinition(router: express.Router, options: APIDefinitionOptions) {
    const paths = router.stack.filter((item) => item.route);
    paths.forEach((item) => {
        const method = item.route.stack[0].method.toLowerCase();
        const path = item.route.path;

        console.log(item.keys);
        let parameters: APIParameters[] = []
        let responses: APIDocResponse =  {}
        
        if (item.keys.length > 0) {
            for (const key of item.keys) {
                parameters.push({
                    in: 'path',
                    name: key.name,     
                    required: true,
                    type: 'string'
                });
            }
        }

        if (method == 'post' || method == 'put') {
            parameters.push({
                in: 'body',
                name: 'body',
                required: (method == 'post') ? true : false,
                schema: {
                    $ref: `#/definitions/${options.mappedSchema}`,
                },
            });  
            
        }

        if (method == 'delete') {
            responses = {
                '200': {
                    description: 'OK',
                    schema: {
                        type: 'object',
                        properties: {
                            deleted: {
                                type: 'boolean',
                                example: true
                            }
                        }
                    }
                },
                '500': {
                    description: 'Internal Server Error',
                },
            }
        }
        else if (method == 'post' || method == 'put') {
            responses = {
                '201': {
                    description: 'Created',
                    schema: {
                        $ref: `#/definitions/${options.mappedSchema}`,
                    },
                },
                '500': {
                    description: 'Internal Server Error',
                },
            }
        } else {
            responses = {
                '200': {
                    description: 'OK',
                    schema: {
                        type: 'array',
                        items: {
                            $ref: `#/definitions/${options.mappedSchema}`
                        }
                    }
                },
                '500': {
                    description: 'Internal Server Error',
                    schema: {
                        type: 'object',
                        properties: {
                            error: {
                                type: 'string',
                                example: 'Internal Server Error'
                            }
                        }
                    }
                },
            }
        }

        const pathDefinition: APIPathDefinition = {
            pathString: `/${options.basePath}${path}`,
            tags: options.tags?.split(' ') || [],
            method: method,
            meta: {
                summary: options.summary || '',
                description: options.description || '',
                // operationId: `${method}`,
                parameters: parameters,
                produces: options.produces || ['application/json'],
                consumes: options.consumes || ['application/json'],
                responses
            },
        };

        getAPIDefinitionMetadataStorage().apiDefinitions.push({
            router,
            apiDefinition: pathDefinition,
        } as APIDefinitionMetadata);
    });
}

// export function registerDefinitions(registerMetas: APIRegisterMeta[]) {
//     registerMetas.forEach((_meta) => {
//         registerDefinition(_meta);
//     });
// }
