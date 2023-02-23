import { FastifyInstance } from "fastify/types/instance";
import { number, symbol, z } from "zod";
import { JornadasController } from "../controllers";
import { JornadaCadastroAPI } from "../interfaces/jornadaCadastroInterface";

export async function jornadasRoutes(app: FastifyInstance) {
  app.get("/jornadas", async (req, res) => {
    const result = await JornadasController.pegaTodasAsJornadas();
    return result;
  });

  app.get("/jornadas/:id", async (req, res) => {
    const idParam = z.object({
      id: z.coerce.number(),
    });
    const { id } = idParam.parse(req.params);
    const result = await JornadasController.pegaJornada(id);
    return result;
  });

  app.post("/jornadas/cadastra", async (req, res) => {
    console.log(req.body);
    const diasDaJornadaParse = z.object({
      hora: z.coerce.date(),
      dia_da_semana: z.number(),
    });
    const bodyToParse = z.object({
      nome: z.string(),
      diasDaJornada: z.array(diasDaJornadaParse),
    });
    const body: JornadaCadastroAPI = bodyToParse.parse(req.body);

    const result = await JornadasController.cadastraJornada(body);
    return result;
  });

  app.delete("/jornadas/:id/deleta", async (req, res) => {
    const idParam = z.object({
      id: z.coerce.number(),
    });
    const { id } = idParam.parse(req.params);
    const result = await JornadasController.deletaJornada(id);
    return result;
  });
}
