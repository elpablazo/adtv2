-- CreateTable
CREATE TABLE "Fragmento" (
    "id" TEXT NOT NULL,
    "cantidad" DOUBLE PRECISION NOT NULL,
    "concepto" TEXT NOT NULL,
    "monto" DOUBLE PRECISION NOT NULL,
    "transaccionId" TEXT NOT NULL,

    CONSTRAINT "Fragmento_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Fragmento" ADD CONSTRAINT "Fragmento_transaccionId_fkey" FOREIGN KEY ("transaccionId") REFERENCES "Transaccion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
