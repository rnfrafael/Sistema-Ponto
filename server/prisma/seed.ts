import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.pessoa.deleteMany();
  await prisma.jornadasTrabalho.deleteMany();
  await prisma.pontos.deleteMany();
  await prisma.diasDaJornada.deleteMany();

  const hora1 = new Date("2023-01-31T07:30:00.000Z");
  const hora2 = new Date("2023-01-31T12:00:00.000Z");
  const hora3 = new Date("2023-01-31T13:00:00.000Z");
  const hora4 = new Date("2023-01-31T17:18:00.000Z");

  await Promise.all([
    prisma.pessoa.create({
      data: {
        nome: "Rafael Fontenele",
        cpf: "032-032-320-32",
      },
    }),
    prisma.pessoa.create({
      data: {
        nome: "Yara Alves",
        cpf: "01801801888",
      },
    }),
    prisma.pessoa.create({
      data: {
        nome: "Gabriel Alves",
        cpf: "111.222.333-44",
      },
    }),
  ]);

  await Promise.all([
    prisma.jornadasTrabalho.create({
      data: {
        nome: "Hua",
        diasDaJornada: {
          create: [
            { hora: new Date("2023-01-31T08:00:00.000Z"), dia_da_semana: 1 },
            { hora: new Date("2023-01-31T12:00:00.000Z"), dia_da_semana: 1 },
            { hora: new Date("2023-01-31T14:00:00.000Z"), dia_da_semana: 1 },
            { hora: new Date("2023-01-31T18:00:00.000Z"), dia_da_semana: 1 },
          ],
        },
      },
    }),
    prisma.jornadasTrabalho.create({
      data: {
        nome: "Jornada branjo - basic",
        diasDaJornada: {
          create: [
            { hora: hora1, dia_da_semana: 1 },
            { hora: hora2, dia_da_semana: 1 },
            { hora: hora3, dia_da_semana: 1 },
            { hora: hora4, dia_da_semana: 1 },
            { hora: hora1, dia_da_semana: 2 },
            { hora: hora2, dia_da_semana: 2 },
            { hora: hora3, dia_da_semana: 2 },
            { hora: hora4, dia_da_semana: 2 },
            { hora: hora1, dia_da_semana: 3 },
            { hora: hora2, dia_da_semana: 3 },
            { hora: hora3, dia_da_semana: 3 },
            { hora: hora4, dia_da_semana: 3 },
            { hora: hora1, dia_da_semana: 4 },
            { hora: hora3, dia_da_semana: 4 },
            { hora: hora2, dia_da_semana: 4 },
            { hora: hora4, dia_da_semana: 4 },
            { hora: hora1, dia_da_semana: 5 },
            { hora: hora2, dia_da_semana: 5 },
            { hora: hora3, dia_da_semana: 5 },
            { hora: hora4, dia_da_semana: 5 },
          ],
        },
      },
    }),
  ]);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
