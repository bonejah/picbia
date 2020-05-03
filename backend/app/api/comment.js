const { CommentDao, PictureDao } = require('../infra');

const userCanComment = userId => picture =>
  picture.allowComments || picture.userId === userId;

const api = {};

api.add = async (req, res) => {
  const { pictureId } = req.params;
  const { commentText } = req.body;

  const commentDao = new CommentDao(req.db);
  const pictureDao = new PictureDao(req.db);

  const picture = await pictureDao.findById(pictureId);
  const canComment = userCanComment(req.user.id)(picture);

  if (canComment) {
    const commentId = await commentDao.add(commentText, picture.id, req.user.id);
    const comment = await commentDao.findById(commentId);
    console.log(`Comment added`, comment);
    res.json(comment);
  } else {
    res.status(403).json({ message: 'Forbiden' });
  }
};

api.listAllFromPicture = async (req, res) => {
  const { pictureId } = req.params;
  console.log(`Get comments from picture ${pictureId}`);
  const commentDao = new CommentDao(req.db);
  const comments = await commentDao.listAllFromPicture(pictureId);
  res.json(comments);
}

module.exports = api;
