import fastify from "fastify";
import cors from "@fastify/cors";
import { jornadasRoutes, pessoasRoutes } from "./routes";

const port = Number(process.env.PORT) || 3009;

const app = fastify();
app.register(cors);
app.register(pessoasRoutes, jornadasRoutes);

app.listen({ port }).then(() => {
  console.log(`Servidor aberto em http://localhost:${port}`);
});
