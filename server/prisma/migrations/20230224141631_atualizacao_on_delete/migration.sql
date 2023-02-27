-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_diasDaJornada" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hora" DATETIME NOT NULL,
    "dia_da_semana" INTEGER NOT NULL,
    "jornada_trabalho_id" INTEGER NOT NULL,
    CONSTRAINT "diasDaJornada_jornada_trabalho_id_fkey" FOREIGN KEY ("jornada_trabalho_id") REFERENCES "jornadas_trabalho" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_diasDaJornada" ("dia_da_semana", "hora", "id", "jornada_trabalho_id") SELECT "dia_da_semana", "hora", "id", "jornada_trabalho_id" FROM "diasDaJornada";
DROP TABLE "diasDaJornada";
ALTER TABLE "new_diasDaJornada" RENAME TO "diasDaJornada";
CREATE TABLE "new_pontos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ponto" DATETIME NOT NULL,
    "pessoa_id" INTEGER NOT NULL,
    CONSTRAINT "pontos_pessoa_id_fkey" FOREIGN KEY ("pessoa_id") REFERENCES "pessoas" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_pontos" ("id", "pessoa_id", "ponto") SELECT "id", "pessoa_id", "ponto" FROM "pontos";
DROP TABLE "pontos";
ALTER TABLE "new_pontos" RENAME TO "pontos";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
