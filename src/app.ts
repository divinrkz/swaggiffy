import express, {Express} from 'express';
import Config from './config';
import swaggerUi from 'swagger-ui-express';
import  swaggerJsdoc from "swagger-jsdoc";
import fs from 'fs';
import swaggerDocument from './swagger/swagger.json';

class App extends Config {



    private PORT: number = parseInt(process.env.PORT as string);

    public app: Express;

    /**
     * Swagger files
     */

    private swaggerFile: any = (process.cwd() + "/src/swagger/swagger.json");
    private swaggerData: any = fs.readFileSync(this.swaggerFile, 'utf8');
    private customCss: any = fs.readFileSync((process.cwd() + "/src/swagger/swagger.css"), 'utf8');
    // private swaggerDocument = JSON.parse(this.swaggerFile);


    constructor() {
        super();
        console.log(swaggerDocument);

        this.app = express();
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
        this.app.get('/', (req, res) => {
            res.status(200).send(`Server made up and running!`)
        });   
        
        const specs = swaggerJsdoc(swaggerDocument);

        this.app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs, this.swaggerFile));
    }

};

export default App;