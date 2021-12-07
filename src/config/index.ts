import dotenv from 'dotenv';
import { Logger } from 'pino';



export default abstract class Config {

    constructor() {
        dotenv.config();
    }

}