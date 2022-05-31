// import 'reflect-metadata';
import { Swaggify } from './Swaggify';
// export * from './globals';
// export * from './decorators/Schema';
// export * from './errors/SwaggifyError';
// export * from './Swaggify';

const express = require('express'); 
const app = express();

app.listen(5008, () => {
    console.log('Server is running 2')
})

app.get('/', (req: any, res: any) => {
    return res.send('Server is running')
})

new Swaggify().setupExpress(app).swaggify();