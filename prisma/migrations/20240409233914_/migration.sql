/*
  Warnings:

  - You are about to drop the column `userId` on the `polygons` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `polygons` DROP FOREIGN KEY `polygons_userId_fkey`;

-- AlterTable
ALTER TABLE `polygons` DROP COLUMN `userId`;
