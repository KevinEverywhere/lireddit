import 'reflect-metadata';
import { MikroORM } from '@mikro-orm/core';
import { __prod__ } from './constants';
// import { Post } from './entities/Post'; 
import microConfig from './mikro-orm.config'
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello';
import { PostResolver } from './resolvers/post';

const main = async () => {
  console.log('MAIN was changed');
  const orm = await MikroORM.init(microConfig);
  // const myTest = Math.round(Math.random() * 100000);
  // const post = orm.em.create(Post, { title: `Title number ${myTest}` });
  console.log(`--getMigratorBEFORE`)
  await orm.getMigrator().up();
  console.log('--getMigrator', __dirname)
  // await orm.em.persistAndFlush(post);
  // console.log('--persistAndFluh', __dirname)
  // const posts = await orm.em.find(Post, {});
  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver],
      validate: false
    }),
    context: () => ({ em: orm.em })
  });

  apolloServer.applyMiddleware({ app })

  app.listen(4000, () => {
    console.log('inside-END of posts');
  });
}

main().catch((err) => {
  console.log(err);
});
