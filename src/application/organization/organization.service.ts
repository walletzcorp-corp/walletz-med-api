import { Injectable } from '@nestjs/common';
import { OrganizationEntity } from 'src/entities/organization.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrganizationService {
  constructor(private readonly prisma: PrismaService) {}
  async getOrganization() {
    const row = await this.prisma.organization.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return row.map((row) => OrganizationEntity.restore(row));
  }
}
