/*
  Warnings:

  - The `status` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "payStatus" AS ENUM ('PAID', 'PENDING', 'FAILED');

-- CreateEnum
CREATE TYPE "orderStatus" AS ENUM ('PENDING', 'SERVED', 'CANCEL');

-- CreateEnum
CREATE TYPE "itemStatus" AS ENUM ('AVAILABLE', 'OUT_OF_STOCK');

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "status" "itemStatus" NOT NULL DEFAULT 'AVAILABLE';

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "payment" "payStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "tabel" TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" "orderStatus" NOT NULL DEFAULT 'PENDING';

-- DropEnum
DROP TYPE "Status";
