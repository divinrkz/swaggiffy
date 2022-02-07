import * as express from 'express';
import { APIPathDefinition, APIRegisterMeta } from '../typings';
import { getAPIDefinitionMetadataStorage } from '../globals';
import { APIDefinitionMetadata } from '../storage/types/APIDefinitionMetadata';

/**
 * Create swagger path definition
 * @param router Express router
 * @returns apiPathDefinitions {APIPathDefinition}
 */
export function registerDefinition(registerMeta: APIRegisterMeta) {
    const paths = registerMeta.router.stack.filter((item) => item.route);
    paths.forEach((item) => {
        const method = item.route.stack[0].method.toLowerCase();
        const path = item.route.path;

        const pathDefinition: APIPathDefinition = {
            pathString: path,
            tags: registerMeta.tags?.split(' ') || [],
            method: method,
            meta: {
                summary: registerMeta.summary || '',
                description: registerMeta.description || '',
                operationId: `${method}${getRandomArbitrary}`,
                produces: registerMeta.produces || ['application/json'],
                consumes: registerMeta.consumes || ['application/json'],
                responses: registerMeta.responses || {
                    '200': {
                        description: 'OK',
                    },
                },
            },
        };

        getAPIDefinitionMetadataStorage().apiDefinitions.push({
            router: registerMeta.router,
            apiDefinition: pathDefinition,
        } as APIDefinitionMetadata);
    });
}

export function registerDefinitions(registerMetas: APIRegisterMeta[]) {
    registerMetas.forEach((_meta) => {
        registerDefinition(_meta);
    });
}

function getRandomArbitrary(min = 0, max = 100) {
    return Math.random() * (max - min) + min;
}
