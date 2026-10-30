"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitEntity = void 0;
const node_crypto_1 = require("node:crypto");
const unit_error_1 = require("../common/errors/unit.error");
class UnitEntity {
    id;
    organizationId;
    code;
    name;
    address;
    municipality;
    uf;
    timezone;
    status;
    rowVersion;
    createdAt;
    updatedAt;
    constructor(data) {
        this.id = data.id;
        this.organizationId = data.organizationId;
        this.code = data.code;
        this.name = data.name;
        this.address = data.address;
        this.municipality = data.municipality;
        this.uf = data.uf;
        this.timezone = data.timezone;
        this.status = data.status;
        this.rowVersion = data.rowVersion;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }
    static create(input) {
        const now = new Date();
        return new UnitEntity({
            id: (0, node_crypto_1.randomUUID)(),
            organizationId: input.organizationId,
            code: input.code.trim(),
            name: input.name.trim(),
            address: input.address.trim(),
            municipality: input.municipality.trim(),
            uf: input.uf.trim().toUpperCase(),
            timezone: input.timezone.trim(),
            status: 'RASCUNHO',
            rowVersion: 1,
            createdAt: now,
            updatedAt: now,
        });
    }
    static restore(data) {
        return new UnitEntity({
            id: data.id,
            organizationId: data.organizationId,
            code: data.unitCode,
            name: data.name ?? '',
            address: data.address ?? '',
            municipality: data.municipality ?? '',
            uf: data.uf ?? '',
            timezone: data.timezone ?? '',
            status: data.status,
            rowVersion: data.row_version,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
        });
    }
    activate() {
        if (this.status === 'ATIVA')
            return;
        if (this.status === 'INATIVA') {
            throw new unit_error_1.InvalidUnitError('Unidade inativa não pode ser ativada diretamente.');
        }
        const pendingFields = [];
        if (!this.name?.trim())
            pendingFields.push('nome');
        if (!this.code?.trim())
            pendingFields.push('código');
        if (!this.address?.trim())
            pendingFields.push('endereço');
        if (!this.municipality?.trim())
            pendingFields.push('município');
        if (!this.uf?.trim())
            pendingFields.push('UF');
        if (!this.timezone?.trim())
            pendingFields.push('fuso horário');
        if (pendingFields.length > 0) {
            throw new unit_error_1.UnitChecklistPendingError(pendingFields);
        }
        this.status = 'ATIVA';
        this.rowVersion += 1;
        this.updatedAt = new Date();
    }
    block(reason) {
        if (!reason?.trim()) {
            throw new unit_error_1.InvalidUnitError('O motivo do bloqueio é obrigatório.');
        }
        if (this.status === 'INATIVA') {
            throw new unit_error_1.InvalidUnitError('Unidade inativa não pode ser bloqueada.');
        }
        this.status = 'BLOQUEADA';
        this.rowVersion += 1;
        this.updatedAt = new Date();
    }
    inactivate() {
        this.status = 'INATIVA';
        this.rowVersion += 1;
        this.updatedAt = new Date();
    }
    update(fields, expectedVersion) {
        if (this.rowVersion !== expectedVersion) {
            throw new unit_error_1.UnitVersionConflictError(`Conflito de versão: esperado ${expectedVersion}, atual ${this.rowVersion}.`);
        }
        if (fields.timezone)
            UnitEntity.assertTimezone(fields.timezone);
        if (fields.uf)
            UnitEntity.assertUf(fields.uf);
        Object.assign(this, fields);
        this.rowVersion += 1;
        this.updatedAt = new Date();
    }
    static assertTimezone(tz) {
        if (!Intl.supportedValuesOf('timeZone').includes(tz)) {
            throw new unit_error_1.InvalidUnitError(`Fuso horário IANA '${tz}' é inválido.`);
        }
    }
    static assertUf(uf) {
        if (!/^[A-Z]{2}$/.test(uf.toUpperCase())) {
            throw new unit_error_1.InvalidUnitError('UF deve conter exatamente 2 letras.');
        }
    }
}
exports.UnitEntity = UnitEntity;
//# sourceMappingURL=unit.entity.js.map