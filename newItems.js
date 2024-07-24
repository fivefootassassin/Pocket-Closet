const ul = document.getElementById("tag-list");
input = document.getElementById("tag-input");
let itemDataArray = [];
let fitDataArray = [];
let selectedIndex = null;
let itemContent = document.getElementById("item-content");
let itemMenu = document.getElementById("item-menu-container");
let fit = {
 fitName: undefined,
 fitItemData: [],
 colorPallet: [],
 tags: [],
 fitPhoto: undefined,
 fitPhotos: [],
 description: undefined,
 style: undefined,
 lastWorn: undefined,
};
//opens the side nav
function openSideNav() { }
function closeSideNav() { }
function saveProgress() { }

//opens item creation menu 
function addItem() {
 document.getElementById("item-name-menu").value = "";
 document.getElementById("edit-brand").value = "";
 document.getElementById("edit-image").src = "";
 document.getElementById("menu-size").value = "";
 const itemInitMenu = document.getElementById("item-menu-container");
 //display block
 itemInitMenu.style.display = "flex";


}
//opens item edit menu populating data from clicked item 
function viewItem() { }
//closes item menu 
function closeMenu() {
 const menu = document.getElementById("item-menu-container");
 menu.style.display = "none";
}

const imageInput = document.getElementById("imageInput");
const imageElement = document.getElementById("edit-image");

imageElement.addEventListener("dblclick", function () {
 imageInput.click();
});
imageInput.addEventListener('change', async function (event) {
 const file = event.target.files[0];
 const reader = new FileReader();

 reader.onload = function () {
  const imageData = reader.result; // This is the Data URL of the image
  // Store the imageData in LocalStorage
  localStorage.setItem('userImage', imageData);

  // Display the imaged
  imageElement.src = imageData;
 };

 reader.readAsDataURL(file);
});
itemContent.addEventListener("dblclick", function (e) {
 let itemContainer = e.target.closest('.item-container');
 let fitContainer = e.target.closest('.fit-container');

 if (itemContainer) {
  const itemData = itemDataArray[selectedIndex];
  document.getElementById("item-name-menu").value = itemData.itemName;
  document.getElementById("edit-brand").value = itemData.brandName;
  document.getElementById("edit-image").src = itemData.imageSrc;
  document.getElementById("menu-size").value = itemData.itemSize;
  //color array


  //tag array
  const tagInputsContainer = document.getElementById("tags");

  itemData.tagInputs.forEach((tag, i) => {
   addTag(tag);
  });
  itemMenu.style.display = "block";
 }

 if (fitContainer) {
  const fitData = fitDataArray[selectedIndex];
  // document.getElementById("edit-fit-name").value = fitData.fitName;
  console.log("FIT MENU");
  // fitMenu.style.display = "block";
 }
})

itemContent.addEventListener("click", function (e) {
 const itemContainer = e.target.closest('.item-container');
 const fitContainer = e.target.closest(".fit-container");

 if (itemContainer) {
  //console.log(getItemData(itemContainer));
  selectedIndex = Array.from(itemContent.querySelectorAll('.item-container')).indexOf(itemContainer);
  if (e.target.tagName == "SPAN") {
   e.preventDefault();
   itemContainer.remove();
   itemDataArray.splice(selectedIndex, 1);
   selectedIndex = null;
   saveDataArray();
   saveItems();
   console.log(itemDataArray);
  }
 }
 if (fitContainer) {
  // console.log(getFitData(fitContainer));
  selectedIndex = Array.from(itemContent.querySelectorAll('.fit-container')).indexOf(fitContainer);
  if (e.target.tagName == "SPAN") {
   e.preventDefault();
   fitContainer.remove();
   fitDataArray.splice(selectedIndex, 1);
   selectedIndex = null;
   saveDataArray();
   saveItems();
  }
 }
})

let colors = [];
//adds an  other color input
function createColor(e) {
 const colorsList = document.getElementById('color-pallet');

 const span = document.createElement("span");
 span.className = "remove-button";
 span.innerHTML = "x";


 const rmvColorBtn = document.createElement("div");
 rmvColorBtn.id = "remove-color-input";
 rmvColorBtn.className = "remove-button-container";
 rmvColorBtn.setAttribute("onclick", "removeIt(this.parentElement)");

 const color = document.createElement("input");
 color.type = "color";
 color.id = "color";
 color.className = "color";
 // color.style.display = "none";n

 rmvColorBtn.appendChild(span);

 colorsList.appendChild(color);

 color.addEventListener('input', function (event) {
  const selectedColor = event.target.value;
  colors.push(selectedColor); // Add the selected color to the array
  updateColorList();
  colorsList.removeChild(color); // Remove the input element after selection
 });

 color.click();




}

function updateColorList() {
 const colorsList = document.getElementById('color-pallet');
 colorsList.innerHTML = ''; // Clear the existing list
 colors.forEach(color => {
  const listItem = document.createElement('li');
  const colorBox = document.createElement('div');
  colorBox.id = "color";
  colorBox.style.backgroundColor = color;
  listItem.appendChild(colorBox);
  // const colorText = document.createElement('span');
  // colorText.textContent = color;
  // listItem.appendChild(colorText);
  colorsList.appendChild(listItem);
 });
}

document.getElementById('add-item-color').addEventListener('click', createColor);

let tags = ['Default Tag'];
let tagBox = document.getElementById("item-tag-box");
tagBox.onclick = function () {
 input.focus();
};

function createTag() {
 ul.querySelectorAll("li").forEach(li => li.remove());
 const tagInp = document.getElementsByClassName("input-container");
 console.log(tags.slice().reverse());
 tags.forEach(tag => {
  let liTag = document.createElement("li");
  liTag.innerHTML = tag;
  let span = document.createElement("span");
  span.id = "tag-rmv";
  span.className = "hover";
  span.setAttribute("onclick", 'removeIt(this.parentElement)');
  span.innerHTML = "x";



  //removes the tag input
  tagInp[0].remove();
  liTag.appendChild(span);
  ul.appendChild(liTag);
  //add tag input AFTER new tag
  const inpCon = document.createElement("div");
  inpCon.id = "input-container";
  inpCon.className = "input-container";

  const newTagInp = document.createElement("input");

  newTagInp.id = "tag-input";
  newTagInp.className = "search";
  newTagInp.type = "text";
  newTagInp.addEventListener("keyup", addTag);
  inpCon.appendChild(newTagInp);

  ul.appendChild(inpCon);
  newTagInp.focus();
 });
}

function addTag(e) {
 if (e.key == "Enter") {
  let tag = e.target.value.replace(/\s+/g, ' '); //removing unwanted spaces from user tag
  if (tag.length > 1 && !tags.includes(tag)) {
   tag.split(",").forEach(tag => {
    if (ul.childElementCount < 13) {
     tags.push(tag);
     createTag();
    }

   });
  }
  if (ul.childElementCount == 0) {
   input.focus();
  }
  e.target.value = "";
 }
}

input.addEventListener("keyup", addTag);

//removes the thing frontend
function removeIt(e) {

 e.remove();
 console.log(e);



 tagSplit = e.innerHTML.split("<");
 baseTag = tagSplit[0];
 if (tags.includes(baseTag)) {
  tags = tags.filter(e => e !== baseTag);
  console.log(tags);
 }
 saveDataArray();
 saveItems();
};


//creates item from item menu
document.getElementById("create-item").addEventListener("click", function (e) {
 const itemContent = document.getElementById("content");
 const editedItemName = document.getElementById("item-name-menu").value;
 const editedBrand = document.getElementById("edit-brand").value;
 const editedImageSrc = document.getElementById("edit-image").src;
 const editedSize = document.getElementById("menu-size").value;



 if (selectedIndex !== null && selectedIndex !== -1) {
  const itemContainer = itemContent.querySelectorAll('.item-container')[selectedIndex];
  if (itemContainer) {
   //editing an item
   const itemNameElement = itemContainer.querySelector(".item-name");
   const brandNameElement = itemContainer.querySelector(".brand-name");
   const imageElement = itemContainer.querySelector("img");

   itemNameElement.innerText = editedItemName;
   brandNameElement.innerText = editedBrand;
   imageElement.src = editedImageSrc;

   itemDataArray[selectedIndex] = {
    itemName: editedItemName,
    brandName: editedBrand,
    imageSrc: editedImageSrc,
    itemSize: editedSize,
    colorPallet: colors,
    tagInputs: tags,
   };
  }
 } else {
  //making an item
  const newItemData = {
   itemName: editedItemName,
   brandName: editedBrand,
   imageSrc: editedImageSrc,
   itemSize: editedSize,
   colorPallet: colors,
   tagInputs: tags,
  };
  if (editedItemName == "" || editedBrand == "" || editedSize == "") {
   alert("Please fill in all required fields.");
   return;
  }
  displayItem(newItemData, selectedIndex);
  itemDataArray.push(newItemData);
  saveDataArray();
  saveItems();
  loadArrayData();
 }
 itemMenu.style.display = "none";
});


function displayItem(itemData, index) {
 const itemContent = document.getElementById("item-content");
 let itemContainer = document.createElement("div");
 itemContainer.className = "item-container";
 itemContainer.draggable = true;

 let removeContainer = document.createElement("div");
 removeContainer.id = "remove-button-item-container";
 removeContainer.className = "remove-button-container";
 removeContainer.setAttribute("onclick", "removeIt(this.parentElement)");
 let removeSpan = document.createElement("span");
 removeSpan.className = "remove-button";
 removeSpan.innerText = "x";

 removeContainer.appendChild(removeSpan);
 let itemDiv = document.createElement("div");
 itemDiv.className = "item";
 itemDiv.id = "item";


 let itemImgCon = document.createElement("div");
 itemImgCon.id = "item-img-container";
 let image = document.createElement("img");
 image.id = "item-display-img";
 //Item image input
 image.src = itemData.imageSrc;
 image.draggable = false;

 itemImgCon.appendChild(image);
 let itemName = document.createElement("p");
 itemName.id = "item-name";
 itemName.className = "changeable";
 //Item name input
 itemName.innerHTML = itemData.itemName;

 let brandName = document.createElement("p");
 brandName.id = "brand-name";
 // Brand Name Input
 brandName.innerHTML = itemData.brandName;


 itemDiv.appendChild(itemImgCon);
 itemDiv.appendChild(itemName);
 itemDiv.appendChild(brandName);

 itemContainer.appendChild(removeContainer);
 itemContainer.appendChild(itemDiv);
 //itemContent later to be revised as a pram of this func to be more flexible 
 itemContent.appendChild(itemContainer);
 saveItems();
 saveDataArray();
 setupEventListeners();

}

let closestFitContainer;

function displayFit(fitData) {
 const itemContent = document.getElementById("item-content");
 const fitCon = document.createElement("div");
 fitCon.className = "fit-container";

 const rmvContainer = document.createElement("div");
 rmvContainer.id = "remove-button-fit-container";
 rmvContainer.className = "remove-button-container";
 rmvContainer.setAttribute("onclick", "removeIt(this.parentElement)");

 const span = document.createElement("span");
 span.className = "remove-button";
 span.innerText = "x";

 rmvContainer.appendChild(span);

 const fitDiv = document.createElement("div");
 fitDiv.id = "fit";
 fitDiv.className = "fit";

 const irlImg = document.createElement("img");
 irlImg.id = "irl-img";

 //comment added to make changes to branch
 const paraElement = document.createElement("p");
 paraElement.className = "fit-name";
 paraElement.id = "fit-name";
 const fitName = document.createElement("input");
 fitName.className = "fit-name";
 fitName.id = "fit-name";

 fitName.select();
 paraElement.setAttribute("ondblclick", "makeEditable(this.parentNode)");


 fitDiv.appendChild(irlImg);
 fitDiv.appendChild(fitName);
 fitCon.appendChild(rmvContainer);
 fitCon.appendChild(fitDiv);
 itemContent.appendChild(fitCon);

 fitName.focus();
 fitName.select();

 fitDataArray.push(fitData);


 let clickedFitIndex
 fitName.addEventListener('blur', () => {
  const fitContainer = fitName.closest(".fit-container");
  clickedFitIndex = Array.from(itemContent.querySelectorAll('.fit-container')).indexOf(fitContainer);
  console.log(clickedFitIndex);
  const defaultText = `New Fit (${clickedFitIndex + 1})`;
  fitName.value = defaultText;
  if (fitName.value == "") {
   fitDataArray[clickedFitIndex].fitName = defaultText;
   fitName.value = defaultText;

  }



  saveItems();
  saveDataArray();
 });
}


function setupEventListeners() {
 let draggedItemContainer;
 const itemContainers = document.querySelectorAll(".item-container");
 const fitContainers = document.querySelectorAll(".fit-container");

 itemContainers.forEach(itemContainer => {
  itemContainer.addEventListener("dragstart", function (e) {
   draggedItemContainer = e.target.closest('.item-container');
   itemData = getItemData(draggedItemContainer);

   e.dataTransfer.setData("application/json", JSON.stringify(itemData));

  });

  itemContainer.addEventListener("dragover", function (e) {
   e.preventDefault();
  });

  itemContainer.addEventListener("drop", function (e) {
   e.preventDefault();
   e.stopPropagation();
   // loadArrayData();
   const data = e.dataTransfer.getData("application/json");

   const draggedItemData = data ? JSON.parse(data) : null;

   const targetItemContainer = e.target.closest(".item-container");
   if (targetItemContainer && draggedItemData) {
    // fitDataArray.push(fit);
    // fit["fitItemData"].push(draggedItemData);
    // fit["fitPhotos"].push(draggedItemData.imageSrc);
    // fit["fitItemData"].push(getItemData(targetItemContainer));
    // fit["fitPhotos"].push(getItemData(targetItemContainer).imageSrc);
    // console.log(fit.fitItemData);


    displayFit();
    // const editedFitName = document.getElementById("fit-name").value;
    // fit["fitName"] = editedFitName;

   }
   saveItems();
   saveDataArray();
  });
 });

 fitContainers.forEach(fitContainer => {
  fitContainer.addEventListener("dragstart", function (e) {
   // console.log("Drag start event triggered");
   draggedItemContainer = e.target.closest('.item-container');
   console.log(draggedItemContainer);
   itemData = getItemData(draggedItemContainer);

   e.dataTransfer.setData("application/json", JSON.stringify(itemData));

  });

  fitContainer.addEventListener("dragover", function (e) {
   // console.log("dragover");
   e.preventDefault();
  });

  fitContainer.addEventListener("drop", function (e) {
   console.log("Event Listener");

   e.preventDefault();
   const data = e.dataTransfer.getData("application/json");
   const dragItemData = data ? JSON.parse(data) : null;

   const targetFitContainer = e.target.closest(".fit-container");
   if (targetFitContainer && dragItemData) {
    //console.log("Target Fit Contaianer", targetFitContainer);
    const clickedFitIndex = Array.from(itemContent.querySelectorAll('.fit-container')).indexOf(targetFitContainer);
    if (clickedFitIndex !== -1) {
     fitDataArray[clickedFitIndex]["fitItemData"].push(dragItemData)
     const fitData = getFitData(targetFitContainer);
     fitData["fitPhotos"].push(dragItemData.imageSrc);

     fIC = document.getElementsByClassName("fit-item-con")[clickedFitIndex];
     tImage = fIC.childNodes[2];
     fImage = fIC.childNodes[3];

     if (fitDataArray[clickedFitIndex]["fitItemData"].length == 3) {
      tImage.src = fitData.fitItemData[2].imageSrc;
     }

     if (fitDataArray[clickedFitIndex]["fitItemData"].length == 4) {
      fImage.src = fitData.fitItemData[3].imageSrc;
     }

    }
    saveDataArray();
    saveItems();


   }
   saveDataArray();
   saveItems();
  });
 });
 saveItems();
 saveDataArray();
}

function getFitData(fitContainer) {
 const index = Array.from(itemContent.querySelectorAll('.fit-container')).indexOf(fitContainer);
 console.log("Fit: ", index);
 console.log(fitDataArray);
 if (index >= 0 && index < fitDataArray.length) {
  return fitDataArray[index];
 } else {
  return null;
 }
}

function getItemData(itemContainer) {
 const index = Array.from(itemContent.querySelectorAll('.item-container')).indexOf(itemContainer);
 // console.log("Item: ", index);
 if (index >= 0 && index < itemDataArray.length) {
  return itemDataArray[index];
 } else {
  return null;
 }
}


function saveItems() {
 localStorage.setItem('data', itemContent.innerHTML);
 console.log("Items Saved");
}

function loadItems() {
 itemContent.innerHTML = localStorage.getItem('data');
}

function saveDataArray() {
 localStorage.setItem('itemDataArray', JSON.stringify(itemDataArray));
 localStorage.setItem('fitDataArray', JSON.stringify(fitDataArray));
}

function loadArrayData() {
 try {
  if (localStorage.getItem('itemDataArray') || localStorage.getItem('fitDataArray')) {
   itemDataArray = JSON.parse(localStorage.getItem('itemDataArray') || '[]');
   fitDataArray = JSON.parse(localStorage.getItem('fitDataArray') || '[]');
  }
 } catch (error) {
  console.error("Error parsing JSON data:", error);
 }
}



document.addEventListener("DOMContentLoaded", function () {
 setupEventListeners();
});

loadArrayData();
loadItems();
















//makes a fit
function addFit() {

}



