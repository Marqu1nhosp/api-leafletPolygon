import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { FastifyInstance } from "fastify";

export async function getPolygonId(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get('/polygon-id/:polygonId', {
        schema: {
            params: z.object({
                polygonId: z.string().uuid(), 
            }),
        },
    }, async (request, reply) => {
        const polygonId = request.params.polygonId;

        try {
            const polygon = await prisma.polygon.findUnique({
                where: {
                  id: polygonId
                },
                select: {
                    id: true,
                    namePolygon: true,
                    coordinates: true,
                    createdAt: true,
                    userId: true,   
                    status: true,
                },
            });

            return { polygon } 
        } catch (error) {
            console.error("Erro ao buscar o polígono:", error);
            reply.code(500).send({ message: 'Erro ao buscar polígono' });
        }
    });
}
