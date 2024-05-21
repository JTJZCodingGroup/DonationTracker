-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Donations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "project_id" TEXT NOT NULL,
    "donated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amount" BIGINT NOT NULL,
    CONSTRAINT "Donations_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Projects" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Donations" ("amount", "donated_at", "id", "project_id") SELECT "amount", "donated_at", "id", "project_id" FROM "Donations";
DROP TABLE "Donations";
ALTER TABLE "new_Donations" RENAME TO "Donations";
PRAGMA foreign_key_check("Donations");
PRAGMA foreign_keys=ON;
