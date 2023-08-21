// default db is "test"
// env var used to be MONGODB_INITDB_DATABASE, should have been MONGO_
// now "the_database" is used as default
// db = db.getSiblingDB('the_database');

db.createUser({
  user: 'the_username',
  pwd: 'the_password',
  roles: [
    {
      role: 'dbOwner',
      db: 'the_database',
    },
  ],
});

db.createCollection('todos');

// .insert() is deprecated
db.todos.insertOne({ text: 'Write code', done: true });
db.todos.insertOne({ text: 'Learn about containers', done: false });