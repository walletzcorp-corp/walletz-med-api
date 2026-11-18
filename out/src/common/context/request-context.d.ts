import { NextFunction, Request, Response } from 'express';
export interface RequestContext {
    correlationId: string;
    actorId: string;
    role: string;
    origin: string;
}
export declare function requestContextMiddleware(req: Request, res: Response, next: NextFunction): void;
export declare function currentContext(): RequestContext;
