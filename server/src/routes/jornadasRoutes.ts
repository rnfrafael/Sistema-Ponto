import { FastifyInstance } from "fastify/types/instance";
import { number, symbol, z } from "zod";
import { JornadasController } from "../controllers";
import {
  IGetJornada,
  IJornadaCadastro,
} from "../interfaces/jornadaCadastroInterfaceAPI";

export async function jornadasRoutes(app: FastifyInstance) {
  app.get("/jornadas", async (req, res) => {
    const result = await JornadasController.pegaTodasAsJornadas();
    return result;
  });

  app.get("/jornadas/:id", async (req, res) => {
    const idParam = z.object({
      id: z.coerce.number(),
    });
    const { id }: IGetJornada = idParam.parse(req.params);
    const result = await JornadasController.pegaJornada(id);
    return result;
  });

  app.post("/jornadas/cadastra", async (req, res) => {
    const diasDaJornada = z.object({
      hora: z.coerce.date(),
      dia_da_semana: z.number(),
    });
    const jornadaToParse = z.object({
      nome: z.string(),
      diasDaJornada: z.array(diasDaJornada),
    });

    const jornadaParaCadastro: IJornadaCadastro = jornadaToParse.parse(
      req.body
    );

    const result = await JornadasController.cadastraJornada(
      jornadaParaCadastro
    );
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
