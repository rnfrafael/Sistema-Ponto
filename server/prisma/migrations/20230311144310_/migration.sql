/*
  Warnings:

  - A unique constraint covering the columns `[nome,cpf]` on the table `pessoas` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "pessoas_nome_cpf_key" ON "pessoas"("nome", "cpf");
