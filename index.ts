import { fastify } from 'fastify'
import { products } from './products';

const server = fastify();

server.get('/', async (request, reply) => {
  reply.send();
})

server.get('/products', async (request, reply) => {
  reply.send({
    totalResults: products.length,
    products
  });
})

server.listen(process.env.PORT || 8080, '0.0.0.0', (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})