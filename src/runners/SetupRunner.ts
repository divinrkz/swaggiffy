import { Defaults } from "../utils/Defaults";
import { FileUtils } from "../utils/FileUtils";
export class SetupRunner {
    /**
     * Generate Swaggify Configuration File Template
     */
    static async generateConfigFile(template: string, configFile?: string, override?: boolean): Promise<string> {
        const filePath: string = await FileUtils.createFileInWorkspace(configFile || Defaults.SWAGGIFY_CONFIG_FILE, override);
        return await FileUtils.writeToFile(filePath, template);
    }
}
