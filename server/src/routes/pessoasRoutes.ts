import { FastifyInstance } from "fastify/types/instance";
import { symbol, z } from "zod";
import { PessoaController } from "../controllers";
import {
  IJornadaDaPessoa,
  IPessoaCadastroAPI,
} from "../interfaces/pessoaInterfaceAPI";

export async function pessoasRoutes(app: FastifyInstance) {
  app.get("/pessoas", async (req, res) => {
    const result = await PessoaController.pegaTodasAsPessoas();
    return result;
  });

  app.get("/pessoas/:id", async (req, res) => {
    try {
      const idParam = z.object({
        id: z.coerce.number(),
      });
      const { id } = idParam.parse(req.params);
      const result = await PessoaController.pegaPessoaPorId(id);
      return result;
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send("Não foi possível realizar consulta")
        .send(error);
    }
  });

  app.post("/pessoas/cadastra", async (req, res) => {
    const bodyToParse = z.object({
      nome: z.string(),
      cpf: z.string(),
      jornada_trabalho_id: z.coerce.number().optional(),
    });
    const pessoa: IPessoaCadastroAPI = bodyToParse.parse(req.body);

    const result = await PessoaController.cadastraPessoa(pessoa);
    return result;
  });

  app.post("/pessoas/:id/registrarPonto", async (req, res) => {
    const dadosToParse = z.object({
      id: z.coerce.number(),
    });
    const horaUTC = new Date();
    const hora = new Date(
      horaUTC.getFullYear(),
      horaUTC.getMonth(),
      horaUTC.getDate(),
      horaUTC.getHours() - 3,
      horaUTC.getMinutes(),
      horaUTC.getSeconds(),
      horaUTC.getMilliseconds()
    );
    const { id } = dadosToParse.parse(req.params);

    const result = await PessoaController.registraPonto({ id, hora });
    return result;
  });

  app.patch("/pessoas/jornada", async (req, res) => {
    const bodyToParse = z.object({
      pessoa: z.coerce.number(),
      jornadaTrabalho: z.coerce.number(),
    });
    const jornadaDaPessoa: IJornadaDaPessoa = bodyToParse.parse(req.query);

    const result = await PessoaController.cadastraJornadaDaPessoa(
      jornadaDaPessoa
    );
    return result;
  });

  app.delete("/pessoa/:id/deleta", async (req, res) => {
    const idParam = z.object({
      id: z.coerce.number(),
    });
    const { id } = idParam.parse(req.params);
    const result = await PessoaController.deletaPessoa(id);
    return result;
  });
}
