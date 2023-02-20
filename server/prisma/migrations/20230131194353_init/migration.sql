-- CreateTable
CREATE TABLE "people" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "workdaySchedules_id" INTEGER,
    CONSTRAINT "people_workdaySchedules_id_fkey" FOREIGN KEY ("workdaySchedules_id") REFERENCES "workday_schedules" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "workday_schedules" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "workdays" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hour" DATETIME NOT NULL,
    "week_day" INTEGER NOT NULL,
    "workdaySchedulesId" INTEGER NOT NULL,
    CONSTRAINT "workdays_workdaySchedulesId_fkey" FOREIGN KEY ("workdaySchedulesId") REFERENCES "workday_schedules" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "clock_points" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hour" DATETIME NOT NULL,
    "order" INTEGER NOT NULL,
    "person_id" INTEGER NOT NULL,
    CONSTRAINT "clock_points_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "people" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "people_workdaySchedules_id_key" ON "people"("workdaySchedules_id");
