/*
  Warnings:

  - You are about to drop the `clock_points` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `people` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `workday_schedules` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `workdays` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "clock_points";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "people";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "workday_schedules";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "workdays";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "pessoas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "jornadas_trabalho_id" INTEGER,
    CONSTRAINT "pessoas_jornadas_trabalho_id_fkey" FOREIGN KEY ("jornadas_trabalho_id") REFERENCES "jornadas_trabalho" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "jornadas_trabalho" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "diasDaJornada" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hora" DATETIME NOT NULL,
    "dia_da_semana" INTEGER NOT NULL,
    "jornadas_trabalho_id" INTEGER NOT NULL,
    CONSTRAINT "diasDaJornada_jornadas_trabalho_id_fkey" FOREIGN KEY ("jornadas_trabalho_id") REFERENCES "jornadas_trabalho" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "pontos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ponto" DATETIME NOT NULL,
    "pessoa_id" INTEGER NOT NULL,
    CONSTRAINT "pontos_pessoa_id_fkey" FOREIGN KEY ("pessoa_id") REFERENCES "pessoas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "pessoas_id_jornadas_trabalho_id_key" ON "pessoas"("id", "jornadas_trabalho_id");
