document.querySelector('.save-notes').addEventListener('click', saveNote);
document.querySelector('.add-notes').addEventListener('click', addNote);

const noteTitle = document.querySelector('.note-title');
const fullNote = document.querySelector('.fullnote');
const noteCollection = document.querySelector('.all-notes');
const searchNotes = document.querySelector('.search-notes');
const clearSearch = document.querySelector('.fa-times-circle');

noteCollection.addEventListener('click', removeNote);

searchNotes.addEventListener('keyup', searchNote);

noteCollection.addEventListener('click', viewNote);

noteCollection.addEventListener('click', clickToActive);

executeByDefault()
function executeByDefault() {
  document.querySelector('.save-notes').style.display = "none";
  // console.log(document.querySelectorAll('.notes'));
  if (document.querySelectorAll('.notes').length === 0) {

    console.log("notes are empty");
  } else {
    console.log("notes are not empty");
  }
  checkEmptyNote();
  disableNoteArea();
}

//check empty note
function checkEmptyNote() {
  if (document.querySelectorAll('.notes').length === 0) {
    document.querySelector('.empty-notes').style.display = "block";
    document.querySelector('.blank-notes').style.display = "block";
  } else {
    document.querySelector('.empty-notes').style.display = "none";
    document.querySelector('.blank-notes').style.display = "none";
  }
}

//disable note area
function disableNoteArea() {
  noteTitle.value = '';
  noteTitle.disabled = true;
  noteTitle.placeholder = 'Click on Add Note';
  fullNote.value = '';
  fullNote.disabled = true;
  fullNote.placeholder = '';
}

//Inactive note area
function inactiveNoteFields() {
  noteTitle.disabled = true;
  fullNote.disabled = true;
}

//active note area
function activeNoteArea() {
  noteTitle.disabled = false;
  noteTitle.placeholder = 'Note title';
  fullNote.disabled = false;;
  fullNote.placeholder = 'Enter note content';
}

//add note
function addNote(e) {
  noteTitle.value = '';
  fullNote.value = '';
  document.querySelector('.save-notes').style.display = "flex";
  document.querySelector('.add-notes').style.display = "none";
  // noteCollection.addEventListener('click',disableAllActiveNotes)
  checkEmptyNote();
  activeNoteArea();
  document.querySelector('.blank-notes').style.display = "none";
}

//save note 
function saveNote(e) {

  if (noteTitle.value === '') {
    alert('Please add title to the note!');
  } else {

    const li = document.createElement('li');
    li.className = 'notes';

    const noteDetails = document.createElement('div');
    noteDetails.className = 'notes-details';

    const noteHeading = document.createElement('h2');
    noteHeading.className = 'note-heading';
    noteHeading.innerHTML = `${noteTitle.value}`;

    const noteContent = document.createElement('p');
    noteContent.className = 'note-time';
    noteContent.textContent = fullNote.value;

    const noteTrash = document.createElement('div')
    noteTrash.className = 'trash'

    noteTrash.innerHTML = `<i class="far fa-trash-alt"></i>`

    document.querySelector('.all-notes').insertBefore(li, document.querySelector('.notes'))

    li.appendChild(noteDetails);
    li.appendChild(noteTrash);
    noteDetails.appendChild(noteHeading);
    noteDetails.appendChild(noteContent);

    // console.log(`${noteTitle.value}`);
    // console.log(`${fullNote.value}`);

    noteTitle.value = '';
    fullNote.value = '';

    //for alert
    let message = "Note has been added!";
    launch_toast(message);
  }
  document.querySelector('.save-notes').style.display = "none";
  document.querySelector('.add-notes').style.display = "flex";

  checkEmptyNote();
  inactiveNoteFields();
  disableNoteArea();
  e.preventDefault();
}


//remove note
function removeNote(e) {
  if (e.target.parentElement.classList.contains('trash')) {
    // console.log(e.target);
    if (confirm('Are you sure?')) {
      // console.log(`${e.target.parentElement.parentElement.innerText} has been deleted!`);
      let message = "Note has been deleted!";
      launch_toast(message)
      e.target.parentElement.parentElement.remove();
      disableNoteArea();
    }
  }
  checkEmptyNote();
}


//view note
function viewNote(e) {
  document.querySelector('.save-notes').style.display = "none";
  document.querySelector('.add-notes').style.display = "flex";
  if (e.target.classList.contains('note-heading')) {
    noteTitle.value = e.target.innerText;
    fullNote.value = e.target.nextElementSibling.innerText;
  } else if (e.target.classList.contains('note-time')) {
    fullNote.value = e.target.innerText;
    noteTitle.value = e.target.previousElementSibling.innerText;
  }
  inactiveNoteFields();
}



//search note
function searchNote(e) {
  clearSearch.addEventListener("click", (e) => {
    document.querySelector('.search-notes').value = '';
  })

  const text = e.target.value.toLowerCase();
  console.log(text);
  document.querySelectorAll('.notes').forEach
    (function (note) {
      const item = note.firstChild.textContent;
      if (item.toLowerCase().indexOf(text) != -1) {
        note.style.display = 'flex';
      } else {
        note.style.display = 'none';
      }
    });
}

//click to active
function clickToActive(e) {
  if (e.target.classList.contains('note-heading') || e.target.classList.contains('note-time')) {
    let current = e.target.parentElement.parentElement;
    current.style.backgroundColor = "#181831";
    current.style.color = "white";
    let nextSibling = current.nextElementSibling;
    let prevSibling = current.previousElementSibling;

    while (nextSibling) {
      // console.log(nextSibling);
      nextSibling.style.backgroundColor = "#eaebfb";
      nextSibling.style.color = "black";
      nextSibling = nextSibling.nextElementSibling;
    }
    while (prevSibling) {
      // console.log(prevSibling)
      prevSibling.style.backgroundColor = "#eaebfb";
      prevSibling.style.color = "black";
      prevSibling = prevSibling.previousElementSibling;
    }
  }
}

//for toast 
function launch_toast(message) {
  var x = document.getElementById("toast");
  var desc = document.getElementById("desc");

  desc.innerText = message;

  x.className = "show";
  setTimeout(function () { x.className = x.className.replace("show", ""); }, 5000);
}



// night mode and dark mode
const check = document.querySelector('.toggle');
check.addEventListener('click', changeColor);

function changeColor() {
  //identifying all the elements
  const sidebar = document.querySelector('.sidebar');
  const noteHeader = document.querySelector('#heading');
  const allNotes = document.querySelectorAll('.notes');
  const noteArea = document.querySelector('.currentnote');
  const noteTitle = document.querySelector('.note-title');
  const fullNote = document.querySelector('.fullnote');

  if (check.checked === true) {
    sidebar.style.backgroundColor = "#121212";
    document.body.style.backgroundColor = "#121212";
    noteHeader.style.color = "white";
    noteArea.style.backgroundColor = "#181831";
    noteTitle.style.color = "white";
    fullNote.style.color = "#eeebdd";
  } else {
    sidebar.style.backgroundColor = "#6435e7";
    document.body.style.backgroundColor = "#6435e7";
    noteHeader.style.color = "white";
    noteArea.style.backgroundColor = "#eaebfb";
    noteTitle.style.color = "black";
    fullNote.style.color = "#58391c";
  }
}
