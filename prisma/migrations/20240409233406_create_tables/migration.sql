/*
  Warnings:

  - Added the required column `userId` to the `polygons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `polygons` ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `polygons` ADD CONSTRAINT `polygons_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
