/*
  Warnings:

  - A unique constraint covering the columns `[full_name]` on the table `Project` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "State" AS ENUM ('OPEN', 'CLOSED');

-- CreateTable
CREATE TABLE "Issue" (
    "id" SERIAL NOT NULL,
    "github_id" TEXT NOT NULL,
    "issue_title" TEXT NOT NULL,
    "issue_number" INTEGER NOT NULL,
    "issue_labels" TEXT[],
    "issue_time" TIMESTAMP(3) NOT NULL,
    "state" "State" NOT NULL DEFAULT 'OPEN',
    "project_full_name" TEXT NOT NULL,

    CONSTRAINT "Issue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Issue_github_id_key" ON "Issue"("github_id");

-- CreateIndex
CREATE UNIQUE INDEX "Project_full_name_key" ON "Project"("full_name");

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_project_full_name_fkey" FOREIGN KEY ("project_full_name") REFERENCES "Project"("full_name") ON DELETE RESTRICT ON UPDATE CASCADE;
