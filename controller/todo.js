const Todo = require("../model/todo");

exports.createTodo = (req, res, next) => {
  const todo = new Todo({
    title: req.body.title,
    content: req.body.content,
    creator: req.userData.userId
  });
  todo
    .save()
    .then(createTodo => {
      res.status(201).json({
        message: "Todo Added Successfully",
        todo: {
          ...createTodo,
          id: createTodo._id
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Craeting a todo Failed!"
      });
    });
};

exports.getAllTodos = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Todo.find();
  let fetchedTodos;
  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  postQuery
    .then(documents => {
      fetchedTodos = documents;
      return Todo.countDocuments();
    })
    .then(count => {
      res.status(200).json({
        message: "Posts Fetched Successfully!",
        todos: fetchedTodos,
        maxTodos: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching todos failed!"
      });
    });
};

exports.updateTodo = (req, res, next) => {
  const todo = new Todo({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    creator: req.userData.userData
  });
  Todo.updateOne({ _id: req.params.id, creator: req.userData.userId }, todo)
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({
          message: "Todo Updated Successfully"
        });
      } else {
        res.status(401).json({
          message: "Not Authorized"
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't update todo!"
      });
    });
};

exports.getTodoById = (req, res, next) => {
  Todo.findById(req.params.id)
    .then(todo => {
      if (todo) {
        res.status(200).json(todo);
      } else {
        res.status(404).json({ message: "Todo Not Found" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching todos failed!"
      });
    });
};

exports.deleteTodo = (req, res, next) => {
  Todo.deleteOne({ _id: req.params.id, creator: req.userData.userId })
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({
          message: "Todo Deleted Successfully"
        });
      } else {
        res.status(401).json({
          message: "Not Authorized"
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching todos failed!"
      });
    });
};
