import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { registerDefinition } from './helpers/registerDefinition';
// import { Schema } from './decorators/Schema';
import { registerSchema } from './helpers/registerSchema';
import { Swaggiffy } from './Swaggiffy';

const express = require('express');
const app = express();

app.listen(5008, () => {
    console.log('Server is running 2');
});

app.get('/', (req: any, res: any) => {
    return res.send('Server is running');
});

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

app.use('/users', router);
console.log(app._router.stack);

registerDefinition(router, { tags: 'Users', basePath: 'users' });
new Swaggiffy().setupExpress(app).swaggiffy();
