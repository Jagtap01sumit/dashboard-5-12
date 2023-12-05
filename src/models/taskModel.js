import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: [true, 'Provide task name.'],
    },
    taskDueDate: {
        type: Date,
        required: [true, 'Provide due date.'],
    },
    taskStartTime: {
        type: String,
        required: [true, "Provide task start time"],
    },
    taskEndTime: {
        type: String,
        required: [true, "Provide task end time"],
    },
    priority: {
        type: String,
        required: [true, "Provide task priorrity"],
    },
    assignedTo: [{
        type: String
    }],
    collaborator: [{
        type: String
    }],
    project: {
        type: String
    },
    description: {
        type: String,
    },
    attachments: [{
        type: String,
    }],
    subTask: [
        {
            type: String
        }
    ]
});

const Task = mongoose.models.tasks || mongoose.model('tasks', taskSchema);

export default Task