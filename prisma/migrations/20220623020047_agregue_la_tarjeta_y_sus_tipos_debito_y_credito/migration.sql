-- CreateEnum
CREATE TYPE "TipoTarjeta" AS ENUM ('Credito', 'Debito');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Tarjeta" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "saldo" DOUBLE PRECISION NOT NULL,
    "numero" TEXT,
    "cvv" TEXT,
    "fechaDeCorte" TEXT NOT NULL,
    "fechaDeVencimiento" TEXT,
    "tipo" "TipoTarjeta" NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tarjeta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Credito" (
    "lineaDeCredito" DOUBLE PRECISION NOT NULL,
    "tasaDeInteres" DOUBLE PRECISION NOT NULL,
    "anualidad" DOUBLE PRECISION NOT NULL,
    "tarjetaId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Debito" (
    "tarjetaId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Credito_tarjetaId_key" ON "Credito"("tarjetaId");

-- CreateIndex
CREATE UNIQUE INDEX "Debito_tarjetaId_key" ON "Debito"("tarjetaId");

-- AddForeignKey
ALTER TABLE "Tarjeta" ADD CONSTRAINT "Tarjeta_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Credito" ADD CONSTRAINT "Credito_tarjetaId_fkey" FOREIGN KEY ("tarjetaId") REFERENCES "Tarjeta"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Debito" ADD CONSTRAINT "Debito_tarjetaId_fkey" FOREIGN KEY ("tarjetaId") REFERENCES "Tarjeta"("id") ON DELETE CASCADE ON UPDATE CASCADE;
