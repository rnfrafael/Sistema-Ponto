/*
  Warnings:

  - You are about to drop the column `hour` on the `clock_points` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `clock_points` table. All the data in the column will be lost.
  - Added the required column `point` to the `clock_points` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpf` to the `people` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_clock_points" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "point" DATETIME NOT NULL,
    "person_id" INTEGER NOT NULL,
    CONSTRAINT "clock_points_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "people" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_clock_points" ("id", "person_id") SELECT "id", "person_id" FROM "clock_points";
DROP TABLE "clock_points";
ALTER TABLE "new_clock_points" RENAME TO "clock_points";
CREATE TABLE "new_people" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "workdaySchedules_id" INTEGER,
    CONSTRAINT "people_workdaySchedules_id_fkey" FOREIGN KEY ("workdaySchedules_id") REFERENCES "workday_schedules" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_people" ("id", "name", "workdaySchedules_id") SELECT "id", "name", "workdaySchedules_id" FROM "people";
DROP TABLE "people";
ALTER TABLE "new_people" RENAME TO "people";
CREATE UNIQUE INDEX "people_id_workdaySchedules_id_key" ON "people"("id", "workdaySchedules_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
