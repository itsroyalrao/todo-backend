import Todo from "../models/todo.js";

const postTodo = async (req, res) => {
  try {
    const { inputValue, email } = req.body;
    await Todo.create({ email: email, content: inputValue });
    return res.json({ success: true });
  } catch (e) {
    console.log(e.message);
  }
};

const updateTodo = async (req, res) => {
  try {
    await Todo.findOneAndUpdate({ _id: req.params.id }, { isComplete: true });
    return res.json({ success: true });
  } catch (e) {
    console.log(e.message);
  }
};

const getTodos = async (req, res) => {
  try {
    const { email } = req.query;

    const todo = await Todo.find({ email: email });

    if (todo.length) {
      return res.json({ success: true, data: todo });
    } else {
      return res.json({ success: false });
    }
  } catch (e) {
    console.log(e.message);
  }
};

// const updateTodo = async (req, res) => {
//   try {
//     const todo = await Todo.findOne({ _id: req.query.id });
//     if (list.isComplete) {
//       await Todo.findOneAndUpdate({ _id: req.query.id }, { isComplete: false });
//     } else {
//       await Todo.findOneAndUpdate({ _id: req.query.id }, { isComplete: true });
//     }
//     return res.json({ success: true, status: !list.isComplete, id: list._id });
//   } catch (e) {
//     console.log(e.message);
//   }
// };

const deleteTodo = async (req, res) => {
  try {
    await Todo.findOneAndDelete({ _id: req.query.id });
    return res.json({ success: true });
  } catch (e) {
    console.log(e.message);
  }
};

export { postTodo, updateTodo, getTodos, deleteTodo };
// export { postTodo, editTodo, getTodos, updateTodo, deleteTodo };
