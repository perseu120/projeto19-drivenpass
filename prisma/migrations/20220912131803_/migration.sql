/*
  Warnings:

  - You are about to drop the column `senha` on the `credentials` table. All the data in the column will be lost.
  - You are about to drop the column `titulo` on the `credentials` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,title]` on the table `credentials` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `password` to the `credentials` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `credentials` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "credentials" DROP COLUMN "senha",
DROP COLUMN "titulo",
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "credentials_userId_title_key" ON "credentials"("userId", "title");
