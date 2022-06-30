import * as express from 'express';
import { APIPathDefinition } from '../typings';
import { getAPIDefinitionMetadataStorage } from '../globals';
import { APIDefinitionMetadata } from '../storage/types/APIDefinitionMetadata';

const router = express.Router();

router.get('/', (req: any, res: any) => {
    res.send('get all');
});
router.get('/recent', (req: any, res: any) => {
    res.send('recents');
});
router.get('/:id', (req: any, res: any) => {
    res.send('Get by Id');
});

router.post('/', (req: any, res: any) => {
    res.send('Created');
});

router.put('/:id', (req: any, res: any) => {
    res.send('Update');
});

router.delete('/:id', (req: any, res: any) => {
    res.send('Delete');
});

/**
 * Create swagger path definition
 * @param router Express router
 * @returns apiPathDefinitions {APIPathDefinition}
 */
export function createDefinition(router: express.Router) {
    const pathDefinitions: APIPathDefinition[] = [];
    const paths = router.stack.filter((item) => item.route);
    paths.forEach((item) => {
        const method = item.route.stack[0].method.toLowerCase();
        const path = item.route.path;

        const pathDefinition: APIPathDefinition = {
            pathString: path,
            method: method,
            meta: {
                summary: '',
                description: '',
                produces: ['application/json'],
                consumes: ['application/json'],
                responses: {
                    '200': {
                        description: 'OK',
                    },
                },
            },
        };

        pathDefinitions.push(pathDefinition);

        
        getAPIDefinitionMetadataStorage().apiDefinitions.push({
            target: target,
            name: classDef.name,
            swaggerDefinition: swaggerDefinition,
        } as APIDefinitionMetadata);
    });
}
