// export * from "./decorators/Schema";
// export * from "./Swaggify";

import { InitCommand } from "./commands/InitCommand";
import { InitRunner } from "./runners/InitRunner";
import { Swaggify } from "./Swaggify";
import express, { Express } from "express";

// SetupRunner.generateConfigFile();

const expressApp: Express = express();

new Swaggify().setupExpress(expressApp).swaggify();

// InitRunner.extractConfigurations();


