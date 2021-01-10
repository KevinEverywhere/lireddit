import { MikroORM } from '@mikro-orm/core';
import { __prod__ } from './constants';
import { Post } from './entities/Post';
import microConfig from './mikro-orm.config'

const main = async () => {
  console.log('MAIN was changed');
  const orm = await MikroORM.init(microConfig);
  const myTest = Math.round(Math.random() * 100000);
  const post = orm.em.create(Post, { title: `Title number ${myTest}` });
  // console.log(`--getMigratorBEFORE=${__prod__}`)
  // await orm.getMigrator().up();
  // console.log('--getMigrator', __dirname)
  await orm.em.persistAndFlush(post);
  // console.log('--persistAndFluh', __dirname)
  const posts = await orm.em.find(Post, {});
  console.log(posts);
  console.log('More ENDed of posts')

  // await orm.em.nativeInsert(post);
}

main();
