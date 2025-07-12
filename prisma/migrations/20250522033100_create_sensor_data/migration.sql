-- CreateTable
CREATE TABLE "SensorData" (
    "id" SERIAL NOT NULL,
    "sensor" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "temp1" TEXT,
    "temp2" TEXT,
    "hum" TEXT,
    "press" TEXT,
    "alt" TEXT,
    "alt_dens" TEXT,
    "reading_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SensorData_pkey" PRIMARY KEY ("id")
);
