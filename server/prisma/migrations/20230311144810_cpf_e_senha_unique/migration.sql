/*
  Warnings:

  - A unique constraint covering the columns `[cpf,senha]` on the table `pessoas` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "pessoas_nome_cpf_key";

-- CreateIndex
CREATE UNIQUE INDEX "pessoas_cpf_senha_key" ON "pessoas"("cpf", "senha");
