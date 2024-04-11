// server.ts

import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'
import { fastifyJwt } from '@fastify/jwt'
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'
import { createPolygon } from './routes/create-polygon';
import { getPolygons } from './routes/get-polygon';
import { createUser } from './routes/create-user';
import { authentication } from './routes/authentication';
import { getUser } from './routes/get-user';
import { getPolygonUser } from './routes/get-polygon-user';
import { deletePolygonById } from './routes/delete-polygon-id';
import { editPolygonById } from './routes/edit-polygon-id';
import { getPolygonId } from './routes/get-polygon-id';

const app = fastify()

app.register(fastifyCors, {
    origin: '*'
})
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyJwt, {
    secret: 'testeapp456989'
});

// Registro das rotas
app.register(createPolygon)
app.register(getPolygons)
app.register(createUser)
app.register(getUser)
app.register(getPolygonUser)
app.register(deletePolygonById)
app.register(editPolygonById)
app.register(getPolygonId)

// Registro da rota de autenticação
app.register(authentication)

app.listen({
    port: 3333
}).then(() => {
    console.log('HTTP server running!')
})
