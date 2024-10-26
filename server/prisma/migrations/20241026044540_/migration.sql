/*
  Warnings:

  - Made the column `itemImage` on table `Item` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Item" ALTER COLUMN "itemImage" SET NOT NULL,
ALTER COLUMN "itemImage" SET DEFAULT 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiX5LjkyUPAgEGYLPpuDymckpDCMrxk0JXLw&s';
