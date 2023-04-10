function createTask() {
    var createTaskSection = document.createElement("div");
    pageBody[0].appendChild(createTaskSection);
    createTaskSection.setAttribute("id", "create_list_section");
    createTaskSection.setAttribute("class", "modal_bg");
    createTaskSection.innerHTML = `
        <form class="modal_container form_input" autocomplete="off">
            <header class="modal_header">
                <b>Add a task</b>
                <i class="close_btn">&#xe8bb;</i>
            </header>
            <div class="line_dividerX"></div>
            <main class="form_body add_list_body">
                <div class="input_section">
                    <input type="text" id="name_list" class="input_text" placeholder="Enter a name" >
                    <button id="save_btn" disabled>Save</button>
                </div>
                    <p class="form_error hidden">There is an error creating your todo.</p>
            </main>
        </form>`;

    var inputField = document.querySelector("#name_list"),
        saveBtn = document.querySelector("#save_btn");

    closeMenu("create_list_section");
    inputField.focus();

    function saveAddTodo(e) {
        e.preventDefault();

        localStorage.setItem(
            localStorage.getItem("list-selected"),
            JSON.stringify([...JSON.parse(localStorage.getItem(localStorage.getItem("list-selected")) || "[]"),
            { name: inputField.value.trim().replace(/^\S/, (c) => c.toUpperCase()), completed: false }])
        );

        if (document.querySelector("#todo_container") != null) {
            document.querySelector("#todo_container").remove();
        }

        loadTasks();
        
        document.querySelector("#add_task_btn").onclick = createTask;

        document.querySelector(".close_btn").click();
    }

    inputField.oninput = () => {
        if (inputField.value == "" || inputField.value.match(/^\s*$/)) {
            saveBtn.setAttribute("disabled", "");
        } else {
            saveBtn.removeAttribute("disabled");
        }
    };

    saveBtn.onclick = saveAddTodo;
}