/*
  Warnings:

  - Added the required column `end_date` to the `Projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `progress` to the `Projects` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Projects" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "goal" BIGINT NOT NULL,
    "progress" BIGINT NOT NULL,
    "end_date" DATETIME NOT NULL
);
INSERT INTO "new_Projects" ("goal", "id", "name") SELECT "goal", "id", "name" FROM "Projects";
DROP TABLE "Projects";
ALTER TABLE "new_Projects" RENAME TO "Projects";
CREATE UNIQUE INDEX "Projects_name_key" ON "Projects"("name");
PRAGMA foreign_key_check("Projects");
PRAGMA foreign_keys=ON;
