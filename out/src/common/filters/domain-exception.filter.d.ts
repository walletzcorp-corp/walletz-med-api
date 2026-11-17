import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { DomainError } from '../errors/domain-error';
export declare class DomainExceptionFilter implements ExceptionFilter<DomainError> {
    catch(error: DomainError, host: ArgumentsHost): void;
}
