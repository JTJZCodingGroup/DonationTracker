/*
  Warnings:

  - You are about to alter the column `goal` on the `Projects` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `progress` on the `Projects` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `amount` on the `Donations` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Projects" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "goal" INTEGER NOT NULL,
    "progress" INTEGER NOT NULL,
    "end_date" DATETIME NOT NULL
);
INSERT INTO "new_Projects" ("created_at", "end_date", "goal", "id", "name", "progress") SELECT "created_at", "end_date", "goal", "id", "name", "progress" FROM "Projects";
DROP TABLE "Projects";
ALTER TABLE "new_Projects" RENAME TO "Projects";
CREATE UNIQUE INDEX "Projects_name_key" ON "Projects"("name");
CREATE TABLE "new_Donations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "project_id" TEXT NOT NULL,
    "donated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amount" INTEGER NOT NULL,
    CONSTRAINT "Donations_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Projects" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Donations" ("amount", "donated_at", "id", "project_id") SELECT "amount", "donated_at", "id", "project_id" FROM "Donations";
DROP TABLE "Donations";
ALTER TABLE "new_Donations" RENAME TO "Donations";
PRAGMA foreign_key_check("Projects");
PRAGMA foreign_key_check("Donations");
PRAGMA foreign_keys=ON;
