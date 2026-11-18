import { Injectable } from '@nestjs/common';
import {
  PaginatedResult,
  PaginationQueryDto,
} from 'src/apresentation/dto/pagination.dto';
import { OrganizationEntity } from 'src/entities/organization.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrganizationService {
  constructor(private readonly prisma: PrismaService) {}

  async getOrganization({
    page,
    limit,
  }: PaginationQueryDto): Promise<PaginatedResult<OrganizationEntity>> {
    const [items, total] = await this.prisma.$transaction([
      this.prisma.organization.findMany({
        orderBy: [{ createdAt: 'desc' }, { id: 'asc' }],
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.organization.count(),
    ]);

    return {
      data: items.map((item) => OrganizationEntity.restore(item)),
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
