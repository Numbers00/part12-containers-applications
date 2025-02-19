const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();

const {
  getAsync: redisGetAsync,
  setAsync: redisSetAsync
} = require('../redis');

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  try {
    const todo = await Todo.create({
      text: req.body.text,
      done: false
    });

    // returns null if key does not exist
    const addedTodos = await redisGetAsync('added_todos') || 0;
    console.log('addedTodos', addedTodos);
    await redisSetAsync('added_todos', parseInt(addedTodos) + 1);

    res.send(todo);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo); // Implement this
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const updatedTodo = await req.todo.update({
    text: req.body.text,
    done: req.body.done
  });
  res.send(updatedTodo); // Implement this
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
