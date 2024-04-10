import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../lib/prisma";
import { FastifyInstance } from "fastify";

export async function getPolygons(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get('/polygons', {}, async (request, reply) => {
        try {
            const polygons = await prisma.polygon.findMany({
                select: {
                    id: true,
                    namePolygon: true,
                    coordinates: true,
                    userId: true,
                    createdAt: true,
                }
            })
           
            return { polygons };
        } catch (error) {
            console.error("Erro ao buscar polígonos:", error);
            reply.code(500).send({ message: 'Erro ao buscar polígonos' });
        }
    });
}
