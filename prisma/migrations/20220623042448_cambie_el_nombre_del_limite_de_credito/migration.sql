/*
  Warnings:

  - You are about to drop the column `lineaDeCredito` on the `Credito` table. All the data in the column will be lost.
  - Added the required column `limiteDeCredito` to the `Credito` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Credito" DROP COLUMN "lineaDeCredito",
ADD COLUMN     "limiteDeCredito" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "anualidad" DROP NOT NULL;
