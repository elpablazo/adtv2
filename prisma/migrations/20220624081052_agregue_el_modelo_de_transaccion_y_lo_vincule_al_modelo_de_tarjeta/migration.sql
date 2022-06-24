-- CreateTable
CREATE TABLE "Transaccion" (
    "id" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "monto" DOUBLE PRECISION NOT NULL,
    "categoria" TEXT NOT NULL,
    "subcategoria" TEXT,
    "concepto" TEXT,
    "tarjetaId" TEXT NOT NULL,

    CONSTRAINT "Transaccion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transaccion" ADD CONSTRAINT "Transaccion_tarjetaId_fkey" FOREIGN KEY ("tarjetaId") REFERENCES "Tarjeta"("id") ON DELETE CASCADE ON UPDATE CASCADE;
