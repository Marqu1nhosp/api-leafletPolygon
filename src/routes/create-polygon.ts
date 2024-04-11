import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from "zod"
import { prisma } from "../lib/prisma"
import { FastifyInstance } from "fastify"


export async function createPolygon(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post('/polygon', {
        schema: {
            body: z.object({
                namePolygon: z.string(),
                coordinates: z.string(),
                userId: z.string(),
                status: z.string(),
            }),
            response: {
                201: z.object({
                    polygonId: z.string().uuid()
                })
            }
        }
    }, async (request, reply) => {

        const { namePolygon, coordinates, userId, status } = request.body

        const polygon = await prisma.polygon.create({
            data: {
                namePolygon,
                coordinates,
                userId,
                status
            }
        })

        return { polygonId: polygon.id }
    })
}
