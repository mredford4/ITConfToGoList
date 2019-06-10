import "./style.css";

const app = document.getElementById("app");
const list = document.getElementById("list");
const entry_box = document.getElementById("entry_box");
const add_btn = document.getElementById("add_btn");

var items;

const handleDelete = evt => {
  var num_selected = Number(evt.target.id.slice(3));
  items.splice(num_selected, 1);
  saveData();
  displayList();
};
const removeListeners = () => {
  var del_btns = document.getElementsByClassName("del_btn");
  for (const btn of del_btns) {
    btn.removeEventListener("click", handleDelete);
  }
};

const addListeners = () => {
  var del_btns = document.getElementsByClassName("del_btn");
  for (const btn of del_btns) {
    btn.addEventListener("click", handleDelete);
  }
};

const displayList = () => {
  removeListeners();
  var contents = "";
  items.forEach((item, index) => {
    var name = `<td>${item.name}</td>`;
    var delete_btn = `<td id='del${index}' class='btn del_btn fas fa-trash-alt'></td>`;
    contents += `<tr>${name}${delete_btn}</tr>`;
  });
  list.innerHTML = contents;
  addListeners();
};

const addItem = evt => {
  var new_item = {
    name: entry_box.value,
    completed: false
  };
  items.push(new_item);
  saveData();
  entry_box.value = "";
  displayList();
};

const saveData = () => {
  localStorage.setItem("list", JSON.stringify(items));
};

const loadData = () => {
  items = JSON.parse(localStorage.getItem("list"));
  if (items === null) {
    items = [];
  }
  displayList();
};

loadData();

add_btn.addEventListener("click", addItem);
document.addEventListener("keypress", evt => {
  if (evt.keyCode == 13) {
    addItem();
  }
});
