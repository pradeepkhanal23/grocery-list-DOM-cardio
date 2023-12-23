//-----------------------------DOM Elements-----------------------------------------
const submitBtn = document.querySelector(".btn");
const itemInput = document.querySelector(".form-input");
const filterInput = document.querySelector(".form-input-filter");
const form = document.querySelector("#item-form");
const itemList = document.querySelector("ul");
const container = document.querySelector(".container");

//----------------Create Element Function-----------------------------------------------------
function createElement(elementType, className = "") {
  const element = document.createElement(elementType);
  element.className = className;
  return element;
}

function appendToUI(li) {
  itemList.innerHTML = "";
  itemList.appendChild(li);
}

//----------------Create List Item(li) Function and append to UL-----------------------------------------------------
function createLi(LiTextContent) {
  const li = createElement("li");
  const btnContainer = createElement("div", "btn-container");
  const EditButton = createElement("button", "edit-item btn-link text-green");
  const removeButton = createElement("button", "remove-item btn-link text-red");
  const removeIcon = createElement("i", "fa-solid fa-xmark");
  const editIcon = createElement("i", "fa-solid fa-pen-to-square");
  const text = document.createTextNode(LiTextContent);

  li.appendChild(text);
  li.appendChild(btnContainer);
  btnContainer.appendChild(removeButton);
  btnContainer.appendChild(EditButton);
  removeButton.appendChild(removeIcon);
  EditButton.appendChild(editIcon);

  addToUL(li);
}

function addToUL(li) {
  itemList.appendChild(li);
}

/* Function to handle all the UI related Operation of inserting or deleting elements based on certain actions  */
function updateUI() {
  //adding clear all button after a list item is added to the list
  if (!document.querySelector(".btn-clear")) {
    const clearBtn = createElement("button", "btn-clear");
    clearBtn.appendChild(document.createTextNode("Clear All"));
    itemList.insertAdjacentElement("afterend", clearBtn);
    clearBtn.addEventListener("click", clearList);
  }

  /* if after deleting , the last li is deleted, it checks the child element count and remove the clear all button if there is no any li left*/
  if (itemList.childElementCount < 1) {
    document.querySelector(".btn-clear").remove();
  }
}

//----------------Handle Click Function-----------------------------------------------------
function handleClick(e) {
  e.preventDefault();

  //check for the target button and delete
  if (e.target.tagName === "I" && e.target.classList.contains("fa-xmark")) {
    e.target.parentElement.parentElement.parentElement.remove();
  }

  updateUI();
}

//----------------Handle Filter Function-----------------------------------------------------
function handleFilter(e) {
  if (document.querySelectorAll("li").length !== 0) {
    const items = Array.from(document.querySelectorAll("li"));
    const targetLi = items
      .map((item) => {
        return item;
      })
      .filter((item) => {
        if (item.textContent.includes(e.target.value)) {
          return item;
        }
      })
      .map((item) => {
        appendToUI(item);
      });
  }
}

//-------------------Clear List Function---------------------------------------------------
function clearList(e) {
  e.preventDefault();

  itemList.innerHTML = "";
  e.target.remove();
}

//----------------Add Item Function-----------------------------------------------------
function addItem(e) {
  e.preventDefault();

  //validating the input
  if (itemInput.value === "") {
    alert("Please Enter an Item");
  } else {
    createLi(itemInput.value);

    updateUI();

    itemInput.value = "";
  }
}

//---------------------------------Event Listeners----------------------------------------

form.addEventListener("submit", addItem);
itemList.addEventListener("click", handleClick);
filterInput.addEventListener("input", handleFilter);
