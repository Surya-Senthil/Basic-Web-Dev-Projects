const list = document.querySelector("ul");
list.addEventListener("click", function (e) {
  if (e.target.nodeName == "BUTTON") {
    let li = e.target.parentElement;
    list.removeChild(li);
  }
});

const form = document.forms[1];
form.addEventListener("submit", function (e) {
  e.preventDefault();
  let val = form.querySelector("input").value;
  form.querySelector("input").value = "";

  let li = document.createElement("li");
  let name = document.createElement("p");
  let del = document.createElement("button");

  del.textContent = "delete";
  name.textContent = val;

  li.append(name, del);
  list.append(li);
});

const search = document.forms[0].querySelector("input");
search.addEventListener("keyup", function (e) {
  let value = search.value.toLowerCase();
  document.querySelectorAll("li").forEach(function (item) {
    let itemName = item.firstElementChild.textContent.toLowerCase();
    if (itemName.indexOf(value) == -1) item.style.display = "none";
    else item.style.display = "flex";
  });
});
