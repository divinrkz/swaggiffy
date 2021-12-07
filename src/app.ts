import express from 'express';
import Config from './config';

class App extends Config {

    private PORT: number = parseInt(process.env.PORT as string);

    public app: express.Application;

    constructor() {
        super();
        this.app = express();
    }

    public listen() {
        console.log('Running');
    
        this.app.listen(this.PORT, () => {
            console.log(`App listening on the port ${process.env.PORT}`);
        })
    }  

    public getServer(): express.Application {
        return this.app;
    }

};

export default App;