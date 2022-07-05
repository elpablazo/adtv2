/*
  Warnings:

  - The primary key for the `Fragmento` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Fragmento` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Fragmento" DROP CONSTRAINT "Fragmento_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Fragmento_pkey" PRIMARY KEY ("id");
