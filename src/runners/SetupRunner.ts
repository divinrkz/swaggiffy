import { Defaults } from "../utils/Defaults";
import { FileUtils } from "../utils/FileUtils";
export class SetupRunner {
    /**
     * Generate Swaggify Configuration File Template
     */
    static async generateConfigFile(template: string, override?: boolean): Promise<string> {
        const filePath: string = await FileUtils.createFileInWorkspace(Defaults.SWAGGIFY_CONFIG_FILE, override);
        return await FileUtils.writeToFile(filePath, template);
    }

        /**
     * Generate Swaggify Configuration File Template
     */
         static async generateSpecFile(template: string, specFile?: string, override?: boolean): Promise<string> {
            const filePath: string = await FileUtils.createFileInWorkspace(specFile || Defaults.SWAGGER_DEFINITION_FILE, override);
            return await FileUtils.writeToFile(filePath, template);
        }


}
