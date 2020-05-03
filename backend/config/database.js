const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data.db');

const USER_SCHEMA = `
CREATE TABLE IF NOT EXISTS user (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT, 
    user_name VARCHAR(30) NOT NULL UNIQUE, 
    user_email VARCHAR(255) NOT NULL, 
    user_password VARCAHR(255) NOT NULL,
    user_full_name VARCAHR(40) NOT NULL, 
    user_join_date TIMESTAMP DEFAULT current_timestamp
)
`;

const INSERT_DEFAULT_USER_1 =
  `
INSERT INTO user (
    user_name, 
    user_email,
    user_password,
    user_full_name
) SELECT 'bonejah', 'brunopclima81@gmail.com', '123456', 'Pauliho' WHERE NOT EXISTS (SELECT * FROM user WHERE user_name = 'bonejah')
`;

const INSERT_DEFAULT_USER_2 =
  `
INSERT INTO user (
    user_name, 
    user_email,
    user_password,
    user_full_name
) SELECT 'bplima', 'dadivajah@gmail.com', '123456', 'Bruno Lima' WHERE NOT EXISTS (SELECT * FROM user WHERE user_name = 'bplima')
`;

const PICTURE_SCHEMA =
  `
CREATE TABLE IF NOT EXISTS picture (
    picture_id INTEGER PRIMARY KEY AUTOINCREMENT,
    picture_post_date TIMESTAMP NOT NULL, 
    picture_url TEXT NOT NULL, 
    picture_description TEXT DEFAULT ('') NOT NULL, 
    picture_allow_comments INTEGER NOT NULL DEFAULT (1), 
    picture_likes BIGINT NOT NULL DEFAULT (0),
    user_id INTEGER,
    FOREIGN KEY(user_id) REFERENCES user(user_id) ON DELETE CASCADE 
)
`;

const INSERT_PICTURE_1 = 
`
  INSERT INTO picture (
    picture_post_date,
    picture_url,
    picture_description,
    user_id
  ) VALUES (
    '10-02-2019',
    'https://images.unsplash.com/photo-1516375700707-11d976c89925?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    'mac1',
    1
  )
`;

const INSERT_PICTURE_2 = 
`
  INSERT INTO picture (
    picture_post_date,
    picture_url,
    picture_description,
    user_id
  ) VALUES (
    '10-02-2019',
    'https://images.unsplash.com/photo-1542178036-2e5efe4d8f83?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    'mac2',
    1
  )
`;

const INSERT_PICTURE_3 = 
`
  INSERT INTO picture (
    picture_post_date,
    picture_url,
    picture_description,
    user_id
  ) VALUES (
    '11-02-2019',
    'https://images.unsplash.com/photo-1484589065579-248aad0d8b13?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    'space1',
    1
  )
`;

const INSERT_PICTURE_4 = 
`
  INSERT INTO picture (
    picture_post_date,
    picture_url,
    picture_description,
    user_id
  ) VALUES (
    '11-02-2019',
    'https://images.unsplash.com/photo-1494022299300-899b96e49893?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    'space2',
    1
  )
`;



const COMMENT_SCHEMA =
  `
CREATE TABLE IF NOT EXISTS comment (
    comment_id INTEGER   PRIMARY KEY AUTOINCREMENT,
    comment_date TIMESTAMP NOT NULL,
    comment_text TEXT  DEFAULT (''),
    picture_id INTEGER,
    user_id INTEGER,
    FOREIGN KEY (picture_id) REFERENCES picture (picture_id) ON DELETE CASCADE,
    FOREIGN KEY(user_id) REFERENCES user(user_id) ON DELETE CASCADE 
);
`;

const LIKE_SCHEMA = `
CREATE TABLE IF NOT EXISTS like (
    like_id INTEGER PRIMARY KEY AUTOINCREMENT, 
    picture_id INTEGER,
    user_id  INTEGER,
    like_date TIMESTAMP DEFAULT current_timestamp, 
    UNIQUE(user_id, picture_id ),
    FOREIGN KEY (picture_id) REFERENCES picture (picture_id) ON DELETE CASCADE,
    FOREIGN KEY(user_id) REFERENCES user(user_id) ON DELETE CASCADE
)
`;

db.serialize(() => {
  db.run("PRAGMA foreign_keys=ON");
  db.run(USER_SCHEMA);
  // db.run(INSERT_DEFAULT_USER_1);
  // db.run(INSERT_DEFAULT_USER_2);
  // db.run(PICTURE_SCHEMA);
  // db.run(INSERT_PICTURE_1);
  // db.run(INSERT_PICTURE_2);
  // db.run(INSERT_PICTURE_3);
  // db.run(INSERT_PICTURE_4);
  db.run(COMMENT_SCHEMA);
  db.run(LIKE_SCHEMA);

  db.each("SELECT * FROM user", (err, user) => {
    console.log('Users');
    console.log(user);
  });

  db.each("SELECT * FROM picture", (err, picture) => {
    console.log('Pictures');
    console.log(picture);
  });
});

process.on('SIGINT', () =>
  db.close(() => {
    console.log('Database closed');
    process.exit(0);
  })
);

module.exports = db;