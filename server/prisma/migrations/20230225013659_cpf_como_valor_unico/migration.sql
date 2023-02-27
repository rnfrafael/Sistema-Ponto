/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `pessoas` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "pessoas_cpf_key" ON "pessoas"("cpf");
