import { FastifyInstance } from "fastify/types/instance";
import dayjs from "dayjs";
import { z } from "zod";
import { PessoaController } from "../controllers";
import {
  IBuscaPontos,
  IJornadaDaPessoa,
  IPessoaCadastroAPI,
} from "../interfaces/pessoaInterfaceAPI";
import { stringCodification } from "../utils";

export async function pessoasRoutes(app: FastifyInstance) {
  app.get("/pessoas", async (req, res) => {
    const result = await PessoaController.pegaTodasAsPessoas();
    return res.status(200).send(JSON.stringify(result, null, 2));
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

  app.post("/pessoas/logar", async (req, res) => {
    try {
      const loginBody = z.object({
        cpf: z.coerce.string(),
        senha: z.coerce.string(),
      });
      let { cpf, senha } = loginBody.parse(req.body);
      senha = stringCodification(senha);
      const result = await PessoaController.logaPessoa({ cpf, senha });
      return res.status(201).send(result);
    } catch (error) {
      return res.status(422).send({
        message: "Não foi possível realizar consulta",
        erro: error,
      });
    }
  });

  app.post("/pessoas/cadastra", async (req, res) => {
    const bodyToParse = z.object({
      nome: z.string(),
      cpf: z.string(),
      senha: z.string().min(8, "A senha não contém os caracteres minimos: 8"),
      jornada_trabalho_id: z.coerce.number().optional(),
    });
    const pessoa: IPessoaCadastroAPI = bodyToParse.parse(req.body);

    pessoa.senha = stringCodification(pessoa.senha);
    try {
      const result = await PessoaController.cadastraPessoa(pessoa);

      return res
        .status(201)
        .send({ message: "Usuario Cadastrado com sucesso" });
    } catch (error) {
      return res.status(409).send(error);
    }
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

  app.post("/pessoas/:id/registrar_ponto", async (req, res) => {
    const reqParams = z.object({
      id: z.coerce.number(),
    });
    const reqBody = z.object({
      data: z.coerce.date(),
    });

    const { id } = reqParams.parse(req.params);
    const { data } = reqBody.parse(req.body);

    const result = await PessoaController.registraPonto({ id, data });
    console.log("🚀 ~ file: pessoasRoutes.ts:91 ~ app.post ~ result:", result);

    return result;
  });

  app.get("/pessoas/:id/busca_pontos", async (req, res) => {
    const idParam = z.object({
      id: z.coerce.number(),
    });

    const dataBody = z.object({
      data: z.coerce.date(),
    });

    const { data } = dataBody.parse(req.query);

    const diaInicio = dayjs(data).startOf("day").toDate();
    const diaFinal = dayjs(data).endOf("day").toDate();

    const { id } = idParam.parse(req.params);
    const result: IBuscaPontos = await PessoaController.buscaPontos({
      id,
      diaInicio,
      diaFinal,
    });
    return result;
  });
}
