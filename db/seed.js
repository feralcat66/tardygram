const chance = require('chance').Chance();
const User = require('../lib/models/User');
const Note = require('../lib/models/Note');
const Post = require('../lib/models/Post');

module.exports = async({ usersToCreate = 5, notesToCreate = 30, postsToCreate = 50 } = {}) => {
  const loggedInUser = await User.create({
    username: 'test@test.com',
    password: 'password',
    profilePhotoUrl: 'url.com'
  });

  const loggedInPost = await Post.create({
    user: 'test@test.com',
    photoUrl: 'password',
    caption: 'url.com',
    tags: [chance.word(), chance.word()]
  });

  const users = await User.create([...Array(usersToCreate)].slice(1).map(() => ({
    username: chance.email(),
    password: chance.animal(),
    profilePhotoUrl: chance.url()
  })));

  const posts = await Post.create([...Array(postsToCreate)].map(() => ({
    user: chance.pickone(users)._id,
    photoUrl: chance.url(),
    caption: chance.sentence(),
    tags: [chance.word(), chance.word()]
  })));

  await Note.create([...Array(notesToCreate)].map(() => ({
    commentBy: loggedInUser._id,
    post: loggedInPost._id,
    comment: chance.sentence()
  })));
};
