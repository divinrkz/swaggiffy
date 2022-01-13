import { Express } from 'express'
import App from './app'
import { PathString } from './typings'
import { getConfigMetadataStorage } from './globals'
import { ConfigMetadataStorage } from './storage/ConfigMetadataStorage'
import { SwaggifyException } from './exceptions/SwaggifyException'
import { Defaults } from './utils/Defaults'

/**
 * Swaggify base class
 */
export class Swaggify {
  private app: App
  private configStore: ConfigMetadataStorage = getConfigMetadataStorage()

  constructor() {
    this.app = new App()
  }

  /**
   * Setups expressApplication with swaggify.
   * @returns Swaggify
   */
  public setupExpress(expressApp: Express): this {
    // this.configStore expressApplication in ConfigMetadataStorage.
    this.configStore.expressApplication = expressApp

    return this
  }

  /**
   * Setups route endpoint url with swaggify.
   * @returns Swaggify
   */
  public setupRoute(routeEndPointUrl: PathString): this {
    this.configStore.swaggerEndPointUrl = routeEndPointUrl
    return this
  }

  /**
   * Setups and Builds a swagger config file template in the specified directory and file.
   * @returns Swaggify
   */
  public setupSwagger(filePath: string): this {
    this.configStore.swaggerConfigPath = filePath
    return this
  }

  /**
   * Swaggifies your application.
   * @returns Swaggify
   */
  public swaggify(): this {
    if (
      this.configStore.expressApplication == undefined ||
      this.configStore.expressApplication == null
    )
      throw SwaggifyException('Express Application instance is undefined')

    if (
      this.configStore.swaggerEndPointUrl == undefined ||
      this.configStore.swaggerEndPointUrl == null
    )
      this.configStore.swaggerEndPointUrl = Defaults.SWAGGER_ENDPOINT_URL

    if (
      this.configStore.expressApplication == undefined ||
      this.configStore.expressApplication == null
    )
      this.configStore.swaggerConfigPath = Defaults.SWAGGER_CONFIG_FILE

    this.app.init(
      this.configStore.expressApplication,
      this.configStore.swaggerConfigPath,
      this.configStore.swaggerEndPointUrl
    )

    return this
  }
}
