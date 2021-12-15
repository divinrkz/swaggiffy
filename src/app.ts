import express, {Express} from 'express';
import Config from './config';
import swaggerUi, {JsonObject} from 'swagger-ui-express';
import swaggerJsdoc from "swagger-jsdoc";
import swaggerDocument from './utils/swagger.json';
import UserModel from './models/user.model';

class App extends Config {

    private PORT: number = parseInt(process.env.PORT as string);

    private app: Express;

    constructor() {
        super();
        this.app = express();
        this.routes();
        this.swaggify();
    }

    public listen(): void {
        this.app.listen(this.PORT, () => {
            console.log(`App listening on the port ${process.env.PORT}`);
        });
    }  
    
    private routes(): void {
        this.app.get('/', (req: any, res: any) => {
            res.status(200).send(`Server made up and running!`)
        });      
    }

    private swaggify(): void {    
        new UserModel();
        const specs: JsonObject = swaggerJsdoc(swaggerDocument);
        this.app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));
    }

};

export default App;