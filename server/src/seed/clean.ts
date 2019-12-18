
import { User } from './../data/entities/user.entity';
import { Post } from './../data/entities/post.entity';
import { Comment } from './../data/entities/comment.entity';
import { LikePost } from './../data/entities/like-post.entity';
import { LikeComment } from './../data/entities/like-comment.entity';

import { createConnection } from 'typeorm';

const main = async () => {

    const connection = await createConnection();

    const commentRepo = connection.getRepository(Comment);
    const userRepo = connection.getRepository(User);
    const postRepo = connection.getRepository(Post);
    const likePostRepo = connection.getRepository(LikePost);
    const likeCommentRepo = connection.getRepository(LikeComment);

    await likeCommentRepo.delete({});
    await likePostRepo.delete({});
    await commentRepo.delete({});
    await postRepo.delete({});
    await userRepo.delete({});

    await connection.close();
    console.log('Data removed from database!');
};
main()
.catch(console.log);
