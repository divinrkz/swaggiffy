
// import { registerDefinition } from './helpers/registerDefinition';
// // import { Schema } from './decorators/Schema';

const {Swaggiffy} = require('./Swaggiffy')
const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const express = require('express');
const {registerDefinition} = require('./helpers/registerDefinition')
const app = express();

console.log('dsfa')
app.listen(5008, () => {
    console.log('Server is running 2');
});

app.get('/', (req, res) => {
    return res.send('Server is running');
});

const router = express.Router();

router.get('/', (req, res) => {
    res.send('get all');
});
router.get('/recent/:status/name/:name', (req, res) => {
    res.send('recents');
});

router.get('/manipulate', (req, res) => {
    res.send('recents');
});

router.post('/', (req, res) => {
    res.send('Created');
});

router.post('/manipulate', (req, res) => {
    res.send('recents');
});

router.put('/:id', (req, res) => {
    res.send('Update');
});

router.put('/manipulate/:name/test', (req, res) => {
    res.send('recents');
});

router.delete('/:id', (req, res) => {
    res.send('Delete');
});

app.use('/users', router);

registerDefinition(router, { tags: 'Users', basePath: '/users', mappedSchema: 'User' });

const schema = {
    username: 'sdfaf',
    phone_number: 'sdfa',
};
registerSchema('User', schema);
new Swaggiffy().setupExpress(app).swaggiffy();

