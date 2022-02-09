// export * from "./decorators/Schema";
// export * from "./Swaggify";

import { InitCommand } from "./commands/InitCommand";
import { InitRunner } from "./runners/InitializationRunner";

// SetupRunner.generateConfigFile();

InitRunner.extractConfigurations();