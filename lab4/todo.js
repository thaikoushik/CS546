const mongoCollections = require('./mongoCollections');
const todoItems = mongoCollections.todoItems;
const ObjectId = require('mongodb').ObjectID;

module.exports = {
	async createTask(title,description){
		if(!title) throw "Please provide todo title";
		if(!description) throw "Please provide description";

		const todoCollection = await todoItems();

		let newTask = {
			title: title,
			description: description,
			completed: false,
			completedAt: null
		};

		const insertInfo = await todoCollection.insertOne(newTask);
		if(insertInfo.insertedCount === 0) throw "Could not create a task";
		const newId = insertInfo.insertedId;
		const task = await this.getTask(newId);

		return task;
	},

	async getTask(id){
		if(!id) throw "No id provided";
		const todoCollection = await todoItems();
		const task = await todoCollection.findOne({_id:new ObjectId(id)});
		if(task === null) throw "No task found";
		return task;
	},

	async getAllTasks(){
		const todoCollection = await todoItems();
		const allTasks = await todoCollection.find({}).toArray();
		return allTasks;
	},

	async completeTask(id){
		if(!id) throw "Please provide id";
		const todoCollection = await todoItems();
		const task = await this.getTask(id);

		/*let completedTask = {
			completed: true,
			completedAt: new Date()
		};*/

		//const updatedInfo = await todoCollection.updateOne({_id: id}, completedTask);
		const updatedInfo = await todoCollection.update({_id: id}, {$set: {completed: true, completedAt: new Date()}});
		if(updatedInfo.modifiedCount === 0){
			throw "Document not modified";
		}
		return await this.getTask(id);
	},

	async removeTask(id){
		if(!id) throw "please provide id";
		const todoCollection = await todoItems();
		const deletedInfo = await todoCollection.removeOne({_id: id});
		return deletedInfo;
		if(deletedInfo.deletedCount === 0){
			throw `could not delete task with id {id}`;
		}
	}
}