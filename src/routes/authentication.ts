import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { prisma } from '../lib/prisma';
import { z } from 'zod';
import crypto from 'crypto'

export async function authentication(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post('/auth', {
        schema: {
            body: z.object({
                username: z.string().min(3),
                password: z.string().min(6, 'A senha precisa de no mínimo 6 caracteres'),
            })
        }
    }, async (request, reply) => {
        const { username, password } = request.body;

        // Encontre o usuário no banco de dados pelo nome de usuário
        const user = await prisma.user.findUnique({
            where: {
                username
            }
        });

        const hashedPassword = crypto.createHash('md5').update(password).digest('hex');

        if (!user || user.password !== hashedPassword) {
            // Se o usuário não for encontrado ou as senhas não coincidirem, retorne uma mensagem de erro
            reply.code(401).send({ message: 'Credenciais inválidas' });
            return;
        }

        // Se as credenciais estiverem corretas, crie um token JWT
        const token = app.jwt.sign({ username, userId: user.id}, { expiresIn: '1h', key: 'testeapp456989' });

        // Retorne o token JWT como resposta
        return { token, user: { id: user.id, username: user.username } };
    });
}
