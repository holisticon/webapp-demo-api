import fastify from 'fastify'
import { products } from './products';

const server = fastify();

server.get('/products', async (request, reply) => {
  reply.send({
    totalResults: products.length,
    products
  });
})

server.listen(8080, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})