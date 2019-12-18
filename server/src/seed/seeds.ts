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

  const mulder: User = usersRepo.create({
    username: 'Mulder',
    email: 'foxMulder@fbiXfiles.com',
    password: await bcrypt.hash('test1234', 10),
    followers: Promise.resolve([]),
    following: Promise.resolve([]),
    avatarURL: 'https://i.imgur.com/X00bHg6.png'
  });
  users.push(mulder);

  const scully: User = usersRepo.create({
    username: 'Scully',
    email: 'danaScully@fbiXfiles.com',
    password: await bcrypt.hash('test1234', 10),
    followers: Promise.resolve([]),
    following: Promise.resolve([]),
    avatarURL: 'https://i.imgur.com/Xh5iMy9.png'
  });
  users.push(scully);

  const zev: User = usersRepo.create({
    username: 'ZevBellringer',
    email: 'zev@lexx.com',
    password: await bcrypt.hash('test1234', 10),
    followers: Promise.resolve([]),
    following: Promise.resolve([]),
    avatarURL: 'https://i.imgur.com/v5dW6pv.png'
  });
  users.push(zev);

  const kai: User = usersRepo.create({
    username: 'KaiOfBrunnis',
    email: 'kai@lexx.com',
    password: await bcrypt.hash('test1234', 10),
    followers: Promise.resolve([]),
    following: Promise.resolve([]),
    avatarURL: 'https://i.imgur.com/nx6w4xt.png'
  });
  users.push(kai);

  const stan: User = usersRepo.create({
    username: 'StanleyTweedle',
    email: 'stanTheMan@lexx.com',
    password: await bcrypt.hash('test1234', 10),
    followers: Promise.resolve([]),
    following: Promise.resolve([]),
    avatarURL: 'https://i.imgur.com/fZSwE8g.png'
  });
  users.push(stan);

  const picard: User = usersRepo.create({
    username: 'JeanLucPicard',
    email: 'picard@federation.gov',
    password: await bcrypt.hash('test1234', 10),
    followers: Promise.resolve([]),
    following: Promise.resolve([]),
    avatarURL: 'https://i.imgur.com/xKSFx7q.png'
  });
  users.push(picard);

  const riker: User = usersRepo.create({
    username: 'WilliamRiker',
    email: 'numberOne@federation.gov',
    password: await bcrypt.hash('test1234', 10),
    followers: Promise.resolve([]),
    following: Promise.resolve([]),
    avatarURL: 'https://i.imgur.com/Vwmy4lF.png'
  });
  users.push(riker);

  const crusher: User = usersRepo.create({
    username: 'DrBeverley',
    email: 'healerRed@federation.gov',
    password: await bcrypt.hash('test1234', 10),
    followers: Promise.resolve([]),
    following: Promise.resolve([]),
    avatarURL: 'https://i.imgur.com/fbFMmBj.png'
  });
  users.push(crusher);

  const deanna: User = usersRepo.create({
    username: 'DeannaTroi',
    email: 'BetazoidCounselor@federation.gov',
    password: await bcrypt.hash('test1234', 10),
    followers: Promise.resolve([]),
    following: Promise.resolve([]),
    avatarURL: 'https://i.imgur.com/vnRD4of.png'
  });
  users.push(deanna);

  const jc: User = usersRepo.create({
    username: 'JohnCrighton',
    email: 'spaceExplorer@farscape.com',
    password: await bcrypt.hash('test1234', 10),
    followers: Promise.resolve([]),
    following: Promise.resolve([]),
    avatarURL: 'https://i.imgur.com/VYbxr80.png'
  });
  users.push(jc);

  const aeryn: User = usersRepo.create({
    username: 'AerynSun',
    email: 'commando@peacekeepers.com',
    password: await bcrypt.hash('test1234', 10),
    followers: Promise.resolve([]),
    following: Promise.resolve([]),
    avatarURL: 'https://i.imgur.com/f71qBZM.png'
  });
  users.push(aeryn);

  const doctor: User = usersRepo.create({
    username: 'TheDoctor',
    email: 'john.smith@gmail.com',
    password: await bcrypt.hash('test1234', 10),
    followers: Promise.resolve([]),
    following: Promise.resolve([]),
    avatarURL: 'https://i.imgur.com/NG2NZXt.png'
  });
  users.push(doctor);

  const arnold: User = usersRepo.create({
    username: 'Schwarzenegger',
    email: 'arnold@california.gov',
    password: await bcrypt.hash('test1234', 10),
    followers: Promise.resolve([]),
    following: Promise.resolve([]),
    avatarURL: 'https://i.imgur.com/f9VigQU.png'
  });
  users.push(arnold);

  const newUser: User = usersRepo.create({
    username: 'Peshko',
    email: 'mnogo@bachka.com',
    password: await bcrypt.hash('test1234', 10),
    followers: Promise.resolve([]),
    following: Promise.resolve([]),
    avatarURL: 'https://i.imgur.com/bq1WQ6c.png'
  });
  users.push(newUser);

  const defUser: User = usersRepo.create({
    username: 'Niki',
    email: 'niki@abv.bg',
    password: await bcrypt.hash('predator666', 10),
    followers: Promise.resolve([]),
    following: Promise.resolve([]),
    avatarURL: 'https://i.imgur.com/CL9bKUj.png'
  });
  users.push(defUser);

  const defUserTwo: User = usersRepo.create({
    username: 'Alpha',
    email: 'alpha@abv.bg',
    password: await bcrypt.hash('test1234', 10),
    followers: Promise.resolve([]),
    following: Promise.resolve([]),
    avatarURL: 'https://i.imgur.com/r4YVwYq.png'
  });
  users.push(defUserTwo);

  const defUserThree: User = usersRepo.create({
    username: 'Beta',
    email: 'beta@abv.bg',
    password: await bcrypt.hash('test1234', 10),
    followers: Promise.resolve([]),
    following: Promise.resolve([]),
    avatarURL: 'https://i.imgur.com/qNMNwdV.png'
  });
  users.push(defUserThree);

  await usersRepo.save(users);

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
  const doctor: User = await usersRepo.findOne({where: {username: 'TheDoctor'}});
  const arnold: User = await usersRepo.findOne({where: {username: 'Schwarzenegger'}});

  peshko.following = Promise.resolve([niki, alpha, beta, mulder, scully, zev, kai, stan, picard, riker, crusher, troi, john, aeryn, doctor, arnold]);
  niki.followers = Promise.resolve([peshko, alpha, beta, mulder, scully, zev, kai, stan, picard, riker, crusher, troi, john, aeryn, doctor, arnold]);

  john.followers = Promise.resolve([aeryn, peshko]);
  aeryn.followers = Promise.resolve([john, peshko]);

  mulder.followers = Promise.resolve([scully, peshko]);
  scully.followers = Promise.resolve([mulder, peshko]);

  picard.followers = Promise.resolve([riker, troi, crusher, peshko]);

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
  await usersRepo.save(doctor);
  await usersRepo.save(arnold);

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

  const posts2: Post[] = [];

  const doctor: User = await usersRepo.findOne({where: {username: 'TheDoctor'}});
  const doctorPost1: Post = postsRepo.create({
    title: 'Me and my chavvy love!',
    content: 'Rose Tyler and I had a big love back in the day, but she got sent to a parallel universe',
    isPrivate: false,
    hasPermission: true,
    imageURL: 'https://i.imgur.com/zDga5Y5.png',
    author: doctor
  });
  posts2.push(doctorPost1);

  const doctorPost2: Post = postsRepo.create({
    title: 'Clara and I on a bike',
    content: `Clara is the only one who has seen my full history... even parts of it I don't know yet!`,
    isPrivate: false,
    hasPermission: true,
    imageURL: 'https://i.imgur.com/FoRnus7.png',
    author: doctor
  });
  posts2.push(doctorPost2);

  const doctorPost3: Post = postsRepo.create({
    title: '#missYouForever!',
    content: 'Donna Noble has the sadest story in the whole of time and space. The universe exists thanks to her sacrifice!',
    isPrivate: false,
    hasPermission: true,
    imageURL: 'https://i.imgur.com/5bGxXGr.png',
    author: doctor
  });
  posts2.push(doctorPost3);

  const arnold: User = await usersRepo.findOne({where: {username: 'Schwarzenegger'}});
  const arnoldPost1: Post = postsRepo.create({
    title: 'Not my proudest moment!',
    content: 'Ve vere killing ein predator, but I looked badly that day. However ve killed the motherf***er!',
    isPrivate: false,
    hasPermission: true,
    imageURL: 'https://i.imgur.com/d5cqqSR.png',
    author: arnold
  });
  posts2.push(arnoldPost1);

  const john: User = await usersRepo.findOne({where: {username: 'JohnCrighton'}});
  const johnPost1: Post = postsRepo.create({
    title: 'Prisoners on the run',
    content: 'I miss the old team...',
    isPrivate: false,
    hasPermission: true,
    imageURL: 'https://i.imgur.com/QpGWWyT.png',
    author: john
  });
  posts2.push(johnPost1);

  const johnPost2: Post = postsRepo.create({
    title: '#art #fromFansWithLove',
    content: 'I look super handsome on canvas',
    isPrivate: false,
    hasPermission: true,
    imageURL: 'https://i.imgur.com/VeYqm9V.png',
    author: john
  });
  posts2.push(johnPost2);

  const arnoldPost2: Post = postsRepo.create({
    title: 'Meine muscles!',
    content: 'These fine Frauen enjoy my big arms!',
    isPrivate: false,
    hasPermission: true,
    imageURL: 'https://i.imgur.com/Lf9rQ7c.png',
    author: arnold
  });
  posts2.push(arnoldPost2);

  const arnoldPost3: Post = postsRepo.create({
    title: 'Conan!',
    content: 'I vill always be a Barbarian at heart!',
    isPrivate: false,
    hasPermission: true,
    imageURL: 'https://i.imgur.com/9z2K9W3.png',
    author: arnold
  });
  posts2.push(arnoldPost3);

  const zev: User = await usersRepo.findOne({where: {username: 'ZevBellringer'}});
  const zevPost1: Post = postsRepo.create({
    title: 'The brave crew of the Lexx!',
    content: 'The most powerful weapon in the two universes is friendship!',
    isPrivate: false,
    hasPermission: true,
    imageURL: 'https://i.imgur.com/bHrikiQ.png',
    author: zev
  });
  posts2.push(zevPost1);

  const mulder: User = await usersRepo.findOne({where: {username: 'Mulder'}});
  const mulderPost1: Post = postsRepo.create({
    title: 'Best Friends Forever!',
    content: `I don't even remember how many X-Files we have solved together. So many monsters tried to kill us, aliens kidnapped us... Good times!`,
    isPrivate: false,
    hasPermission: true,
    imageURL: 'https://i.imgur.com/oAyzHuF.png',
    author: mulder
  });
  posts2.push(mulderPost1);

  await postsRepo.save(posts2);

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
    content: `Well, aren't we friends?`,
    author: mulder
  });
  newComment1.post = Promise.resolve(toPost);
  await commentsRepo.save(newComment1);
  const newComment2: Comment = commentsRepo.create({
    content: `For God's sake, Mulder, we had a child together in season 8!`,
    author: scully
  });
  newComment2.post = Promise.resolve(toPost);
  await commentsRepo.save(newComment2);
  const newComment3: Comment = commentsRepo.create({
    content: `But that's a secret, we dont announce it on social networks`,
    author: mulder
  });
  newComment3.post = Promise.resolve(toPost);
  await commentsRepo.save(newComment3);
  const newComment4: Comment = commentsRepo.create({
    content: `It's not a secret anymore, season 8 aired 20 years ago!`,
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
