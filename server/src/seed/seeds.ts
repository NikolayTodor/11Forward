import { User } from './../data/entities/user.entity';
import { createConnection, Repository } from 'typeorm';
import { Post } from './../data/entities/post.entity';
import { Comment } from './../data/entities/comment.entity';
import * as bcrypt from 'bcrypt';

const seedUsers = async (connection: any) => {
  const usersRepo: Repository<User> = connection.manager.getRepository(User);

  const users: User[] = await usersRepo.find();
  if (users.length) {
    console.log('The database already has users!');
    return;
  }

  const newUser: User = usersRepo.create({
    username: 'Peshko',
    email: 'mnogo@bachka.com',
    password: await bcrypt.hash('test1234', 10),
    followers: Promise.resolve([]),
    following: Promise.resolve([])
  });
  await usersRepo.save(newUser);

  const defUser: User = usersRepo.create({
    username: 'Niki',
    email: 'niki@abv.bg',
    password: await bcrypt.hash('123456', 10),
    followers: Promise.resolve([]),
    following: Promise.resolve([])
  });
  await usersRepo.save(defUser);

  const defUserTwo: User = usersRepo.create({
    username: 'Alpha',
    email: 'alpha@abv.bg',
    password: await bcrypt.hash('123456', 10),
    followers: Promise.resolve([]),
    following: Promise.resolve([])
  });
  await usersRepo.save(defUserTwo);

  const defUserThree: User = usersRepo.create({
    username: 'Beta',
    email: 'beta@abv.bg',
    password: await bcrypt.hash('123456', 10),
    followers: Promise.resolve([]),
    following: Promise.resolve([])
  });
  await usersRepo.save(defUserThree);

  const mulder: User = usersRepo.create({
    username: 'Mulder',
    email: 'foxMulder@fbiXfiles.com',
    password: await bcrypt.hash('test1234', 10),
    followers: Promise.resolve([]),
    following: Promise.resolve([])
  });
  await usersRepo.save(mulder);

  const scully: User = usersRepo.create({
    username: 'Scully',
    email: 'danaScully@fbiXfiles.com',
    password: await bcrypt.hash('test1234', 10),
    followers: Promise.resolve([]),
    following: Promise.resolve([])
  });
  await usersRepo.save(scully);

  const zev: User = usersRepo.create({
    username: 'ZevBellringer',
    email: 'zev@lexx.com',
    password: await bcrypt.hash('test1234', 10),
    followers: Promise.resolve([]),
    following: Promise.resolve([])
  });
  await usersRepo.save(zev);

  const kai: User = usersRepo.create({
    username: 'KaiOfBrunnis',
    email: 'kai@lexx.com',
    password: await bcrypt.hash('test1234', 10),
    followers: Promise.resolve([]),
    following: Promise.resolve([])
  });
  await usersRepo.save(kai);

  const stan: User = usersRepo.create({
    username: 'StanleyTweedle',
    email: 'stanTheMan@lexx.com',
    password: await bcrypt.hash('test1234', 10),
    followers: Promise.resolve([]),
    following: Promise.resolve([])
  });
  await usersRepo.save(stan);

  const picard: User = usersRepo.create({
    username: 'JeanLucPicard',
    email: 'picard@federation.gov',
    password: await bcrypt.hash('test1234', 10),
    followers: Promise.resolve([]),
    following: Promise.resolve([])
  });
  await usersRepo.save(picard);

  const riker: User = usersRepo.create({
    username: 'WilliamRiker',
    email: 'numberOne@federation.gov',
    password: await bcrypt.hash('test1234', 10),
    followers: Promise.resolve([]),
    following: Promise.resolve([])
  });
  await usersRepo.save(riker);

  const crusher: User = usersRepo.create({
    username: 'DrBeverley',
    email: 'healerRed@federation.gov',
    password: await bcrypt.hash('test1234', 10),
    followers: Promise.resolve([]),
    following: Promise.resolve([])
  });
  await usersRepo.save(crusher);

  const deanna: User = usersRepo.create({
    username: 'DeannaTroi',
    email: 'BetazoidCounselor@federation.gov',
    password: await bcrypt.hash('test1234', 10),
    followers: Promise.resolve([]),
    following: Promise.resolve([])
  });
  await usersRepo.save(deanna);

  const jc: User = usersRepo.create({
    username: 'JohnCrighton',
    email: 'spaceExplorer@farscape.com',
    password: await bcrypt.hash('test1234', 10),
    followers: Promise.resolve([]),
    following: Promise.resolve([])
  });
  await usersRepo.save(jc);

  const aeryn: User = usersRepo.create({
    username: 'AerynSun',
    email: 'commando@peacekeepers.com',
    password: await bcrypt.hash('test1234', 10),
    followers: Promise.resolve([]),
    following: Promise.resolve([])
  });
  await usersRepo.save(aeryn);

  console.log(`Users seeded successfully!`);
};

const seedFollowers = async (connection: any) => {
  const usersRepo: Repository<User> = connection.manager.getRepository(User);

  const peshko: User = await usersRepo.findOne({where: {username: 'Peshko'}});
  const niki: User = await usersRepo.findOne({where: {username: 'Niki'}});
  const alpha: User = await usersRepo.findOne({where: {username: 'Alpha'}});
  const beta: User = await usersRepo.findOne({where: {username: 'Beta'}});
  const mulder: User = await usersRepo.findOne({where: {username: 'Mulder'}});
  const scully: User = await usersRepo.findOne({where: {username: 'Scully'}});
  const zev: User = await usersRepo.findOne({where: {username: 'ZevBellringer'}});
  const kai: User = await usersRepo.findOne({where: {username: 'KaiOfBrunnis'}});
  const stan: User = await usersRepo.findOne({where: {username: 'StanleyTweedle'}});
  const picard: User = await usersRepo.findOne({where: {username: 'JeanLucPicard'}});
  const riker: User = await usersRepo.findOne({where: {username: 'WilliamRiker'}});
  const crusher: User = await usersRepo.findOne({where: {username: 'DrBeverley'}});
  const troi: User = await usersRepo.findOne({where: {username: 'DeannaTroi'}});
  const john: User = await usersRepo.findOne({where: {username: 'JohnCrighton'}});
  const aeryn: User = await usersRepo.findOne({where: {username: 'AerynSun'}});

  peshko.following = Promise.resolve([niki, alpha, beta, mulder, scully, zev, kai, stan, picard, riker, crusher, troi, john, aeryn]);
  niki.followers = Promise.resolve([peshko, alpha, beta, mulder, scully, zev, kai, stan, picard, riker, crusher, troi, john, aeryn]);
  await usersRepo.save(peshko);
  await usersRepo.save(niki);
  await usersRepo.save(alpha);
  await usersRepo.save(beta);
  await usersRepo.save(mulder);
  await usersRepo.save(scully);
  await usersRepo.save(zev);
  await usersRepo.save(kai);
  await usersRepo.save(stan);
  await usersRepo.save(picard);
  await usersRepo.save(riker);
  await usersRepo.save(crusher);
  await usersRepo.save(troi);
  await usersRepo.save(john);
  await usersRepo.save(aeryn);

  console.log(`Users follow each other successfully!`);
};

const seedPosts = async (connection: any) => {
  const usersRepo: Repository<User> = connection.manager.getRepository(User);
  const postsRepo: Repository<Post> = connection.manager.getRepository(Post);

  const posts: Post[] = await postsRepo.find();
  if (posts.length) {
    console.log('The database already has posts!');
    return;
  }

  const peshko: User = await usersRepo.findOne({where: {username: 'Peshko'}});
  const peshkoPost1: Post = postsRepo.create({
    title: 'Welcome',
    content: 'Welcome back to the Jungle! Jumanji: The Next Level is available in your neighborhood cinema!',
    isPrivate: false,
    hasPermission: true,
    imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjOgTev7B17h20YCdwveHdaSOR8DuKo9y2Sh__JM4Wc0k6d4BU&s',
    author: peshko
  });
  await postsRepo.save(peshkoPost1);

  const peshkoPost2: Post = postsRepo.create({
    title: 'A square',
    content: 'This amazing square is the pride of the squares!',
    isPrivate: false,
    hasPermission: true,
    imageURL: 'https://icon-library.net/images/square-icon-png/square-icon-png-20.jpg',
    author: peshko
  });
  await postsRepo.save(peshkoPost2);

  const mulder: User = await usersRepo.findOne({where: {username: 'Mulder'}});
  const mulderPost1: Post = postsRepo.create({
    title: 'Best Friends Forever!',
    content: 'We are back! And we are old, but gold!',
    isPrivate: false,
    hasPermission: true,
    imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStkp8ih9NjSR_MVGQ2NgeBojf2neQL9_tPTFvOYN72QKbHYJvj3g&s',
    author: mulder
  });
  await postsRepo.save(mulderPost1);

  const zev: User = await usersRepo.findOne({where: {username: 'ZevBellringer'}});
  const zevPost1: Post = postsRepo.create({
    title: 'Best Crew Forever!',
    content: 'Friendship is the most powerful weapon in the two universes!',
    isPrivate: false,
    hasPermission: true,
    imageURL: 'https://p1.hiclipart.com/preview/796/511/792/lexx-series-and-season-folder-icons-lexx-png-icon.jpg',
    author: zev
  });
  await postsRepo.save(zevPost1);

  const kai: User = await usersRepo.findOne({where: {username: 'KaiOfBrunnis'}});
  const kaiPost1: Post = postsRepo.create({
    title: 'The dead do not smile.',
    content: 'In the Light Universe I have been darkness. Perhaps in the Dark Zone... I will be light!',
    isPrivate: true,
    hasPermission: false,
    imageURL: 'https://p1.hiclipart.com/preview/796/511/792/lexx-series-and-season-folder-icons-lexx-png-icon.jpg',
    author: kai
  });
  await postsRepo.save(kaiPost1);

  const stan: User = await usersRepo.findOne({where: {username: 'StanleyTweedle'}});
  const stanPost1: Post = postsRepo.create({
    title: 'Cute guy in red shirt!',
    content: 'The good-looking captain and his brave crew! #StanTheMan #LexxCaptain #TheBestOfTheBest',
    isPrivate: false,
    hasPermission: true,
    imageURL: 'https://p1.hiclipart.com/preview/796/511/792/lexx-series-and-season-folder-icons-lexx-png-icon.jpg',
    author: stan
  });
  await postsRepo.save(stanPost1);

  const john: User = await usersRepo.findOne({where: {username: 'JohnCrighton'}});
  const johnPost1: Post = postsRepo.create({
    title: 'My name is John Crighton, an astronaut!',
    content: 'A radiation wave hit and I got shot through a wormhole... Now Im lost in some distant part of the universe on a ship -- a living ship -- full of strange, alien life forms',
    isPrivate: false,
    hasPermission: true,
    imageURL: 'https://is4-ssl.mzstatic.com/image/thumb/Video114/v4/ae/6d/43/ae6d437a-a884-c948-e956-502bd690f4fa/mzl.gcnoganh.lsr/268x0w.jpg',
    author: john
  });
  await postsRepo.save(johnPost1);
  const johnPost2: Post = postsRepo.create({
    title: 'My name is John Crighton, an astronaut!',
    content: 'A radiation wave hit and I got shot through a wormhole... Now Im lost in some distant part of the universe on a ship -- a living ship -- full of strange, alien life forms',
    isPrivate: true,
    hasPermission: false,
    imageURL: 'https://is4-ssl.mzstatic.com/image/thumb/Video114/v4/ae/6d/43/ae6d437a-a884-c948-e956-502bd690f4fa/mzl.gcnoganh.lsr/268x0w.jpg',
    author: john
  });
  await postsRepo.save(johnPost2);
  const johnPost3: Post = postsRepo.create({
    title: 'My name is John Crighton, an astronaut!',
    content: 'A radiation wave hit and I got shot through a wormhole... Now Im lost in some distant part of the universe on a ship -- a living ship -- full of strange, alien life forms',
    isPrivate: true,
    hasPermission: false,
    imageURL: 'https://is4-ssl.mzstatic.com/image/thumb/Video114/v4/ae/6d/43/ae6d437a-a884-c948-e956-502bd690f4fa/mzl.gcnoganh.lsr/268x0w.jpg',
    author: john
  });
  await postsRepo.save(johnPost3);
  const johnPost4: Post = postsRepo.create({
    title: 'My name is John Crighton, an astronaut!',
    content: 'A radiation wave hit and I got shot through a wormhole... Now Im lost in some distant part of the universe on a ship -- a living ship -- full of strange, alien life forms',
    isPrivate: true,
    hasPermission: false,
    imageURL: 'https://is4-ssl.mzstatic.com/image/thumb/Video114/v4/ae/6d/43/ae6d437a-a884-c948-e956-502bd690f4fa/mzl.gcnoganh.lsr/268x0w.jpg',
    author: john
  });
  await postsRepo.save(johnPost4);
  const johnPost6: Post = postsRepo.create({
    title: 'My name is John Crighton, an astronaut!',
    content: 'A radiation wave hit and I got shot through a wormhole... Now Im lost in some distant part of the universe on a ship -- a living ship -- full of strange, alien life forms',
    isPrivate: true,
    hasPermission: false,
    imageURL: 'https://i.frg.im/TSNJZj3T/fsts116_600.jpg?v=1545899641.587',
    author: john
  });
  await postsRepo.save(johnPost6);
  const johnPost7: Post = postsRepo.create({
    title: 'My name is John Crighton, an astronaut!',
    content: 'A radiation wave hit and I got shot through a wormhole... Now Im lost in some distant part of the universe on a ship -- a living ship -- full of strange, alien life forms',
    isPrivate: true,
    hasPermission: false,
    imageURL: 'https://i.frg.im/TSNJZj3T/fsts116_600.jpg?v=1545899641.587',
    author: john
  });
  await postsRepo.save(johnPost7);

  console.log(`Posts seeded successfully!`);
};

const seedComments = async (connection: any) => {
  const commentsRepo: Repository<Comment> = connection.manager.getRepository(Comment);

  const comments: Comment[] = await commentsRepo.find();
  if (comments.length) {
    console.log('The database already has comments!');
    return;
  }

  const usersRepo: Repository<User> = connection.manager.getRepository(User);
  const postsRepo: Repository<Post> = connection.manager.getRepository(Post);

  const toPost = await postsRepo.findOne({where: {title: 'Best Friends Forever!'}});
  const mulder: User = await usersRepo.findOne({where: {username: 'Mulder'}});
  const scully: User = await usersRepo.findOne({where: {username: 'Scully'}});

  const newComment: Comment = commentsRepo.create({
    content: 'Just friends?',
    author: scully
  });
  newComment.post = Promise.resolve(toPost);
  await commentsRepo.save(newComment);
  const newComment1: Comment = commentsRepo.create({
    content: 'Well, arent we friends?',
    author: mulder
  });
  newComment1.post = Promise.resolve(toPost);
  await commentsRepo.save(newComment1);
  const newComment2: Comment = commentsRepo.create({
    content: 'For Gods sake, Mulder, we even have a child together!',
    author: scully
  });
  newComment2.post = Promise.resolve(toPost);
  await commentsRepo.save(newComment2);
  const newComment3: Comment = commentsRepo.create({
    content: 'But thats a secret, we dont announce it on social networks',
    author: mulder
  });
  newComment3.post = Promise.resolve(toPost);
  await commentsRepo.save(newComment3);
  const newComment4: Comment = commentsRepo.create({
    content: 'Its not a secret anymore',
    author: scully
  });
  newComment4.post = Promise.resolve(toPost);
  await commentsRepo.save(newComment4);
  const newComment5: Comment = commentsRepo.create({
    content: 'Ok then, best lovers forever it is!',
    author: mulder
  });
  newComment5.post = Promise.resolve(toPost);
  await commentsRepo.save(newComment5);
  toPost.commentsCount = 6;
  await postsRepo.save(toPost);

  console.log(`Comments seeded successfully!`);
};

const seed = async () => {
  console.log('Seed started!');
  const connection = await createConnection();

  await seedUsers(connection);
  await seedFollowers(connection);
  await seedPosts(connection);
  await seedComments(connection);

  await connection.close();
  console.log('Seed completed!');
};

seed().catch(console.error);
