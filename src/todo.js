const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  pendingList = document.querySelector(".js-pendingList"),
  finishedList = document.querySelector(".js-finishedList");

const PENDINGS_LS = "pendings",
  FINISHED_LS = "finished";

let pendings = [],
  finished = [];

function deletePending(event) {
  const btn = event.target;
  const tr = btn.parentNode;
  pendingList.removeChild(tr);
  const cleanToDos = pendings.filter(function (pending) {
    return pending.id !== parseInt(tr.id);
  });
  pendings = cleanToDos;
  savePendings();
}

function deleteFinished(event) {
  const btn = event.target;
  const tr = btn.parentNode;
  finishedList.removeChild(tr);
  const cleanToDos = finished.filter(function (finished) {
    return finished.id !== parseInt(tr.id);
  });
  finished = cleanToDos;
  saveFinished();
}

function savePendings() {
  localStorage.setItem(PENDINGS_LS, JSON.stringify(pendings));
}

function saveFinished() {
  localStorage.setItem(FINISHED_LS, JSON.stringify(finished));
}

function pendingToFinished(event) {
  const btn = event.target;
  const tr = btn.parentNode;
  deletePending(event);
  paintFinished(tr.querySelector("span").innerText);
}

function finishToPending(event) {
  const btn = event.target;
  const tr = btn.parentNode;
  deleteFinished(event);
  paintPending(tr.querySelector("span").innerText);
}

function paintPending(text) {
  const tr = document.createElement("tr");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const chkBtn = document.createElement("button");
  const newId = pendings.length + 1;
  span.innerText = text;
  delBtn.innerText = "Delete";
  delBtn.addEventListener("click", deletePending);
  chkBtn.innerText = "Finished";
  chkBtn.addEventListener("click", pendingToFinished);
  tr.appendChild(span);
  tr.appendChild(delBtn);
  tr.appendChild(chkBtn);
  tr.id = newId;
  pendingList.appendChild(tr);
  const toDoObj = {
    text: text,
    id: newId
  };
  pendings.push(toDoObj);
  savePendings();
}

function paintFinished(text) {
  const tr = document.createElement("tr");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const chkBtn = document.createElement("button");
  const newId = finished.length + 1;
  span.innerText = text;
  delBtn.innerText = "Delete";
  delBtn.addEventListener("click", deleteFinished);
  chkBtn.innerText = "To do";
  chkBtn.addEventListener("click", finishToPending);
  tr.appendChild(span);
  tr.appendChild(delBtn);
  tr.appendChild(chkBtn);
  tr.id = newId;
  finishedList.appendChild(tr);
  const toDoObj = {
    text: text,
    id: newId
  };
  finished.push(toDoObj);
  saveFinished();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintPending(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedPendings = localStorage.getItem(PENDINGS_LS);
  if (loadedPendings !== null) {
    const parsedToDos = JSON.parse(loadedPendings);
    parsedToDos.forEach(function (toDo) {
      paintPending(toDo.text);
    });
  }
  const loadedFinished = localStorage.getItem(FINISHED_LS);
  if (loadedFinished !== null) {
    const parsedFinished = JSON.parse(loadedFinished);
    parsedFinished.forEach(function (toDo) {
      paintFinished(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
