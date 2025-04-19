-- CreateTable
CREATE TABLE "NGOReport" (
    "id" SERIAL NOT NULL,
    "ngoId" TEXT NOT NULL,
    "ngoName" TEXT NOT NULL,
    "month" TIMESTAMP(3) NOT NULL,
    "peopleHelped" INTEGER NOT NULL,
    "eventsConducted" INTEGER NOT NULL,
    "fundsUtilized" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NGOReport_pkey" PRIMARY KEY ("id")
);
