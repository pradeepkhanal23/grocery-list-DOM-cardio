//-----------------------------DOM Elements-----------------------------------------
const submitBtn = document.querySelector(".btn");
const clearBtn = document.querySelector(".btn-clear");
const itemInput = document.querySelector(".form-input");
const filterInput = document.querySelector(".form-input-filter");
const form = document.querySelector("#item-form");
const itemList = document.querySelector("#item-list");

//----------------Create Element Function-----------------------------------------------------
function createElement(elementType, className = "") {
  const element = document.createElement(elementType);
  element.className = className;
  return element;
}

//----------------Create List Item Element(li) with its associated classes and buttons inside it and add it to the unordered list----------------------------------------------------------------------------------
function createLiElement(LiTextContent) {
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
  itemList.appendChild(li);
}

//----------------Delete Function-----------------------------------------------------
function removeItem(e) {
  e.preventDefault();

  //check for the target button and delete
  if (e.target.tagName === "I" && e.target.classList.contains("fa-xmark")) {
    if (confirm("Are you sure??"))
      e.target.parentElement.parentElement.parentElement.remove();
  }

  //check again for UI change as we made a change in the list(i.e removed a data)
  updateUI();
}

//-------------------Clear Items Function---------------------------------------------------
function clearItems(e) {
  e.preventDefault();

  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  //check again for UI change as we made a change in the list(i.e cleared all data)
  updateUI();
}

//----------------Add Item Function-----------------------------------------------------
function addItem(e) {
  //preventing default behavoiur
  e.preventDefault();

  //validating the input
  if (itemInput.value === "") {
    alert("Please Enter an Item");
  } else {
    createLiElement(itemInput.value);
    itemInput.value = "";

    //check again for UI, as we made a change in the list(i.e added a data)
    updateUI();
  }
}

function filterItems(e) {
  e.preventDefault();

  const filterText = e.target.value.toLowerCase();
  const items = itemList.querySelectorAll("li");

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();
    if (itemName.includes(filterText)) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

/* function to check UI after page load to make sure we need to display filter input and clear all button to make it look more dynamic */

function updateUI() {
  /* dynamically load the length of the li in real time to handle the UI state of filter input and clear button as it depends on the length of the listItem  */

  const items = itemList.querySelectorAll("li");
  if (items.length === 0) {
    clearBtn.style.display = "none";
    filterInput.style.display = "none";
  } else {
    clearBtn.style.display = "block";
    filterInput.style.display = "block";
  }
}

//---------------------------------Event Listeners----------------------------------------

/* adding all the event listeners inside DOMContentLoaded event listener, to ensure that the DOM elements which we  are trying to interact with in our JavaScript code actually exist.  */
document.addEventListener("DOMContentLoaded", () => {
  form.addEventListener("submit", addItem);
  itemList.addEventListener("click", removeItem);
  clearBtn.addEventListener("click", clearItems);
  filterInput.addEventListener("input", filterItems);
  updateUI();
});
