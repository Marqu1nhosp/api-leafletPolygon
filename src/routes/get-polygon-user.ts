import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { FastifyInstance } from "fastify";

export async function getPolygonUser(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get('/polygon/:userId', {
        schema: {
            params: z.object({
                userId: z.string().uuid(), // Certifique-se de validar se o userId é um UUID válido
            }),
        },
    }, async (request, reply) => {
        const userId = request.params.userId;

        try {
            const polygons = await prisma.polygon.findMany({
                where: {
                    userId: userId,
                },
                select: {
                    id: true,
                    namePolygon: true,
                    coordinates: true,
                    createdAt: true,
                },
            });

            return { polygons };
        } catch (error) {
            console.error("Erro ao buscar polígonos:", error);
            reply.code(500).send({ message: 'Erro ao buscar polígonos' });
        }
    });
}
