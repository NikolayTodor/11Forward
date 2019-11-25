
import { User } from './../data/entities/user.entity';
import { createConnection } from 'typeorm';

const main = async () => {

    const connection = await createConnection();
    const userRepo = connection.getRepository(User);
    await userRepo.delete({});

    await connection.close();
    console.log('Data removed from database!');
};
main()
.catch(console.log);