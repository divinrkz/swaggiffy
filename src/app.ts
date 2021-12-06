import * as express from 'express';


class App {

    public app: express.Application;

    constructor() {
        this.app = express();
    }

    public listen() {
        this.app.listen(4008, () => {
            console.log(`App listening on the port ${process.env.PORT}`);
        })
    }  
};

export default App;