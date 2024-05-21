-- CreateTable
CREATE TABLE "Donations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "project_id" TEXT NOT NULL,
    "donated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amount" BIGINT NOT NULL,
    CONSTRAINT "Donations_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Projects" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
