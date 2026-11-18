"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_module_1 = require("./prisma/prisma.module");
const tenants_module_1 = require("./application/tenant/tenants.module");
const unit_module_1 = require("./application/unit/unit.module");
const organization_module_1 = require("./application/organization/organization.module");
const audit_middleware_1 = require("./infra/middlewares/audit.middleware");
const organization_controller_1 = require("./apresentation/controllers/organization.controller");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(audit_middleware_1.AuditMiddleware).forRoutes(organization_controller_1.OrganizationController);
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            prisma_module_1.PrismaModule,
            tenants_module_1.TenantsModule,
            unit_module_1.UnitModule,
            organization_module_1.OrganizationModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map