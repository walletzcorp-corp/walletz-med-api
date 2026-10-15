"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantEntity = void 0;
const node_crypto_1 = require("node:crypto");
const tenant_errors_1 = require("../common/errors/tenant.errors");
class TenantEntity {
    id;
    key;
    status;
    createdAt;
    constructor(data) {
        this.id = data.id;
        this.key = data.key;
        this.status = data.status;
        this.createdAt = data.createdAt;
    }
    static create() {
        return new TenantEntity({
            id: (0, node_crypto_1.randomUUID)(),
            key: (0, node_crypto_1.randomBytes)(32).toString('hex'),
            status: 'ACTIVE',
            createdAt: new Date(),
        });
    }
    static restore(data) {
        return new TenantEntity(data);
    }
    activate() {
        if (this.status === 'ACTIVE')
            return;
        this.status = 'ACTIVE';
    }
    deactivate() {
        if (this.status === 'INACTIVE')
            return;
        this.assertNotSuspended();
        this.status = 'INACTIVE';
    }
    suspend() {
        this.status = 'SUSPENDED';
    }
    assertNotSuspended() {
        if (this.status === 'SUSPENDED') {
            throw new tenant_errors_1.InvalidTenantError('Tenant suspenso não pode ser desativado diretamente. Use reativação.');
        }
    }
}
exports.TenantEntity = TenantEntity;
//# sourceMappingURL=tenant.entity.js.map