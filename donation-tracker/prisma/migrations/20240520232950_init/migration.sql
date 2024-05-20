-- CreateTable
CREATE TABLE "Projects" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Projects_name_key" ON "Projects"("name");
