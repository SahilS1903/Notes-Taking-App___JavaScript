function saveNotes() {
  const notes = document.querySelectorAll("textarea");
  const data = [];
  notes.forEach((note) => {
    data.push(note.value);
  });
  if (data.length == 0) {
    localStorage.removeItem("notes");
  } else {
    localStorage.setItem("notes", JSON.stringify(data));
  }
}

function addNote(text = "") {
  const note = document.createElement("div");
  note.classList.add("container");
  note.innerHTML = `<div class="header">
            <i class="trash fa-solid fa-trash"></i>
            <i class="save fa-solid fa-floppy-disk"></i>
        </div>
        <textarea id="textarea" placeholder="Add your content">${text}</textarea>`;

  note.querySelector(".trash").addEventListener("click", function () {
    note.remove();
    saveNotes();
  });

  note.querySelector(".save").addEventListener("click", function () {
    saveNotes();
  });
  note.querySelector("textarea").addEventListener("focusout", () => {
    saveNotes(); // Save notes immediately when a note is edited
  });

  document.body.appendChild(note);
  saveNotes(); // Save notes immediately when a new note is added
}

const addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", function () {
  addNote();
});

// Immediately invoked function to load notes from localStorage
(function () {
  const lsnotes = JSON.parse(localStorage.getItem("notes"));
  if (lsnotes === null) {
    addNote();
  } else {
    lsnotes.forEach((lsnote) => {
      addNote(lsnote);
    });
  }
})();
