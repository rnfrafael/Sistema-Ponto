/*
  Warnings:

  - You are about to drop the column `jornadas_trabalho_id` on the `pessoas` table. All the data in the column will be lost.
  - You are about to drop the column `jornadas_trabalho_id` on the `diasDaJornada` table. All the data in the column will be lost.
  - Added the required column `jornada_trabalho_id` to the `diasDaJornada` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_pessoas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "jornada_trabalho_id" INTEGER,
    CONSTRAINT "pessoas_jornada_trabalho_id_fkey" FOREIGN KEY ("jornada_trabalho_id") REFERENCES "jornadas_trabalho" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_pessoas" ("cpf", "id", "nome") SELECT "cpf", "id", "nome" FROM "pessoas";
DROP TABLE "pessoas";
ALTER TABLE "new_pessoas" RENAME TO "pessoas";
CREATE UNIQUE INDEX "pessoas_id_jornada_trabalho_id_key" ON "pessoas"("id", "jornada_trabalho_id");
CREATE TABLE "new_diasDaJornada" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hora" DATETIME NOT NULL,
    "dia_da_semana" INTEGER NOT NULL,
    "jornada_trabalho_id" INTEGER NOT NULL,
    CONSTRAINT "diasDaJornada_jornada_trabalho_id_fkey" FOREIGN KEY ("jornada_trabalho_id") REFERENCES "jornadas_trabalho" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_diasDaJornada" ("dia_da_semana", "hora", "id") SELECT "dia_da_semana", "hora", "id" FROM "diasDaJornada";
DROP TABLE "diasDaJornada";
ALTER TABLE "new_diasDaJornada" RENAME TO "diasDaJornada";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
