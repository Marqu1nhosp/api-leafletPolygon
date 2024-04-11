import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export async function editPolygonById(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().patch('/polygon/:polygonId', {
        schema: {
            params: z.object({
                polygonId: z.string().uuid(),
            }),
            body: z.object({
                namePolygon: z.string(),
                coordinates: z.string(),
                userId: z.string(),
                status: z.string(),
            }),
        },
    }, async (request, reply) => {
        const polygonId = request.params.polygonId;
        const { namePolygon, coordinates, userId, status } = request.body;

        try {
            const existingPolygon = await prisma.polygon.findUnique({
                where: { id: polygonId },
            });

            if (!existingPolygon) {
                reply.code(404).send({ message: 'Polígono não encontrado' });
                return;
            }

            const updatedPolygon = await prisma.polygon.update({
                where: { id: polygonId },
                data: {
                    namePolygon,
                    coordinates,
                    userId,
                    status,
                },
            });

            reply.code(200).send(updatedPolygon);
        } catch (error) {
            console.error("Erro ao editar polígono:", error);
            reply.code(500).send({ message: 'Erro ao editar polígono' });
        }
    });
}
