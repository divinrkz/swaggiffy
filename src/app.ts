import express, {Express} from 'express';
import Config from './config';
import swaggerUi, {JsonObject} from 'swagger-ui-express';
import swaggerJsdoc from "swagger-jsdoc";
import { User } from './models/user.model';

class App extends Config {

    private PORT: number = parseInt(process.env.PORT as string);
    private app: Express;
    private swaggerDocument: any;
    private swaggerSpecs: JsonObject;

    constructor() {
        super();
        this.app = express();
        this.init();
    }

    public init(): void {
        this.routes();
        this.swaggify();
    }

    public listen(): void {
        this.app.listen(this.PORT, () => {
            console.log(`App listening on PORT ${process.env.PORT}`);
        });
    }  
    
    private routes(): void {
        this.app.get('/', (req: any, res: any) => {
            res.status(200).send(`Server made up and running!`)
        });      
    }

    private swaggify(): void {    
        new User();

        import('./swagger/swagger.json').then((file: any) =>  {
                const specs = swaggerJsdoc(file);
                this.app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));
            }
        );


    }
};

export default App;