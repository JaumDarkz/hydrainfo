/*
  Warnings:

  - The values [price_1OhqYAJjzYL3OcBNhfC8DT1B] on the enum `Subscription_plan` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `subscription` MODIFY `plan` ENUM('price_1OhpSCJjzYL3OcBNfOeQQO1d') NULL;
