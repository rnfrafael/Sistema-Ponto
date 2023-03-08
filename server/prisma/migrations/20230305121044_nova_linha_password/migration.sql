/*
  Warnings:

  - Added the required column `senha` to the `pessoas` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_pessoas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "jornada_trabalho_id" INTEGER,
    CONSTRAINT "pessoas_jornada_trabalho_id_fkey" FOREIGN KEY ("jornada_trabalho_id") REFERENCES "jornadas_trabalho" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_pessoas" ("cpf", "id", "jornada_trabalho_id", "nome") SELECT "cpf", "id", "jornada_trabalho_id", "nome" FROM "pessoas";
DROP TABLE "pessoas";
ALTER TABLE "new_pessoas" RENAME TO "pessoas";
CREATE UNIQUE INDEX "pessoas_cpf_key" ON "pessoas"("cpf");
CREATE UNIQUE INDEX "pessoas_id_jornada_trabalho_id_key" ON "pessoas"("id", "jornada_trabalho_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
