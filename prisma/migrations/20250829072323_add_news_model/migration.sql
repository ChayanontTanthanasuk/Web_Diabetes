-- CreateTable
CREATE TABLE "News" (
    "new_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "image_url" TEXT,

    CONSTRAINT "News_pkey" PRIMARY KEY ("new_id")
);
