const router = require('express').Router();

const {
  getAsync: redisGetAsync
} = require('../redis');

router.get('/', async (_, res) => {
  try {
    const addedTodos = await redisGetAsync('added_todos') || 0;
    res.send({
      added_todos: parseInt(addedTodos)
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;
