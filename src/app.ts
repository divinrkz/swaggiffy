import express, {Express} from 'express';
import Config from './config';
import swaggerUi from 'swagger-ui-express';
import  swaggerJsdoc from "swagger-jsdoc";
import fs from 'fs';

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

        const options = {
            swaggerDefinition: {
            "swagger": "2.0",
            "info": {
                "description": "This is a simple example NodeJS API project to demonstrate Swagger Documentation",
                "version": "1.0.0",
                "title": "Tasks API",
                "contact": {
                    "email": "abc@gmail.com"
                },
                "license": {
                    "name": "Apache 2.0",
                    "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
                }
            },
            "schemes": ["http"],
            "host": "localhost:3080",
            "basePath": "/api",
            
            "paths" : {
                "/todos" : {
                    "get" : {
                        "summary" : "Get all the tasks",
                        "description": "Get all the tasks",
                        "tags": ["test"],
                        "produces": ["application/json"],
                        "parameters": [],
                        "responses": {
                            "200": {
                                "description": "successful operation",
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/todosResponse"
                                    }
                                }
                            },
                            "400": {
                                "description": "Invalid status value",
                                "schema": {
                                    "$ref": "#/definitions/InvalidResponse"
                                }
                            }
                        }
                    }
                },
                "/todo" : {
                    "post" : {
                        "summary" : "Save the task",
                        "description": "Save the task",
                        "produces": ["application/json"],
                        "consumes": ["application/json"],
                        "parameters": [
                            {
                                "in": "body",
                                "name": "body",
                                "description": "task object",
                                "required": true,
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "task" : {
                                            "type": "object",
                                            "$ref": "#/definitions/Task"
                                        } 
                                    }
                                }
                            }
                        ],
                        "responses": {
                            "200": {
                                "description": "successful operation",
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/todosResponse"
                                    }
                                }
                            },
                            "400": {
                                "description": "Invalid status value",
                                "schema": {
                                    "$ref": "#/definitions/InvalidResponse"
                                }
                            }
                        }
                    }
                },
                "/todos/{id}" : {
                    "put" : {
                        "summary" : "Update the tasks",
                        "description": "Update the tasks",
                        "produces": ["application/json"],
                        "parameters": [
                            {
                                "name": "id",
                                "in": "path",
                                "description": "task id that needs to be deleted",
                                "required": true,
                                "type": "string"
                            },
                            {
                                "in": "body",
                                "name": "body",
                                "description": "task object",
                                "required": true,
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "task" : {
                                            "type": "object",
                                            "$ref": "#/definitions/Task"
                                        } 
                                    }
                                }
                            }
                        ],
                        "responses": {
                            "200": {
                                "description": "successful operation",
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/todosResponse"
                                    }
                                }
                            },
                            "400": {
                                "description": "Invalid status value",
                                "schema": {
                                    "$ref": "#/definitions/InvalidResponse"
                                }
                            }
                        }
                    }
                },
                "/todo/{id}" : {
                    "delete" : {
                        "summary" : "Delete the task",
                        "description": "Delete the task",
                        "produces": ["application/json"],
                        "parameters": [
                            {
                                "name": "id",
                                "in": "path",
                                "description": "task id that needs to be deleted",
                                "required": true,
                                "type": "string"
                            }
                        ],
                        "responses": {
                            "200": {
                                "description": "successful operation",
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/todosResponse"
                                    }
                                }
                            },
                            "400": {
                                "description": "Invalid status value",
                                "schema": {
                                    "$ref": "#/definitions/InvalidResponse"
                                }
                            }
                        }
                    }
                }
            }, 
        },
            "definitions": {
                "todosResponse": {
                    "type": "object",
                    "properties": {
                        "id": {
                             "type": "integer"
                        },
                        "task": {
                            "type": "string"
                        },
                        "assignee": {
                            "type": "string"
                        },
                        "status": {
                            "type": "string"
                        }
                    }
                },
                "Task": {
                    "type": "object",
                    "properties": {
                        "task": {
                            "type": "string"
                        },
                        "assignee": {
                            "type": "string"
                        },
                        "status": {
                            "type": "string"
                        }
                    }
                },
                "InvalidResponse": {
                    "type": "object",
                    "properties": {
                        "statusCode": {
                            "type": "string"
                        },
                        "message": {
                            "type": "string"
                        }
                    }
        
                }
            },
            "apis": []
        };        
        


          const specs = swaggerJsdoc(options);

        this.app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs, this.swaggerFile));
    }

};

export default App;