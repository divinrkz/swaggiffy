import * as express from 'express';
import { APIDefinitionOptions, APIPathDefinition, APIRegisterMeta } from '../typings';
import { getAPIDefinitionMetadataStorage } from '../globals';
import { APIDefinitionMetadata } from '../storage/types/APIDefinitionMetadata';
import { ConfigMetadataStorage } from '../storage/ConfigMetadataStorage';

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

        const pathDefinition: APIPathDefinition = {
            pathString: `/${options.basePath}${path}`,
            tags: options.tags?.split(' ') || [],
            method: method,
            meta: {
                summary: options.summary || '',
                description: options.description || '',
                // operationId: `${method}`,
                produces: options.produces || ['application/json'],
                consumes: options.consumes || ['application/json'],
                responses: {
                    '200': {
                        description: 'OK',
                    },
                },
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

function getRandomArbitrary(min = 0, max = 100) {
    return Math.random() * (max - min) + min;
}
