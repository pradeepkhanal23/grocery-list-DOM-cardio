//getting all elements first from the DOM using query selector

//Buttons

//-----------------------------DOM Elements-----------------------------------------

//Buttons
const submitBtn = document.querySelector(".btn");

//form Inputs
const itemInput = document.querySelector(".form-input");
const filterInput = document.querySelector(".form-input-filter");

//form
const form = document.querySelector("#item-form");

//list items
const itemList = document.querySelector("ul");

//wrapper
const container = document.querySelector(".container");

//-----------------------------Functions-----------------------------------------------

//----------------Create Element Function-----------------------------------------------------
function createElement(elementType, className = "") {
  const element = document.createElement(elementType);
  element.className = className;
  return element;
}

//----------------Handle Click Functions-----------------------------------------------------
function handleClick(e) {
  e.preventDefault();

  //check for the target button and delete
  if (e.target.tagName === "I" && e.target.classList.contains("fa-xmark")) {
    e.target.parentElement.parentElement.parentElement.remove();
  }
}

//-------------------Clear List Function---------------------------------------------------
function clearList(e) {
  e.preventDefault();

  itemList.innerHTML = "";
}

//----------------Add Item Function-----------------------------------------------------
function addItem(e) {
  e.preventDefault();

  //validating the input
  if (itemInput.value === "") {
    alert("Please Enter an Item");
  } else {
    //creating a list item
    const li = createElement("li");
    const btnContainer = createElement("div", "btn-container");
    const EditButton = createElement("button", "edit-item btn-link text-green");
    const removeButton = createElement(
      "button",
      "remove-item btn-link text-red"
    );
    const removeIcon = createElement("i", "fa-solid fa-xmark");
    const editIcon = createElement("i", "fa-solid fa-pen-to-square");
    const text = document.createTextNode(itemInput.value);

    li.appendChild(text);
    li.appendChild(btnContainer);
    btnContainer.appendChild(removeButton);
    btnContainer.appendChild(EditButton);
    removeButton.appendChild(removeIcon);
    EditButton.appendChild(editIcon);

    itemList.appendChild(li);

    const clearBtn = createElement("button", "btn-clear");
    clearBtn.appendChild(document.createTextNode("Clear All"));

    itemList.insertAdjacentElement("afterend", clearBtn);

    clearBtn.addEventListener("click", () => {
      itemList.innerHTML = "";
    });

    itemInput.value = "";
  }
}

//---------------------------------Event Listeners----------------------------------------

form.addEventListener("submit", addItem);
itemList.addEventListener("click", handleClick);
