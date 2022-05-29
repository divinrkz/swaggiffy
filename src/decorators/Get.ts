import * as express from 'express';
import {APIPathDefinition} from '../typings'

const router = express.Router();


 router.get('/',  (req: any, res: any) => {
    res.send('get all')
});
 router.get('/recent',  (req: any, res: any) => {
    res.send('recents')
});
 router.get('/:id',  (req: any, res: any) => {
    res.send('Get by Id')
});

 router.post('/' , (req: any, res: any) => {
    res.send('Created')
});

 router.put('/:id', (req: any, res: any) => {
     res.send('Update')
 });
 

 router.delete('/:id',  (req: any, res: any) => {
    res.send('Delete')
});



/**
 * Create swagger path definition
 */
function createPathDefinition(router: express.Router) {
    const pathDefinitions: APIPathDefinition[] = [];
    const paths = router.stack.filter(item => item.route);
    paths.forEach(item => {
        const method = item.route.stack[0].method.toLowerCase();
        const path = item.route.path;
        // pathDefinition[method] = path;
    });
    return [];
}

console.log(createPathDefinition(router))