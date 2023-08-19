// default db is "test"
db = db.getSiblingDB('the_database');

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