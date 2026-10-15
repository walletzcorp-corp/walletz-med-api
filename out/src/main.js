"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const domain_exception_filter_1 = require("./common/filters/domain-exception.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.useGlobalFilters(new domain_exception_filter_1.DomainExceptionFilter());
    app.enableShutdownHooks();
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Walletz Med API')
        .setDescription('API de retaguarda do Walletz Med (Tenants e Organizações)')
        .setVersion('1.0')
        .addTag('Tenants')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    const port = process.env.PORT ?? 3000;
    app.enableCors({
        origin: 'http://localhost:5173',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    await app.listen(port);
    console.log(`walletz-med-api rodando em http://localhost:${port}`);
}
void bootstrap();
//# sourceMappingURL=main.js.map