//-----------------------------DOM Elements----------------------------------------------------------
const submitBtn = document.querySelector(".btn");
const clearBtn = document.querySelector(".btn-clear");
const itemInput = document.querySelector(".form-input");
const filterInput = document.querySelector(".form-input-filter");
const form = document.querySelector("#item-form");
const itemList = document.querySelector("#item-list");
let editMode = false;

//----------------Create Element Function------------------------------------------------------------
function createElement(elementType, className = "") {
  const element = document.createElement(elementType);
  element.className = className;
  return element;
}

//----------------Creating a new List Item and adding to the unordered list--------------------------
function addToDOM(newLi) {
  const li = createElement("li");
  const btnContainer = createElement("div", "btn-container");
  const EditButton = createElement("button", "edit-item btn-link text-green");
  const removeButton = createElement("button", "remove-item btn-link text-red");
  const removeIcon = createElement("i", "fa-solid fa-xmark");
  const editIcon = createElement("i", "fa-solid fa-pen-to-square");
  const text = document.createTextNode(newLi);
  li.appendChild(text);
  li.appendChild(btnContainer);
  btnContainer.appendChild(removeButton);
  btnContainer.appendChild(EditButton);
  removeButton.appendChild(removeIcon);
  EditButton.appendChild(editIcon);
  itemList.appendChild(li);
}

//-------------fetching and displaying the item from local storage-----------------------
function displayListItems() {
  const items = getLocalStorageItems();

  items.forEach((item) => {
    addToDOM(item);
  });
}

//-------------------Delete from Local Storage--------------------------------------------
function removeItemFromLocalStorage(itemToDelete) {
  //fetching items from the storage
  let itemsFromStorage = getLocalStorageItems();

  //filtering the items using filter method
  itemsFromStorage = itemsFromStorage.filter((item) => {
    return item !== itemToDelete;
  });

  //updating the local storage with filtered items
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

//----------------Delete Function-----------------------------------------------------
function removeItem(item) {
  if (confirm("Are you sure wanna delete the item??")) {
    //remove from the DOM
    item.remove();

    //remove from localStorage
    removeItemFromLocalStorage(item.textContent);
  }
}

//------------------Edit click function----------------------------------------------
function onEditClick(itemToEdit) {
  items = document.querySelectorAll("li").forEach((li) => {
    li.classList.remove("edit-mode");
  });

  itemToEdit.classList.add("edit-mode");
  submitBtn.style.backgroundColor = "green";
  submitBtn.innerHTML = `<i class="fa-solid fa-pen"> </i>  Update Item`;
  itemInput.value = itemToEdit.textContent;
}

//-------------------Handle Delete Click Function-------------------------------------
function onDeleteAndEditClick(e) {
  e.preventDefault();

  //check for the target button and delete
  if (e.target.tagName === "I" && e.target.classList.contains("fa-xmark")) {
    removeItem(e.target.parentElement.parentElement.parentElement);
  }
  if (
    e.target.tagName === "I" &&
    e.target.classList.contains("fa-pen-to-square")
  ) {
    editMode = true;
    onEditClick(e.target.parentElement.parentElement.parentElement);
  }

  //check again for UI change as we made a change in the list(i.e removed a data)
  updateUI();
}

//-----------------Clearing from local storage----------------------------------------
function clearFromLocalStorage() {
  localStorage.removeItem("items");
}

//-------------------Clear Button Handle Function---------------------------------------------------
function onClearBtnClick(e) {
  e.preventDefault();

  //clear from the DOM
  if (confirm("You sure you want to clear all the items???")) {
    while (itemList.firstChild) {
      itemList.removeChild(itemList.firstChild);
    }
  }

  //clear from the local Storage
  clearFromLocalStorage();

  //check again for UI change as we made a change in the list(i.e cleared all data)
  updateUI();
}

//-------------------Filter Items Function---------------------------------------------------
function filterItems(e) {
  e.preventDefault();

  //converting both the text contents to lowercase in order to avoid case sensitive issues while filtering
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

//----------------Add Item Submit Function-----------------------------------------------------
function addItemSubmit(e) {
  //preventing default behavoiur
  e.preventDefault();

  const newItem = itemInput.value;

  //validating the input
  if (newItem === "") {
    alert("Please Enter an Item");
    return;
  }

  //check for edit mode
  if (editMode) {
    //we are removing the the edit item completely and adding the updated item as a new item in the DOM and UI

    //selecting the li with the class of edit mode
    const itemToEdit = itemList.querySelector(".edit-mode");

    //removing it from the local storage
    removeItemFromLocalStorage(itemToEdit.textContent);

    //removing the edit mode class as well as it is being deleted
    itemToEdit.classList.remove("edit-mode");

    //removing the item from the DOM finally
    itemToEdit.remove();

    //bringing back the original add item state after hitting enter
    submitBtn.innerHTML = `<i class="fa-solid fa-plus"></i> Add Item`;
    submitBtn.style.backgroundColor = "#333";

    //toggling the edit mode as our edit is finised
    editMode = false;
  } else {
    /* the duplicate check is added as an else to edit mode because in edit mode when we click edit mode and try to submit again without editing the item , the duplicate fucntion will stop it from being added to the list so when we check for duplicate in the else state of edit mode, it bypasses that check and helps us to add the item to list list which was intended to edit and not edited and submitted back as it is*/
    ///checking for duplicates
    if (checkForDuplicates(newItem)) {
      alert("Item already exists");
      return;
    }
  }

  //adding item to the DOM and assigning associated classes and buttons with their respective classes
  addToDOM(newItem);

  //adding item to the local storage
  addItemToLocalStorage(newItem);

  //check again for UI, as we made a change in the list(i.e added a data)
  updateUI();

  //clearing the input content = ""
  itemInput.value = "";
}

//checking for duplicates function
function checkForDuplicates(item) {
  const existingItems = new Set(getLocalStorageItems()); //using Set for unique value and faster lookups
  return existingItems.has(item.toLowerCase());
}

//adding the item to the local storage
function addItemToLocalStorage(newItem) {
  const itemsFromLocalStorage = getLocalStorageItems();

  //now we push the new item to the extracted array of items
  itemsFromLocalStorage.push(newItem);

  //finally the maniplated final array is Stringified again and push to the local storage under the same key i .e "items"
  localStorage.setItem("items", JSON.stringify(itemsFromLocalStorage));
}

//getting the items from the local storage on page load
function getLocalStorageItems() {
  let itemsFromLocalStorage;

  if (localStorage.getItem("items") === null) {
    //setting up and empty array if there is no any "items" key , to store values later on
    itemsFromLocalStorage = [];
  } else {
    //if there is any items present, we parse and  pop it out to a varaible to perform some array methods
    itemsFromLocalStorage = JSON.parse(localStorage.getItem("items"));
  }

  return itemsFromLocalStorage;
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
  form.addEventListener("submit", addItemSubmit);
  itemList.addEventListener("click", onDeleteAndEditClick);
  clearBtn.addEventListener("click", onClearBtnClick);
  filterInput.addEventListener("input", filterItems);
  displayListItems();
  updateUI();
});
