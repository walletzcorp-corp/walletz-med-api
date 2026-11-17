-- CreateEnum
CREATE TYPE "UnitStatus" AS ENUM ('RASCUNHO', 'ATIVA', 'BLOQUEADA', 'INATIVA');

-- CreateTable
CREATE TABLE "units" (
    "unit_id" TEXT NOT NULL,
    "organization_id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT,
    "adress" TEXT,
    "municipality" TEXT,
    "UF" TEXT,
    "timezone" TEXT,
    "status" "UnitStatus" NOT NULL DEFAULT 'RASCUNHO',
    "row_version" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "units_pkey" PRIMARY KEY ("unit_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "units_organization_id_code_key" ON "units"("organization_id", "code");

-- AddForeignKey
ALTER TABLE "units" ADD CONSTRAINT "units_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organization"("organization_id") ON DELETE RESTRICT ON UPDATE CASCADE;
