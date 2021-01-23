var TaskService = new Service();
var isLoading = false;

function addTaskList() {
  TaskService.getListTask()
    .then(function (list) {
      var t = "",
        n = "";
      (getEle("todo").innerHTML = ""),
        (getEle("completed").innerHTML = ""),
        list.data &&
          list.data.length > 0 &&
          list.data.forEach(function (task) {
            "todo" === task.status
              ? ((t += addActivity(task)), (getEle("todo").innerHTML = t))
              : "completed" === task.status &&
                ((n += addActivity(task)), (getEle("completed").innerHTML = n));
          });
    })
    .catch(function (err) {
      console.log(err);
    });
}

function addActivity(task) {
  return `
  <li>   
   <span>${task.textTask}</span>  
     <div class="buttons">     
      <button class="remove" onclick="deleteToDo(${task.id})">
        <i class="fa fa-trash-alt"></i>
      </button>    
      <button class="complete" onclick="changeStatus(${task.id})">
        <i class="far fa-check-circle"></i>
        <i class="fas fa-check-circle"></i> 
      </button> 
     </div>  
   </li>
    `;
}

function deleteToDo(task) {
  checkLoading();
  TaskService.deleteTask(task)
    .then(function () {
      alert("Delete Success!"), addTaskList();
    })
    .catch(function (err) {
      console.log(err);
    });
}

function changeStatus(task) {
  checkLoading();
  TaskService.getTaskById(task)
    .then(function (list) {
      var t = list.data;
      return (
        (t.status = "todo" === t.status ? "completed" : "todo"),
        TaskService.updateTask(t)
      );
    })
    .then(function () {
      checkLoading();
      alert("Change Status Success!"), addTaskList();
    });
}

addTaskList(),
  getEle("addItem").addEventListener("click", function () {
    var item = getEle("newTask").value;
    if ("" !== item) {
      var task = new Task(item, "todo");
      checkLoading();
      TaskService.addTask(task)
        .then(function () {
          alert("Add Success!"), addTaskList(), (getEle("newTask").value = "");
        })
        .catch(function (err) {
          console.log(err);
        });
    } else alert("Task Empty!");
  });

function checkLoading() {
  var content = "";
  content += `
    <div class="loading">
    <h2>Chờ Một Tí Tí Nha!!!</h2>
    <div class="loader"></div>
    </div>
    `;
  getEle("todo").innerHTML = content;
  getEle("completed").innerHTML = "";
}
checkLoading();

function getEle(id) {
  return document.getElementById(id);
}
