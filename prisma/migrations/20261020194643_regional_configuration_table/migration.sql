-- CreateTable
CREATE TABLE "regional_configuration" (
    "regional_config_id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "timezone" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "regional_configuration_pkey" PRIMARY KEY ("regional_config_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "regional_configuration_code_key" ON "regional_configuration"("code");

-- AddForeignKey
ALTER TABLE "organization" ADD CONSTRAINT "organization_regional_config_id_fkey" FOREIGN KEY ("regional_config_id") REFERENCES "regional_configuration"("regional_config_id") ON DELETE RESTRICT ON UPDATE CASCADE;
