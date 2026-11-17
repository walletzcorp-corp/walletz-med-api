/*
  Warnings:

  - You are about to drop the column `adress` on the `units` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "units" DROP COLUMN "adress",
ADD COLUMN     "address" TEXT;
