/*
  Warnings:

  - Added the required column `coordinates` to the `polygons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `polygons` ADD COLUMN `coordinates` VARCHAR(191) NOT NULL;
