import { ValidationPipe } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import { HttpAdapterHost } from "@nestjs/core"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import * as compression from "compression"

import { AppModule } from "./app.module"
import { PrismaClientExceptionFilter } from "./shared/filters"

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	const { httpAdapter } = app.get(HttpAdapterHost)

	/**
	 * Middlewares
	 */
	app.use(compression())
	app.useGlobalPipes(new ValidationPipe())
	app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter))

	/**
	 * Global prefix
	 */
	app.setGlobalPrefix("api")

	/**
	 * Swagger
	 */
	const config = new DocumentBuilder()
		.setTitle("Sport Actions API")
		.setDescription("Tech interview project")
		.setVersion("1.0")
		.addServer("http://localhost:3000/", "Local environment")
		.addServer("https://node-sport-action-task-production.up.railway.app/", "Production")
		.build()

	const document = SwaggerModule.createDocument(app, config)

	SwaggerModule.setup("docs", app, document, {
		customSiteTitle: "Sport Actions API",
		swaggerOptions: { docExpansion: "none" },
		useGlobalPrefix: true
	})

	app.enableCors()
	await app.listen(3000)
}
bootstrap()
