"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantsModule = void 0;
const common_1 = require("@nestjs/common");
const tenants_controller_1 = require("../../apresentation/controllers/tenants.controller");
const tenants_service_1 = require("./tenants.service");
const regional_configuration_controller_1 = require("../../apresentation/controllers/regional-configuration.controller");
const regional_configuration_service_1 = require("../regional.configuration/regional-configuration.service");
let TenantsModule = class TenantsModule {
};
exports.TenantsModule = TenantsModule;
exports.TenantsModule = TenantsModule = __decorate([
    (0, common_1.Module)({
        controllers: [tenants_controller_1.TenantsController, regional_configuration_controller_1.RegionalConfigurationController],
        providers: [tenants_service_1.TenantsService, regional_configuration_service_1.RegionalConfigurationService],
    })
], TenantsModule);
//# sourceMappingURL=tenants.module.js.map