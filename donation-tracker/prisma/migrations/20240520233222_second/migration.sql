-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Projects" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "goal" BIGINT NOT NULL DEFAULT 0
);
INSERT INTO "new_Projects" ("id", "name") SELECT "id", "name" FROM "Projects";
DROP TABLE "Projects";
ALTER TABLE "new_Projects" RENAME TO "Projects";
CREATE UNIQUE INDEX "Projects_name_key" ON "Projects"("name");
PRAGMA foreign_key_check("Projects");
PRAGMA foreign_keys=ON;
