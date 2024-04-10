import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../lib/prisma";
import { FastifyInstance } from "fastify";

export async function getUser(app: FastifyInstance) {
    // Definindo a rota GET para obter todos os usuários
    app.withTypeProvider<ZodTypeProvider>().get('/users', {}, async (request, reply) => {
        try {

            const users = await prisma.user.findMany({

                select: {
                    id: true,
                    name: true,
                    username: true,
                }
            });

            return { users };
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
            reply.code(500).send({ message: 'Erro ao buscar usuários' });
        }
    });
}
