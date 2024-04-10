import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export async function deletePolygonById(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().delete('/polygon/:polygonId', {
        schema: {
            params: z.object({
                polygonId: z.string().uuid(), 
            }),
        },
    }, async (request, reply) => {
        const polygonId = request.params.polygonId;

        try {
            const existingPolygon = await prisma.polygon.findUnique({
                where: {
                    id: polygonId,
                },
            });

            if (!existingPolygon) {
                reply.code(404).send({ message: 'Polígono não encontrado' });
                return;
            }

            await prisma.polygon.delete({
                where: {
                    id: polygonId,
                },
            });

            reply.code(200).send({ message: 'Polígono deletado com sucesso' });
        } catch (error) {
            console.error("Erro ao deletar polígono:", error);
            reply.code(500).send({ message: 'Erro ao deletar polígono' });
        }
    });
}
