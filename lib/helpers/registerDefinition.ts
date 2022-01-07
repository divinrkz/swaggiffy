import * as express from 'express';
import { APIPathDefinition } from '../typings';
import { getAPIDefinitionMetadataStorage } from '../globals';
import { APIDefinitionMetadata } from '../storage/types/APIDefinitionMetadata';

/**
 * Create swagger path definition
 * @param router Express router
 * @returns apiPathDefinitions {APIPathDefinition}
 */
export function registerDefinition(router: express.Router) {
    const paths = router.stack.filter((item) => item.route);
    paths.forEach((item) => {
        const method = item.route.stack[0].method.toLowerCase();
        const path = item.route.path;

        const pathDefinition: APIPathDefinition = {
            pathString: path,
            tags: [],
            method: method,
            meta: {
                summary: '',
                description: '',
                operationId: `operation${getRandomArbitrary()}`,
                produces: ['application/json'],
                consumes: ['application/json'],
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


export function registerDefinitions(routers: express.Router[]) {
    routers.forEach((router) => {
        registerDefinition(router);
    });
}


function getRandomArbitrary(min = 0, max = 100) {
    return Math.random() * (max - min) + min;
}
