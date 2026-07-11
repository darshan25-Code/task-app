const Task = require('../models/Task')

const createTask =async (req,res)=>{
  try{
    const {title} = req.body

    const task = await Task.create({
        title,
        user : req.user.id
    })

    return res.status(200).json({
        message : "Task created successfully",
        task,
    })
  }
  catch(error){
     return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
}

const getTask = async(req,res)=>{
    try{
        const tasks = await Task.find({
            user : req.user.id
        })
        return res.status(200).json({
            message : "Task feched succsessfully",
            tasks,
        })
    }
    catch(error){
     return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }

}



const updateTask = async (req,res)=>{
  try{
    const {title, status} = req.body

    const task = await Task.findById(req.params.id);
if (task.user.toString() !== req.user.id) {
  return res.status(403).json({
    message: "Unauthorized",
  });
}

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      {title,
        status
      },
      {
        new : true
      }
    )

    if(!updatedTask){
      return res.status(404).json({
        message : "Task not found"
      })
    }
    return res.status(200).json({
      message : "Task updated Successfuly",
      updatedTask
    })

  }
  catch(error){
     return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
}

const deleteTask = async (req,res)=>{
  try{

    const task = await Task.findById(req.params.id);
if (task.user.toString() !== req.user.id) {
  return res.status(403).json({
    message: "Unauthorized",
  });
}

    const deletedTask = await Task.findByIdAndDelete(req.params.id)

    if(!deletedTask){
      return res.status(404).json({
        message : "Task not Found"
      })
    }
    return res.status(200).json({
      message : "Task deleted Successfully"
    })
  }
  catch(error){
     return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
}


module.exports= {createTask,getTask,updateTask,deleteTask}