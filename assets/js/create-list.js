function createList() {
  var createListSection = document.createElement("div");
  pageBody[0].appendChild(createListSection);
  createListSection.setAttribute("id", "create_list_section");
  createListSection.setAttribute("class", "modal_bg");
  createListSection.innerHTML = `
        <form class="modal_container form_input" autocomplete="off">
            <header class="modal_header">
                <b>Add a list</b>
                <i class="close_btn">&#xe8bb;</i>
            </header>
            <div class="line_dividerX"></div>
            <main class="form_body add_list_body">
                <div class="input_section">
                    <input type="text" id="name_list" class="input_text" placeholder="Enter a name" >
                    <button id="save_btn" disabled>Save</button>
                </div>
                    <p class="form_error hidden">There is an error creating your list.</p>
            </main>
        </form>`;

  var inputField = document.querySelector("#name_list"),
    saveBtn = document.querySelector("#save_btn");

  closeMenu("create_list_section");
  inputField.focus();

  function saveAddList(e) {
    e.preventDefault();

    if (localStorage.getItem("list-last-id") == null) {
      localStorage.setItem("list-last-id", 0);
    }

    localStorage.setItem("list-last-id", parseInt(localStorage.getItem("list-last-id")) + 1);

    const padStartLastId = localStorage.getItem("list-last-id").toString().padStart(4, "0"),
      todos = "#" + padStartLastId + inputField.value.trim().replace(/^\S/, (c) => c.toUpperCase());

    if (localStorage.getItem(todos) == null) {
      localStorage.setItem(todos, "[]");

      saveBtn.setAttribute("disabled", "");

      localStorage.setItem("list-selected", todos);

      loadTodoList();

      eventListContainer();

      document.querySelector(".close_btn").click();
    } else {
      document.querySelector(".form_error").classList.remove("hidden");
    }
  }

  inputField.oninput = () => {
    if (inputField.value == "" || inputField.value.match(/^\s*$/) || inputField.value.length > 32) {
      saveBtn.setAttribute("disabled", "");
    } else {
      saveBtn.removeAttribute("disabled");
    }
  };

  saveBtn.onclick = saveAddList;
}

addListBtn.onclick = createList;

addListBtn2.onclick = createList;
