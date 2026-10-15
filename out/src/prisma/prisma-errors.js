"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isForeignKeyViolation = isForeignKeyViolation;
const client_1 = require("@prisma/client");
function isForeignKeyViolation(err) {
    return (err instanceof client_1.Prisma.PrismaClientKnownRequestError && err.code === 'P2003');
}
//# sourceMappingURL=prisma-errors.js.map