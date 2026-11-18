import { Injectable, NestMiddleware } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuditMiddleware implements NestMiddleware {
  constructor(private readonly prisma: PrismaService) {}

  async use(req: Request, resp: Response, next: Function) {
    let request = req;
    // descobrir como pegar o metodo que veio nesse request
    // e guardar aqui um let method =
  }
}
