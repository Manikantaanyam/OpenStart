-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "display_name" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "avatar_url" TEXT NOT NULL,
    "stars" INTEGER NOT NULL,
    "techStack" TEXT[],
    "active" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);
