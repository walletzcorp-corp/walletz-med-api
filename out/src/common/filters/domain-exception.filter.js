"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const domain_error_1 = require("../errors/domain-error");
const STATUS_BY_CODE = {
    NOT_FOUND: common_1.HttpStatus.NOT_FOUND,
    CONFLICT: common_1.HttpStatus.CONFLICT,
    INVALID: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
};
let DomainExceptionFilter = class DomainExceptionFilter {
    catch(error, host) {
        const status = STATUS_BY_CODE[error.code] ?? common_1.HttpStatus.BAD_REQUEST;
        host
            .switchToHttp()
            .getResponse()
            .status(status)
            .json({ statusCode: status, error: error.name, message: error.message });
    }
};
exports.DomainExceptionFilter = DomainExceptionFilter;
exports.DomainExceptionFilter = DomainExceptionFilter = __decorate([
    (0, common_1.Catch)(domain_error_1.DomainError)
], DomainExceptionFilter);
//# sourceMappingURL=domain-exception.filter.js.map