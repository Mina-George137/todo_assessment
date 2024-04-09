const { PrismaClient } = require("@prisma/client");
const prismaClient = new PrismaClient();
const { formatISO } = require("date-fns");

const validateDate = (date)=>{
    return formatISO(new Date(date)); // Convert to ISO-8601 string
}
const createTask = async (req, res) => {
  try {
    let { title, description, dueDate } = req.body;
    let userId = req.user.id;
    dueDate = validateDate(dueDate);

    const newTask = await prismaClient.task.create({
      data: {
        userId: userId,
        description: description,
        title: title,
        dueDate: dueDate,
      },
    });

    return res.status(200).json({ message: "success", data: [newTask] });
  } catch (error) {
    return res.status(500).json({ message: "fail", error: error.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const allTasks = await prismaClient.task.findMany();
    if (allTasks.length === 0)
      return res
        .status(404)
        .json({ message: "fail", error: "No tasks found." });
    return res.status(200).json({ message: "success", data: allTasks });
  } catch (error) {
    return res.status(500).json({ message: "fail", error: error.message });
  }
};

const getTask = async (req, res) => {
  try {
    const task = await prismaClient.task.findUnique({
        where:{
            id : req.params.id
        }
    });
    if (!task)
      return res
        .status(404)
        .json({ message: "fail", error: "Task not found." });
    return res.status(200).json({ message: "success", data: [task] });
  } catch (error) {
    return res.status(500).json({ message: "fail", error: error.message });
  }
};



const deleteTask = async (req, res) => {
  try {
    const deletedTask = await prismaClient.task.delete({
        where:{
            id: req.params.id,
            userId: req.user.id,
        }
    });
    if (!deletedTask)
      return res
        .status(404)
        .json({ message: "fail", error: "Task not found." });
    return res.status(200).json({ message: "success", data: deletedTask });
  } catch (error) {
    return res.status(500).json({ message: "fail", error: error.message });
  }
};

const markTaskAsCompleted = async (req, res) => {
  try {
    const task = await prismaClient.task.update({
        where:{
            id : req.params.id,
            userId: req.user.id
        },
        data:{
            isCompleted: true,
        }
    });
    return res.status(200).json({ message: "success", data: [task] });
  } catch (error) {
    return res.status(500).json({ message: "fail", error: error.message });
  }
};

const getTasksOfUser = async (req, res) => {
  try {
    const tasks = await prismaClient.task.findMany({ 
        where:{
            userId: req.user.id
        }
     });
    if (tasks.length === 0)
      return res
        .status(404)
        .json({ message: "fail", error: "No tasks found." });
    return res.status(200).json({ message: "success", data: tasks });
  } catch (error) {
    return res.status(500).json({ message: "fail", error: error.message });
  }
};

const deleteAllTasksOfUser = async (ID) => {
  try {
    const deletedTasks = await taskModel.deleteMany({ userId: ID });
    if (!deletedTasks)
      return res
        .status(404)
        .json({ message: "fail", error: "No tasks found." });
    return res.status(200).json({ message: "success", data: deletedTasks });
  } catch (error) {
    return res.status(500).json({ message: "fail", error: error.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTask,
  deleteTask,
  markTaskAsCompleted,
  getTasksOfUser,
  deleteAllTasksOfUser,
};
