import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.clockPoints.deleteMany();
  await prisma.person.deleteMany();
  await prisma.workdays.deleteMany();
  await prisma.workdaySchedules.deleteMany();

  const hourOne = new Date("2023-01-31T07:30:00.000Z");
  const hourTwo = new Date("2023-01-31T13:00:00.000Z");
  const hourThree = new Date("2023-01-31T13:00:00.000Z");
  const hourFour = new Date("2023-01-31T17:18:00.000Z");

  await Promise.all([
    prisma.person.create({
      data: {
        name: "Rafael Fontenele",
        cpf: "03252379309",
      },
    }),
    prisma.person.create({
      data: {
        name: "Yara Alves",
        cpf: "01816923338",
      },
    }),
    prisma.person.create({
      data: {
        name: "Gabriel Alves",
        cpf: "111.222.333-44",
      },
    }),
  ]);

  await Promise.all([
    prisma.workdaySchedules.create({
      data: {
        name: "Jornada branjo - basic",
        Workdays: {
          create: [
            { hour: hourOne, week_day: 1 },
            { hour: hourOne, week_day: 2 },
            { hour: hourOne, week_day: 3 },
            { hour: hourOne, week_day: 4 },
            { hour: hourOne, week_day: 5 },
            { hour: hourTwo, week_day: 1 },
            { hour: hourTwo, week_day: 2 },
            { hour: hourTwo, week_day: 3 },
            { hour: hourTwo, week_day: 4 },
            { hour: hourTwo, week_day: 5 },
            { hour: hourThree, week_day: 1 },
            { hour: hourThree, week_day: 2 },
            { hour: hourThree, week_day: 3 },
            { hour: hourThree, week_day: 4 },
            { hour: hourThree, week_day: 5 },
            { hour: hourFour, week_day: 1 },
            { hour: hourFour, week_day: 2 },
            { hour: hourFour, week_day: 3 },
            { hour: hourFour, week_day: 4 },
            { hour: hourFour, week_day: 5 },
          ],
        },
      },
    }),
  ]);

  /*
  await Promise.all([
    prisma.person.create({
      data: {
        name: "Rafael Fontenele",
        workdaySchedules: {
          create: {
            name: "Workday Schedule - branjo",
            Workdays: {
              create: [
                { hour: hourOne, week_day: 1 },
                { hour: hourOne, week_day: 2 },
                { hour: hourOne, week_day: 3 },
                { hour: hourOne, week_day: 4 },
                { hour: hourOne, week_day: 5 },
                { hour: hourTwo, week_day: 1 },
                { hour: hourTwo, week_day: 2 },
                { hour: hourTwo, week_day: 3 },
                { hour: hourTwo, week_day: 4 },
                { hour: hourTwo, week_day: 5 },
                { hour: hourThree, week_day: 1 },
                { hour: hourThree, week_day: 2 },
                { hour: hourThree, week_day: 3 },
                { hour: hourThree, week_day: 4 },
                { hour: hourThree, week_day: 5 },
                { hour: hourFour, week_day: 1 },
                { hour: hourFour, week_day: 2 },
                { hour: hourFour, week_day: 3 },
                { hour: hourFour, week_day: 4 },
                { hour: hourFour, week_day: 5 },
              ],
            },
          },
        },
      },
    }),
    prisma.person.create({
      data: {
        name: "Yara Alves",
      },
    }),
    prisma.person.create({
      data: {
        name: "Gabriel Alves",
      },
    }),
  ]);*/
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
