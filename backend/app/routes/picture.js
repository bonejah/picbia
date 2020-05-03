const { pictureAPI } = require('../api'),
  path = require('path'),
  { wrapAsync, auth } = require('../infra')

module.exports = app => {
  app.route('/:userName/pictures')
    .get(wrapAsync(pictureAPI.list));

  app.route('/pictures/upload')
    .post(auth, app.get('upload').single('imageFile'), wrapAsync(pictureAPI.addUpload))

  app.route('/pictures/:pictureId')
    .post(auth, wrapAsync(pictureAPI.add))
    .delete(auth, wrapAsync(pictureAPI.remove))
    .get(wrapAsync(pictureAPI.findById));

  app.route('/pictures/:pictureId/like')
    .post(auth, wrapAsync(pictureAPI.like));
};