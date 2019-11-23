import { User } from './../data/entities/user.entity';
import { createConnection } from "typeorm";
import * as bcrypt from 'bcrypt';

const main = async () => {

    const connection = await createConnection();
    const userRepo = connection.getRepository(User);

    const defUser = new User();
    defUser.username = 'Niki';
    defUser.password = await bcrypt.hash('123456', 10);
    defUser.email = "niki@abv.bg";
    defUser.followers = Promise.resolve([]);
    defUser.following = Promise.resolve([]);
    await userRepo.save(defUser);

    const defUserTwo = new User();
    defUserTwo.username = 'Alpha';
    defUserTwo.password = await bcrypt.hash('123456', 10);
    defUserTwo.email = "alpha@abv.bg";
    defUserTwo.followers = Promise.resolve([]);
    defUserTwo.following = Promise.resolve([]);
    await userRepo.save(defUserTwo);

    const defUserThree = new User();
    defUserThree.username = 'Beta';
    defUserThree.password = await bcrypt.hash('123456', 10);
    defUserThree.email = "beta@abv.bg";
    defUserThree.followers = Promise.resolve([]);
    defUserThree.following = Promise.resolve([]);
    await userRepo.save(defUserThree);

    await connection.close();
    console.log(`Data seeded successfully`);

}

main()
  .catch(console.log);