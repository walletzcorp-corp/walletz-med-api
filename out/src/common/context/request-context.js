"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestContextMiddleware = requestContextMiddleware;
exports.currentContext = currentContext;
const node_async_hooks_1 = require("node:async_hooks");
const node_crypto_1 = require("node:crypto");
const storage = new node_async_hooks_1.AsyncLocalStorage();
const SAFE_ID = /^[A-Za-z0-9._-]{1,64}$/;
function header(req, name, fallback) {
    const value = req.header(name);
    return value && SAFE_ID.test(value) ? value : fallback;
}
function requestContextMiddleware(req, res, next) {
    const correlationId = header(req, 'x-correlation-id', (0, node_crypto_1.randomUUID)());
    res.setHeader('x-correlation-id', correlationId);
    storage.run({
        correlationId,
        actorId: header(req, 'x-actor-id', 'anonymous'),
        role: header(req, 'x-actor-role', 'unknown'),
        origin: `${req.method} ${req.path}`,
    }, next);
}
function currentContext() {
    return (storage.getStore() ?? {
        correlationId: (0, node_crypto_1.randomUUID)(),
        actorId: 'system',
        role: 'system',
        origin: 'internal',
    });
}
//# sourceMappingURL=request-context.js.map