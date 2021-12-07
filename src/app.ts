import express, {Express} from 'express';
import Config from './config';

class App extends Config {

    private PORT: number = parseInt(process.env.PORT as string);

    public app: Express;

    constructor() {
        super();
        this.app = express();
        this.serveRoutes();
    }

    public listen() {
        this.app.listen(this.PORT, () => {
            console.log(`App listening on the port ${process.env.PORT}`);
        })
    }  
    

    public getServer(): express {
        return this.app;
    }

    public serveRoutes() {
        this.app.get('/', (req, res) => {
            res.status(200).send(`Server made up and running!`)
        });
    }

};

export default App;