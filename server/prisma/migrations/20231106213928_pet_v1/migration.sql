/*
  Warnings:

  - Added the required column `petCategory` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `petCategory` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productCount` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "petCategory" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "petCategory" TEXT NOT NULL,
ADD COLUMN     "productCount" INTEGER NOT NULL;
