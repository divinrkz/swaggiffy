import { cwd } from 'process';

export class Constants {
    static BASE_DIR: string = cwd(); 
    static SWAGGER_CONFIG: string = this.BASE_DIR + '/src/swagger/swagger.json'; 
}