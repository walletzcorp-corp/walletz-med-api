"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationVersionConflictError = exports.OrganizationEntity = void 0;
const node_crypto_1 = require("node:crypto");
const organization_errors_1 = require("../common/errors/organization.errors");
class OrganizationEntity {
    id;
    tenantId;
    legalName;
    tradeName;
    cnpjDigits;
    taxProfile;
    regionalConfigId;
    status;
    rowVersion;
    createdAt;
    updatedAt;
    constructor(data) {
        this.id = data.id;
        this.tenantId = data.tenantId;
        this.legalName = data.legalName;
        this.tradeName = data.tradeName;
        this.cnpjDigits = data.cnpjDigits;
        this.taxProfile = data.taxProfile;
        this.regionalConfigId = data.regionalConfigId;
        this.status = data.status;
        this.rowVersion = data.rowVersion;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }
    static createIsValid(input) {
        OrganizationEntity.assertCnpj(input.cnpjDigits);
        OrganizationEntity.assertNonEmpty(input.legalName, 'Razão social');
        OrganizationEntity.assertNonEmpty(input.tradeName, 'Nome fantasia');
        const now = new Date();
        return new OrganizationEntity({
            ...input,
            id: (0, node_crypto_1.randomUUID)(),
            status: 'ACTIVE',
            rowVersion: 1,
            createdAt: now,
            updatedAt: now,
        });
    }
    static restore(data) {
        return new OrganizationEntity(data);
    }
    update(fields, expectedVersion) {
        if (this.rowVersion !== expectedVersion) {
            throw new OrganizationVersionConflictError(`Conflito de versão: esperado ${expectedVersion}, atual ${this.rowVersion}.`);
        }
        if (fields.cnpjDigits !== undefined)
            OrganizationEntity.assertCnpj(fields.cnpjDigits);
        if (fields.legalName !== undefined)
            OrganizationEntity.assertNonEmpty(fields.legalName, 'Razão social');
        if (fields.tradeName !== undefined)
            OrganizationEntity.assertNonEmpty(fields.tradeName, 'Nome fantasia');
        Object.assign(this, fields);
        this.rowVersion += 1;
        this.updatedAt = new Date();
    }
    deactivate() {
        this.status = 'INACTIVE';
        this.rowVersion += 1;
        this.updatedAt = new Date();
    }
    static assertCnpj(cnpjDigits) {
        if (!/^[A-Za-z0-9]{12}\d{2}$/.test(cnpjDigits)) {
            throw new organization_errors_1.InvalidOrganizationError('CNPJ deve conter exatamente 14 caracteres alfanuméricos válidos.');
        }
    }
    static assertNonEmpty(value, field) {
        if (!value?.trim()) {
            throw new organization_errors_1.InvalidOrganizationError(`${field} é obrigatório.`);
        }
    }
}
exports.OrganizationEntity = OrganizationEntity;
class OrganizationVersionConflictError extends Error {
    code = 'CONFLICT';
    constructor(message) {
        super(message);
        this.name = 'OrganizationVersionConflictError';
    }
}
exports.OrganizationVersionConflictError = OrganizationVersionConflictError;
//# sourceMappingURL=organization.entity.js.map