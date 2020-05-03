const { commentAPI } = require('../api'),
  path = require('path'),
  { wrapAsync, auth } = require('../infra')

module.exports = app => {
  app.route('/pictures/:pictureId/comments')
    .get(wrapAsync(commentAPI.listAllFromPicture))
    .post(auth, wrapAsync(commentAPI.add));
};