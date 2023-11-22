/*
  Warnings:

  - You are about to drop the column `age` on the `profile` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phoneNumber]` on the table `profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phoneNumber` to the `profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "pets" ADD VALUE 'smallPet';

-- AlterTable
ALTER TABLE "profile" DROP COLUMN "age",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "phoneNumber" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "name";

-- CreateIndex
CREATE UNIQUE INDEX "profile_phoneNumber_key" ON "profile"("phoneNumber");
