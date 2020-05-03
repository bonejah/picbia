const { PictureDao, UserDao } = require('../infra')
  , jimp = require('jimp')
  , path = require('path')
  , fs = require('fs')
  , unlink = require('util').promisify(fs.unlink);

const api = {}
const userCanDelete = user => picture => picture.userId == user.id;
const defaultExtension = '.jpg';

api.list = async (req, res) => {
  console.log('####################################');
  const { userName } = req.params;
  const { page } = req.query;
  const user = await new UserDao(req.db).findByName(userName);
  if (user) {
    console.log(`Listing pictures`);
    const pictures = await new PictureDao(req.db)
      .listAllFromUser(userName, page);
    res.json(pictures);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
}

api.add = async (req, res) => {
  console.log('####################################');
  console.log('Received JSON data', req.body);
  const picture = req.body;
  picture.file = '';
  const id = await new PictureDao(req.db).add(picture, req.user.id);
  res.json(id);
};

api.addUpload = async (req, res) => {
  console.log('upload complete');
  console.log('picture data', req.body);
  console.log('File info', req.file);
  const image = await jimp.read(req.file.path);

  await image
    .exifRotate()
    .cover(460, 460)
    .autocrop()
    .write(req.file.path);

  const picture = req.body;
  picture.url = path.basename(req.file.path);
  await new PictureDao(req.db).add(picture, req.user.id);
  res.status(200).end();
};

api.findById = async (req, res) => {
  const { pictureId } = req.params;
  console.log('####################################');
  console.log(`Finding picture for ID ${pictureId}`)
  const picture = await new PictureDao(req.db).findById(pictureId);
  if (picture) {
    res.json(picture);
  } else {
    res.status(404).json({ message: 'picture does not exist' })
  }
};

api.remove = async (req, res) => {
  const user = req.user;
  const { pictureId } = req.params;
  const dao = new PictureDao(req.db);
  const picture = await dao.findById(pictureId);
  if (!picture) {
    const message = 'picture does not exist';
    console.log(message);
    return res.status(404).json({ message });
  }

  if (userCanDelete(user)(picture)) {
    await dao.remove(pictureId)
    console.log(`picture ${pictureId} deleted!`);
    res.status(200).end();
  } else {
    console.log(`
            Forbiden operation. User ${user.id} 
            can delete picture from user ${picture.userId}
        `);
    res.status(403).json({ message: 'Forbidden' });
  }
};

api.like = async (req, res) => {
  const { pictureId } = req.params;
  const dao = new PictureDao(req.db);
  const liked = await dao.likeById(pictureId, req.user.id);
  if (liked) {
    console.log(`User ${req.user.name} liked picture ${pictureId}`);
    return res.status(201).end();
  }
  return res.status(304).end();
};

module.exports = api;