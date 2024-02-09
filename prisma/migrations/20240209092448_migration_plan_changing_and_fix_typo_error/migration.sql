/*
  Warnings:

  - You are about to drop the column `subscritiptionId` on the `subscription` table. All the data in the column will be lost.
  - The values [price_1OYxkqFj9oKEERu1NbKUxXxN,price_1OYxkqFj9oKEERu1KfJGWxgN] on the enum `Subscription_plan` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[subscriptionId]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `subscriptionId` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Subscription_subscritiptionId_key` ON `subscription`;

-- AlterTable
ALTER TABLE `subscription` DROP COLUMN `subscritiptionId`,
    ADD COLUMN `subscriptionId` VARCHAR(191) NOT NULL,
    MODIFY `plan` ENUM('price_1OhpSCJjzYL3OcBNfOeQQO1d') NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Subscription_subscriptionId_key` ON `Subscription`(`subscriptionId`);
