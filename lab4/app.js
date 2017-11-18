const todoItems = require('./todo');


async function main() {
	try{
		console.log("------------------- Creating a Task -------------------");
	    const createdTask = await todoItems.createTask("Ponder Dinosaurs","Has Anyone Really Been Far Even as Decided to Use Even Go Want to do Look More Like?");
	    console.log(createdTask);
	    console.log("------------------- Creating 2nd Task -------------------");
	    const createdTask2 = await todoItems.createTask( "Play Pokemon with Twitch TV", "Should we revive Helix?");
	    console.log(createdTask2);
	    console.log("------------------- All Tasks -------------------");
	    const allT = await todoItems.getAllTasks();
	    console.log(allT);
	    const task = await todoItems.getTask(createdTask._id);
	    console.log("------------------- Removing Task 1 -------------------");
	    const deleteTask = await todoItems.removeTask(task._id);
	    console.log("Number of Items Deleted: "+deleteTask.deletedCount);
 		console.log("------------------- All Tasks -------------------");
	    const allTasks = await todoItems.getAllTasks();
	    console.log(allTasks);
	    console.log("------------------- Updating Task 2 -------------------");
	    const task2 = await todoItems.getTask(createdTask2._id);
	    const finishedTask = await todoItems.completeTask(task2._id); 
	    console.log(finishedTask);   	
	} catch(error){
		console.error(error);
	}
}

main();