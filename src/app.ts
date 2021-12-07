import express from 'express';


class App {

    private PORT: number = parseInt(process.env.PORT as string);

    public app: express.Application;

    constructor() {
        this.app = express();
    }


    public listen() {
        console.log('Running')
        this.app.listen(this.PORT, () => {
            console.log(`App listening on the port ${process.env.PORT}`);
        })
    }  
};

export default App;