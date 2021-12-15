import express, {Express} from 'express';
import Config from './config';
import swaggerUi from 'swagger-ui-express';
import  swaggerJsdoc from "swagger-jsdoc";
import fs from 'fs';
import swaggerDocument from './utils/swagger.json';
import Utility from './utils/Utility';
import { Route } from './decorators/Route.decorator';
import { APIRoute } from './routes/express.route';
import SwaggifyModel from './models/swaggify.model';
import UserModel from './models/user.model';

class App extends Config {

    private PORT: number = parseInt(process.env.PORT as string);

    public app: Express;

    /**
     * Swagger files
     */

    private swaggerFile: any = (process.cwd() + "/src/utils/swagger.json");
    private swaggerData: any = fs.readFileSync(this.swaggerFile, 'utf8');


    constructor() {
        super();

        // this.navigateDirectory();
        this.app = express();

        // new SwaggifyModel();
        new UserModel();

        this.routes();


    }

    public listen(): void {


        this.app.listen(this.PORT, () => {
            console.log(`App listening on the port ${process.env.PORT}`);
        })
    }  
    

    public getServer(): Express {
        return this.app;
    }

    public routes(): void {
        this.app.get('/', (req: any, res: any) => {
            res.status(200).send(`Server made up and running!`)
        });   
        
        const specs = swaggerJsdoc(swaggerDocument);

        this.app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs, this.swaggerFile));
    }


    // public navigateDirectory() {
    //     console.log(__dirname);
    //     console.log(Utility._getAllFilesFromFolder(__dirname));
    // }

};

export default App;