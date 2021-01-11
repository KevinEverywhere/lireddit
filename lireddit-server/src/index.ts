import { MikroORM } from '@mikro-orm/core';
import { __prod__ } from './constants';
import { Post } from './entities/Post';
import microConfig from './mikro-orm.config'

const main = async () => {
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();
  // const post = orm.em.create(Post, { title: `Title number    ${Math.round(Math.random() * 100000)}` });
  // console.log(`--getMigratorBEFORE=${__prod__}`)
  // console.log('--getMigrator', __dirname)
  // await orm.em.persistAndFlush(post);
  console.log('--persistAndFluh', __dirname)
  const posts = await orm.em.find(Post, {});
  console.log(posts);
  console.log('MorENDed of posts')

  // await orm.em.nativeInsert(post);

}

main().catch((err) => {
  console.log(err);
});
