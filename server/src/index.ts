import fastify from "fastify";
import cors from "@fastify/cors";
import { jornadasRoutes, pessoasRoutes } from "./routes";

const port = Number(process.env.PORT) || 3009;
const host = "localhost";
// process.env.TZ = "America/Fortaleza";

const app = fastify();
app.register(cors, { origin: "*" });

app.register(pessoasRoutes, jornadasRoutes);

app.get("/", (req, res) => {
  return "Olá";
});

app.listen({ host, port }).then(() => {
  console.log(`Servidor aberto em http://localhost:${port}`);
});
