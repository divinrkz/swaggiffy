import {Express} from 'express';
import { Route } from '../decorators/Route.decorator';

@Route(true)
class APIRoute {
    constructor() {
        this.test();
    }
    public test() {
        console.log('ngaho')
    }
}


export {APIRoute};