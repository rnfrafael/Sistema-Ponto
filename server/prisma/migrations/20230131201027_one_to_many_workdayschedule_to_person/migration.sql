/*
  Warnings:

  - Made the column `workdaySchedules_id` on table `people` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_people" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "workdaySchedules_id" INTEGER NOT NULL,
    CONSTRAINT "people_workdaySchedules_id_fkey" FOREIGN KEY ("workdaySchedules_id") REFERENCES "workday_schedules" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_people" ("id", "name", "workdaySchedules_id") SELECT "id", "name", "workdaySchedules_id" FROM "people";
DROP TABLE "people";
ALTER TABLE "new_people" RENAME TO "people";
CREATE UNIQUE INDEX "people_id_workdaySchedules_id_key" ON "people"("id", "workdaySchedules_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
