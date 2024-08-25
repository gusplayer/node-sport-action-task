import { ConfigModuleOptions } from "@nestjs/config"

const configuration: ConfigModuleOptions = {
	isGlobal: true,
	cache: true
}

export default configuration
