-- CreateTable
CREATE TABLE "AboutInfo" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "orgName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "vision" TEXT NOT NULL,
    "mission" TEXT[],
    "activePeriod" TEXT NOT NULL,
    "structure" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AboutInfo_pkey" PRIMARY KEY ("id")
);
