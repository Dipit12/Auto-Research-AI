-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "query" TEXT NOT NULL,
    "summarisedData" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);
