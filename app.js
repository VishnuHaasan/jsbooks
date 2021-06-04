let addbook = document.getElementById("bookbtn");
addbook.addEventListener("click",bookAdder);
let form = document.getElementById("form");
form.style.display = "none";
let submit = document.getElementById("subbook");
let books = [];
submit.addEventListener("click",createBook);
function createBook(){
  let author = document.getElementById("author").value;
  let title = document.getElementById("title").value;
  let pages = document.getElementById("pages").value;
  let radio = radioValidator();
  if(formValidate(author,title,pages) && radio!="nocheck"){
    let newBook = new Book(author,title,pages,radio);
    books.push(newBook);
    createChildren(newBook);
    console.log(newBook);
  }
  else{
    submit.style.backgroundColor = "red";
  }
}

function deleteElement(event){
  let parent = event.target.parentNode;
  let children = parent.childNodes;
  let hash = "";
  for(var i = 0;i < 3;i++){
    console.log(children[i].textContent);
    hash = hash + children[i].textContent;
  }
  for(var i = 0;i<books.length;i++){
    if(books[i].hash == hash){
      books.splice(i,1);
      break;
    }
  }
  parent.remove();
  resetInput();
}

function readToggler(event){
  let ele = event.target;
  if(ele.style.backgroundColor == "red"){
    ele.style.backgroundColor = "green";
  }
  else{
    ele.style.backgroundColor = "red";
  }
}
function createChildren(Obj){
  let parent = document.getElementById("books");
  let firstChild = document.createElement("div");
  firstChild.classList.add("bookele");
  let title = document.createElement("p");
  title.textContent = Obj.title;
  let author = document.createElement("p");
  author.textContent = Obj.author;
  let pages = document.createElement("p");
  pages.textContent = Obj.pages;
  let readButton = document.createElement("button");
  if(Obj.read === "Y"){
    readButton.style.backgroundColor = "green";
  }
  else{
    readButton.style.backgroundColor = "red"
  }
  readButton.innerHTML = "Read";
  let deleteButton = document.createElement("button");
  deleteButton.innerHTML = "Delete";
  deleteButton.addEventListener("click",deleteElement);
  readButton.addEventListener("click",readToggler);
  firstChild.appendChild(title);
  firstChild.appendChild(author);
  firstChild.appendChild(pages);
  firstChild.appendChild(readButton);
  firstChild.appendChild(deleteButton);
  parent.appendChild(firstChild);
}

function resetInput(){
  document.getElementById("author").value = "";
  document.getElementById("title").value = "";
  document.getElementById("pages").value = "";  
  let rad = document.getElementsByName("read");
  for(var i = 0;i<rad.length;i++){
    if(rad[i].checked){
      rad[i].checked = false;
    }
  }
}
function Book(author,title,pages,read){
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
  this.hash = title + author + pages;
}

function bookAdder(){
  displayToggler();
}

function displayToggler(){
  if(form.style.display == "none")
  form.style.display = "block";
  else
  form.style.display = "none";
}

function radioValidator(){
  let rad = document.getElementsByName("read");
  for(var i = 0;i<rad.length;i++){
    if(rad[i].checked){
      return rad[i].value;
    }
  }
  return "nocheck";
}

function formValidate(author,title,pages){
  if(author && title && pages){
    return true;
  }
  return false;
}