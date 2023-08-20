// document.getElementById("addTaskButton").addEventListener("click", addTask);


// window.onload = function() {
//     console.log("he");
//     let data  = JSON.parse(localStorage.getItem("addTaskList"))
//     console.log(data);

    
//     const taskList = document.getElementById('taskList');
//     const taskBlock = document.createElement('div');
//     taskBlock.className = 'task-block';
   
//     data.forEach((element , index) => {
       
//         const taskNameBlock = document.createElement('div');
//             taskNameBlock.className = 'task-name';
//             taskNameBlock.textContent = element.title;
//             taskNameBlock.draggable = true;
//             taskNameBlock.addEventListener('dragstart', handleDragStart);
//             taskNameBlock.innerHTML += `<button class="delete-button" uniqueId= ${index}>Delete</button>`;
            
//             const taskDescriptionBlock = document.createElement('div');
//                 taskDescriptionBlock.className = 'task-description';
            
//                 taskBlock.appendChild(taskNameBlock);
//                 taskBlock.appendChild(taskDescriptionBlock);   
//                 taskList.appendChild(taskBlock);     
                
//                 var deleteButton = taskNameBlock.querySelector('.delete-button');
//                 deleteButton.addEventListener('click', function () {
//                 //   taskBlock.remove();
//                 let deleteId =+ deleteButton.getAttribute("uniqueId");
//                 console.log(typeof deleteId)
//                 });
//     });
   
// }
// let addTaskList = [];

function addTask() {
    const taskInput = document.getElementById("taskInput").value;
  console.log(taskInput);
  addTaskList.push({
    title: taskInput,
    description: "",
  });
  let check = JSON.parse(localStorage.getItem("addTaskList"));
  if (check) {
    check = [...check, { title: taskInput, description: "" }];
    localStorage.setItem("addTaskList", JSON.stringify(check));
  }else {

  localStorage.setItem("addTaskList", JSON.stringify(addTaskList));
}
}
function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskName = taskInput.value.trim();
  if (taskName !== '') {
    const taskBlock = document.createElement('div');
    taskBlock.className = 'task-block';

    const taskNameBlock = document.createElement('div');
    taskNameBlock.className = 'task-name';
    taskNameBlock.textContent = taskName;
    taskNameBlock.draggable = true;
    taskNameBlock.addEventListener('dragstart', handleDragStart);
    taskNameBlock.innerHTML += '<button class="delete-button">Delete</button>';

    const taskDescriptionBlock = document.createElement('div');
    taskDescriptionBlock.className = 'task-description';

    taskBlock.appendChild(taskNameBlock);
    taskBlock.appendChild(taskDescriptionBlock);

    document.getElementById('taskList').appendChild(taskBlock);
    taskInput.value = '';

    // Attach delete task event listener
    const deleteButton = taskNameBlock.querySelector('.delete-button');
    deleteButton.addEventListener('click', function () {
      taskBlock.remove();
    });

    taskNameBlock.addEventListener('click', function () {
      openModal(taskDescriptionBlock);
    });
  }
}

function openModal(descriptionBlock) {
  const modal = document.getElementById("taskModal");
  const closeModalButton = document.getElementById("closeModal");
  const descriptionTextarea = document.getElementById("descriptionTextarea");
  const saveDescriptionButton = document.getElementById(
    "saveDescriptionButton"
  );

  descriptionTextarea.value = descriptionBlock.textContent;

  modal.style.display = "flex";

  closeModalButton.onclick = function () {
    modal.style.display = "none";
  };

  saveDescriptionButton.onclick = function () {
    descriptionBlock.textContent = descriptionTextarea.value;
    modal.style.display = "none";
  };
}

function handleDragStart(e) {
  e.dataTransfer.setData("text/plain", e.target.textContent);
  e.target.classList.add("dragged");
}

function allowDrop(ev) {
  ev.preventDefault();
}

function handleDrop(ev, targetCardId) {
  ev.preventDefault();
  const taskText = ev.dataTransfer.getData("text/plain");
  const targetCard = document.getElementById(targetCardId);

  if (targetCard) {
    const taskBlock = document.querySelector(".dragged");
    taskBlock.classList.remove("dragged");
    targetCard.appendChild(taskBlock);
  }
}
