import { FastifyInstance } from "fastify/types/instance";
import { symbol, z } from "zod";
import { PersonController } from "../controllers";

export async function pessoasRoutes(app: FastifyInstance) {
  app.get("/", async (req, res) => {
    const result = await PersonController.pegaTodasAsPessoas();
    return result;
  });
}
