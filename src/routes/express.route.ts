import {Express} from 'express';


class APIRoute {
    constructor() {
        this.test();
    }
    public test(): void {
        console.log('Express testing')
    }
}


export {APIRoute};