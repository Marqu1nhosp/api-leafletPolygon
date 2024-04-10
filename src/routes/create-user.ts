import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { FastifyInstance } from "fastify";

export async function createUser(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post('/user', {
        // Definindo o esquema de validação para os dados do corpo da solicitação
        schema: {
            body: z.object({
                name: z.string().nonempty('O nome é obrigatório')
                    .transform(name => {
                        return name.trim().split(' ').map(word => {
                            return word[0].toLocaleUpperCase().concat(word.substring(1))
                        }).join(' ')
                    }),
                username: z.string().min(3),
                password: z.string().min(6, 'A senha precisa de no mínimo 6 caracteres'),
            })
        }
    }, async (request, reply) => {
        try {
        
            const { name, username, password } = request.body;

            const newUser = await prisma.user.create({
                data: {
                    name,
                    username,
                    password,
                }
            });

            return { user: newUser };
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
            reply.code(500).send({ message: 'Erro ao criar usuário' });
        }
    });
}
