const hello = document.querySelector("#hello"),
  nameForm = document.querySelector(".js-inputName")
  nameInput = nameForm.querySelector("input");

const NAME_LS = "name";

function handleSubmit(event) {
  name = nameInput.value;
  hello.innerText = `Hello, ${name}!`;
  localStorage.setItem(NAME_LS, name);
}

function loadName() {
  const currentName = localStorage.getItem(NAME_LS);

  if (currentName !== null) {
    hello.innerText = `Hello, ${currentName}!`;
     
    nameForm.removeChild(nameInput);
  }
}

function init() {
  loadName();
  nameForm.addEventListener("submit", handleSubmit);
}

init();
