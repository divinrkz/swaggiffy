import App from './app';
import dotenv from 'dotenv';
// const logger = require('pino')()
import logger from 'pino'();

const log = logger();
log.info('hello world')

dotenv.config();

const app = new App();
app.listen();