const pictureConverter = row => ({
  id: row.picture_id,
  postDate: new Date(row.picture_post_date),
  url: row.picture_url,
  description: row.picture_description,
  allowComments: row.picture_allow_comments == 'true' ? true : false,
  likes: row.likes,
  comments: row.comments,
  userId: row.user_id,
});

const commentConverter = row => ({
  date: row.comment_date,
  text: row.comment_text,
  userName: row.user_name
})

const maxRows = 12;

class PictureDao {
  constructor(db) {
    this._db = db;
  }

  listAllFromUser(userName, page) {
    const from = (page - 1) * maxRows;
    let limitQuery = '';
    if (page) limitQuery = `LIMIT ${from}, ${maxRows}`;

    return new Promise((resolve, reject) => {
      this._db.all(`
                SELECT  p.*,
                        (SELECT COUNT(c.comment_id) 
                            FROM comment as c 
                            WHERE c.picture_id = p.picture_id
                         ) as comments, 

                        (SELECT COUNT(l.like_id) 
                            FROM like as l 
                            WHERE l.picture_id = p.picture_id
                        ) as likes 
                FROM picture AS p
                        JOIN
                        user AS u ON p.user_id = u.user_id
                WHERE u.user_name = ?
                ORDER BY p.picture_post_date DESC
                ${limitQuery} ;
                `,
        [userName],
        (err, rows) => {
          const pictures = rows.map(pictureConverter)
          if (err) {
            console.log(err);
            return reject('Can`t list pictures');
          }
          console.log('pictures retornadas');
          resolve(pictures);
        });
    });
  }

  add(picture, user_id) {
    return new Promise((resolve, reject) => {
      this._db.run(`
                INSERT INTO picture (
                    picture_post_date,
                    picture_url,
                    picture_description,
                    picture_allow_comments,
                    user_id
                ) values (?,?,?,?,?)
            `,
        [
          new Date(),
          picture.url,
          picture.description,
          picture.allowComments,
          user_id
        ],
        function (err) {
          if (err) {
            console.log(err);
            return reject('Can`t add picture');
          }
          resolve(this.lastID);
        });
    });
  }

  findById(id) {
    return new Promise((resolve, reject) => this._db.get(`
            SELECT  p.*, 
                    (SELECT COUNT(c.comment_id) 
                        FROM comment as c 
                        WHERE c.picture_id = p.picture_id
                    ) as comments, 
                    (SELECT COUNT(l.like_id) 
                        FROM like as l 
                        WHERE l.picture_id = p.picture_id
                    ) as likes 
            FROM picture AS p
            WHERE p.picture_id = ?
            ORDER BY p.picture_post_date DESC;
            `,
      [id],
      (err, row) => {
        if (err) {
          console.log(err);
          return reject('Can`t find picture');
        }
        if (row) {
          resolve(pictureConverter(row));
        } else {
          resolve(null);
        }
      }
    ));
  }

  remove(id) {
    return new Promise((resolve, reject) => this._db.run(
      `DELETE FROM picture where picture_id = ?`,
      [id],
      err => {
        if (err) {
          console.log(err);
          return reject('Can`t remove picture');
        }
        resolve();
      }
    ));
  }

  addComment(text, pictureId, userId) {
    return new Promise((resolve, reject) => {
      this._db.run(`
                    INSERT INTO comment (
                        comment_date, 
                        comment_text, 
                        picture_id,
                        user_id
                    ) values (?,?,?, ?)
                `,
        [
          new Date(),
          text,
          pictureId,
          userId,
        ],
        function (err) {
          if (err) {
            console.log(err);
            return reject('Can`t add comment');
          }
          resolve(this.lastID);
        });
    });
  }

  getCommentsFrompicture(pictureId) {
    return new Promise((resolve, reject) => {
      this._db.all(
        `
                SELECT 
                    c.comment_date, c.comment_text, u.user_name 
                FROM comment as c 
                    JOIN user as u ON u.user_id = c.user_id 
                WHERE c.picture_id = ? 
                ORDER BY c.comment_date DESC  
                `,
        [pictureId],
        (err, rows) => {
          if (err) {
            console.log(err);
            return reject('Can`t load comments');
          }
          const comments = rows.map(commentConverter);
          return resolve(comments);
        }
      );
    });
  }

  findCommentById(commentId) {
    return new Promise((resolve, reject) => {
      this._db.get(
        `
                SELECT 
                    c.comment_date, c.comment_text, u.user_name 
                FROM comment as c 
                    JOIN user as u ON u.user_id = c.user_id 
                WHERE c.comment_id = ?
                `,
        [commentId],
        (err, row) => {
          console.log(row);
          if (err) {
            console.log(err);
            return reject('Can`t load comment');
          }
          return resolve(commentConverter(row));
        }
      );
    });
  }

  likeById(pictureId, userId) {
    return new Promise((resolve, reject) => this._db.run(
      `
            INSERT OR IGNORE INTO like 
                (picture_id, user_id) 
            VALUES 
                (?, ?) 
            `,
      [pictureId, userId],
      function (err) {
        if (err) {
          console.log(err);
          return reject('Cant like picture');
        }
        resolve(!!this.changes);
      }
    ));
  }
}

module.exports = PictureDao;