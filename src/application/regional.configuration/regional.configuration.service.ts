import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RegionalConfigurationService {
  constructor(private readonly prisma: PrismaService) {}

  findAllActive() {
    return this.prisma.regionalConfiguration.findMany({
      where: { active: true },
      orderBy: { name: 'asc' },
    });
  }
}
