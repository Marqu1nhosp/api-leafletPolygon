# API LeafletPolygon

Esta é uma API construída com o framework Fastify para gerenciar polígonos em um mapa Leaflet.

## Descrição

O LeafletPolygon é uma API construída com o framework Fastify que permite o gerenciamento eficiente de polígonos em um mapa Leaflet. A API oferece funcionalidades completas para criar, ler, atualizar e excluir polígonos, além de fornecer endpoints para autenticação de usuários com JWT.

## Tecnologias Utilizadas

- **Fastify**: Framework web leve e eficiente para Node.js.
- **Fastify CORS**: Plugin para controle de acesso de recursos de origens diferentes.
- **Fastify JWT**: Plugin para autenticação JSON Web Token (JWT).
- **Prisma**: Ferramenta ORM para simplificar o acesso ao banco de dados.
- **Zod**: Biblioteca de validação de esquema para TypeScript e JavaScript.

## Rotas

A API oferece as seguintes rotas:

- `POST /authentication`:  Esta rota espera um corpo JSON contendo as credenciais do usuário (por exemplo, usuário e    senha) e retorna um token JWT válido se as credenciais forem válidas.
- `POST /create-polygon`: Cria um novo polígono.
- `GET /get-polygons`: Obtém todos os polígonos.
- `POST /create-user`: Cria um novo usuário.
- `GET /get-user`: Obtém informações do usuário.
- `GET /get-polygon-user`: Obtém polígonos de um usuário específico.
- `DELETE /delete-polygon/:id`: Exclui um polígono pelo ID.
- `PUT /edit-polygon/:id`: Edita um polígono pelo ID.
- `GET /get-polygon/:id`: Obtém um polígono pelo ID.

## Instalação

Siga estas etapas para configurar e executar o projeto localmente:

1. Clone este repositório:

   ```bash
   git clone https://github.com/seu-usuario/api-leafletpolygon.git

2. Instale as dependências:
   ```bash
   cd api-leafletpolygon
   npm install

3. Configure o banco de dados MySQL

    ```bash
    Crie um banco chamado api_leaflet ou da sua prefêrencia

3. Rode para as tabelas no banco

    ```bash
    npx prisma migrate dev

3. Rode o servidor

    ```bash
    npm run dev





