// ############################################
// #           Variables Section              #
// ############################################
var pageHeader = document.getElementById("header"),
    headerTime = document.getElementById("time"),
    headerDate = document.getElementById("date"),
    greetings = document.getElementById("greetings"),
    accountProfile = document.getElementById("account_profile"),
    accountPicture = document.getElementById("account_picture"),
    username = document.getElementById("username"),
    pageBody = document.getElementsByTagName("body"),
    pageHtml = document.getElementsByTagName("html"),
    editUserBtn = document.getElementsByClassName("setting_edit_user_btn"),
    settings = document.getElementById("settings"),
    aboutProject = document.getElementById("about_project"),
    wallpaper = ["https://wallpaperaccess.com/full/1779187.jpg",
                "https://wallpaperaccess.com/full/2027653.jpg",
                "https://wallpaperaccess.com/full/1779176.jpg",
                "https://wallpaperaccess.com/full/218253.jpg",
                "https://wallpaperaccess.com/full/148421.jpg",
                "https://wallpaperaccess.com/full/53106.jpg"],
    lsUsername = localStorage.getItem("username"),
    lsProfile = localStorage.getItem("profile"),
    addListBtn = document.getElementById("add_list_btn"),
    addListBtn2 = document.getElementById("add_list_btn2"),
    todoTaskSection = document.getElementById("todo_section"),
    listContainer = document.getElementById("list_container"),
    listName = document.getElementsByClassName("list_name"),
    listsContainer = document.getElementsByClassName("list_container"),
    menuBtn = document.getElementById("menu_btn"),
    mobileElmnt = document.getElementsByClassName("mobile_menu");

// ############################################
// #            Startup Section               #
// ############################################
function bgImage(elmnt) {
    if (localStorage.getItem("backgroundImage") == null) {
        elmnt.style.backgroundImage = `url(${wallpaper[0]})`;
    } else {
        elmnt.style.backgroundImage = `url(${localStorage.getItem("backgroundImage")})`;
    }
}

function clock() {
    var time = new Date(),
        hours = time.getHours(),
        minutes = String(time.getMinutes()).padStart(2, "0"),
        day = time.getDay(),
        month = time.getMonth(),
        date = time.getDate(),
        hours12Format = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        dayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    if (JSON.parse(localStorage.getItem("24hour")) === true) {
        headerTime.innerText = hours + ":" + minutes;
    } else {
        headerTime.innerText = hours12Format[hours] + ":" + minutes;
    }
    headerDate.innerText = dayArray[day] + ", " + monthArray[month] + " " + date;
    if (hours >= 6 && hours <= 11) {
        greetings.innerText = "Good morning,";
    } else if (hours >= 12 && hours <= 17) {
        greetings.innerText = "Good afternoon,";
    } else {
        greetings.innerText = "Good evening,";
    }
}

bgImage(pageHeader);
clock();
setInterval(clock, 1000);

function defaultProfilePicture(elmnt, n, more) {
    elmnt.innerHTML = `
    <svg height="${n}" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M163.786 104.571C163.786 124.434 147.44 140.643 127.143 140.643C106.846 140.643 90.5 124.434 90.5 104.571C90.5 84.7089 106.846 68.5 127.143 68.5C147.44 68.5 163.786 84.7089 163.786 104.571Z" stroke="currentColor" stroke-width="9"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M175.137 192.15C174.831 166.14 153.651 145.15 127.569 145.15C101.486 145.15 80.3067 166.14 80.0005 192.15H71C71.3066 161.17 96.5158 136.15 127.569 136.15C158.621 136.15 183.831 161.17 184.137 192.15H175.137Z" fill="currentColor"/>
    </svg>${more}`;
}

function updateUser() {
    if (lsProfile != null) {
        accountProfile.innerHTML = `<img id="account_picture" src="data:image/png;base64,${lsProfile}" alt="User Profile">`;
    } else {
        defaultProfilePicture(accountProfile, 42, "");
    }
    if (lsUsername != null) {
        username.innerText = lsUsername;
    } else {
        username.innerText = "Account Name";
    }
}

updateUser();

function checkThemeMode() {
    if (localStorage.getItem("darkmode") != null) {
        pageHtml[0].setAttribute("darkmode", localStorage.getItem("darkmode"));
    }
    document.documentElement.style.setProperty("--accentColor", localStorage.getItem("accentColor"));
    document.documentElement.style.setProperty("--accentText", localStorage.getItem("accentText"));
}

checkThemeMode();

if (Object.keys(localStorage).some(key => key.startsWith("#"))) {
    listContainer.innerHTML = "";
    var keys = Object.keys(localStorage);
    keys.sort();
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (key.startsWith("#")) {
            if (localStorage.getItem(localStorage.getItem("list-selected")) == null) {
                localStorage.setItem("list-selected", key)
            }
            if (localStorage.getItem("list-selected") == key) {
                listContainer.innerHTML += `
                <div class="list_container list_active" id="${key.substring(0, 5)}">
                    <div class="list_color"></div>
                    <p class="list_name">${key.substring(5)}</p>
                </div>`;
            } else {
                listContainer.innerHTML += `
                <div class="list_container" id="${key.substring(0, 5)}">
                    <p class="list_name">${key.substring(5)}</p>
                </div>`;
            }
        }
    }
    todoTaskSection.innerHTML = `
        <section class="todo_header_container">
            <h1 class="todo_header_title">${localStorage.getItem("list-selected").substring(5)}</h1>
            <div class="list_footer_group">
            	<i class="icon_btns" onclick="menuTodo('block', 'flex')">&#xe712;</i>
                <div class="modal_bg_transparent" onclick="menuTodo('none', 'none')"></div>
                <ul id="todo_menu_container">
                    <li onclick="renameTodo()"><i>&#xe8ac;</i>Rename</li>
                    <li onclick="deleteTodo()"><i>&#xe74d;</i>Delete</li>
                </ul>
            </div>
        </section>
        <div class="line_dividerX"></div>
        <button id="add_task_btn"><i>&#xe710;</i>Add a task</button>
    `;
    function menuTodo(a, b) {
        document.getElementsByClassName('modal_bg_transparent')[0].style.display = a;
        document.getElementById('todo_menu_container').style.display = b;
    }
    function renameTodo() {
        menuTodo('none', 'none');
        var renameTodoSection = document.createElement("div");
        addListBtn.setAttribute("disabled", "");
        addTaskBtn.setAttribute("disabled", "");
        pageBody[0].appendChild(renameTodoSection);
        renameTodoSection.setAttribute("id", "create_list_section");
        renameTodoSection.setAttribute("class", "modal_bg");
        renameTodoSection.innerHTML = `
            <form class="modal_container form_input" autocomplete="off">
                <header class="modal_header">
                    <b>Rename</b>
                    <i class="close_btn">&#xe8bb;</i>
                </header>
                <div class="line_dividerX"></div>
                <main class="form_body add_list_body">
                    <div class="input_section">
                        <input autofocus type="text" id="name_list" class="input_text" placeholder="Enter a name" value="${localStorage.getItem("list-selected").substring(5)}">
                        <button id="save_btn" disabled>Save</button>
                    </div>
                        <p class="form_error" style="display: none">There is an error creating your todo.</p>
                </main>
            </form>`;
        document.getElementsByClassName("close_btn")[0].onclick = () => {
            document.getElementById("create_list_section").remove();
            addListBtn.removeAttribute("disabled");
            addTaskBtn.removeAttribute("disabled");
        };
        setTimeout(() => {
            document.getElementsByClassName("modal_container")[0].setAttribute("id", "modal_container");
        }, 0);
        var inputField = document.getElementById("name_list"),
            saveBtn = document.getElementById("save_btn");
        function saveRenameTodo(e) {
            e.preventDefault();
            let oldValue = localStorage.getItem(localStorage.getItem("list-selected")),
                idKey = localStorage.getItem("list-selected").slice(0, 5) + inputField.value.charAt(0).toUpperCase() + inputField.value.slice(1);
            localStorage.removeItem(localStorage.getItem("list-selected"));
            localStorage.removeItem("list-selected");
            localStorage.setItem("list-selected", idKey);
            localStorage.setItem(idKey, oldValue);
            location.reload();
        }
        inputField.oninput = () => {
            if (inputField.value == "" || inputField.value.match(/^\s*$/)) {
                saveBtn.setAttribute("disabled", "");
            } else {
                saveBtn.removeAttribute("disabled");
            }
        };
        saveBtn.onclick = saveRenameTodo;
    }
    function deleteTodo() {
        localStorage.removeItem(localStorage.getItem("list-selected"));
        location.reload();
    }
    if (localStorage.getItem(localStorage.getItem("list-selected")) !== "[]") {
        todoTaskSection.innerHTML += `<ul id="todo_container"></ul>`;
        var todos = Array.from(JSON.parse(localStorage.getItem(localStorage.getItem("list-selected")))),
            taskID = 0,
            todoContainer = document.getElementById("todo_container");
        todos.forEach(todo => {
            todoContainer.innerHTML += `
            <li class="task_list">
                <input type="checkbox" class="task_checkbox" id="task_checkbox_${taskID}" onclick="checkTask(${taskID})" ${todo.completed == true ? "checked" : ""}/>
                <input type="text" class="task_input" id="task_input_${taskID}" value="${todo.name}" oninput="editTask(${taskID})" />
                <i class="task_delete" id="task_delete_${taskID}" onclick="deleteTask(${taskID})">&#xe8bb;</i>
            </li>`;
            taskID++;
        })
        function checkTask(n) {
            if (document.getElementById("task_checkbox_" + n).checked) {
                todos[n].completed = true;
                localStorage.setItem(localStorage.getItem("list-selected"), JSON.stringify(todos));
            } else {
                todos[n].completed = false;
                localStorage.setItem(localStorage.getItem("list-selected"), JSON.stringify(todos));
            }
        }
        function editTask(n) {
            todos[n].name = document.getElementById("task_input_" + n).value;
            localStorage.setItem(localStorage.getItem("list-selected"), JSON.stringify(todos));
        }
        function deleteTask(n) {
            todos.splice(n, 1);
            localStorage.setItem(localStorage.getItem("list-selected"), JSON.stringify(todos));
            location.reload();
        }
    }
    var addTaskBtn = document.getElementById("add_task_btn");
    addTaskBtn.onclick = createTodo; 
}

for (let i = 0; i < listsContainer.length; i++) {
    const list = listsContainer[i];
    list.onclick = () => {
        localStorage.setItem("list-selected", listsContainer[i].getAttribute("id") + listName[i].innerText);
        location.reload();
    }
}

function closeMenu(elmnt) {
    var modalContainer = document.getElementsByClassName("modal_container"),
        modalBG = document.getElementsByClassName("modal_bg");
    function closeAnimation() {
        setTimeout(() => {
            document.getElementById(elmnt).remove();
            document.removeEventListener('click', removeMenu);
        }, 200);
        modalContainer[0].removeAttribute("id");
    }
    function removeMenu(event) {
        var clickMenu = modalContainer[0].contains(event.target);
        var clickBG = modalBG[0].contains(event.target);
        if (!clickMenu && clickBG) {
            closeAnimation();
        }
    }
    document.addEventListener('click', removeMenu);
    document.getElementsByClassName("close_btn")[0].onclick = closeAnimation;
    setTimeout(() => {
        modalContainer[0].setAttribute("id", "modal_container");
    }, 0);
}

// ############################################
// #        Event Listeners Section           #
// ############################################
settings.onclick = () => {
    var settingsSection = document.createElement("div"),
        color = ["#ea3c78", "#fe8d18", "#ffba25", "#1a73e8", "#005366", "#b040bf"];
    pageBody[0].appendChild(settingsSection);
    settingsSection.setAttribute("id", "settings_section");
    settingsSection.setAttribute("class", "modal_bg");
    settingsSection.innerHTML = `
        <form class="modal_container" autocomplete="off">
            <header class="modal_header">
                <b>Settings</b>
                <i class="close_btn">&#xe8bb;</i>
            </header>
            <div class="line_dividerX"></div>
            <main class="modal_body settings_body">
                <div id="background_image_preview">
                    <h1 id="setting_time" class="time_stats" style="font-size: 32px">00:00</h1>
                    <h3 id="setting_date" class="time_stats">Day, Month 00</h3>
                </div>
                <div class="settings_block">
                    <p>Background</p>
                    <div id="block_container">
                        <div class="block img_block" style="background-image:url(${wallpaper[0]})"></div>
                        <div class="block img_block" style="background-image:url(${wallpaper[1]})"></div>
                        <div class="block img_block" style="background-image:url(${wallpaper[2]})"></div>
                        <div class="block img_block" style="background-image:url(${wallpaper[3]})"></div>
                        <div class="block img_block" style="background-image:url(${wallpaper[4]})"></div>
                        <div class="block img_block" style="background-image:url(${wallpaper[5]})"></div>
                        <div class="block img_block block_active" style="display: none"></div>
                    </div>
                    <div class="img_internet_form">
                        <input type="text" placeholder="Enter a link" id="img_internet_input" />
                        <button id="img_internet_save_btn" variant-state="disabled">Change</button>
                    </div>
                    <p class="form_error" style="display: none"></p>
                </div>
                <div class="settings_block">
                    <p>Accent color</p>
                    <div id="block_container">
                        <div class="block ac_colors" style="background:${color[0]}"></div>
                        <div class="block ac_colors" style="background:${color[1]}"></div>
                        <div class="block ac_colors" style="background:${color[2]}"></div>
                        <div class="block ac_colors" style="background:${color[3]}"></div>
                        <div class="block ac_colors" style="background:${color[4]}"></div>
                        <div class="block ac_colors" style="background:${color[5]}"></div>
                        <div class="block ac_colors block_active" style="display: none"></div>
                    </div>
                    <div>
                        <label for="accent_picker" class="modal_input_label">Custom color</label>
                        <input type="color" id="accent_picker" value="#005366">
                    </div>
                </div>
                <div class="settings_block">
                    <div class="settings_block settings_block_container">
                        <p>Use 24-hour format</p>
                        <label class="switch_outline" for="24hour">
                            <input class="switch_input" type="checkbox" id="24hour"/>
                            <div class="switch_base"></div>
                            <div class="switch_thumb"></div>
                        </label>
                    </div>
                    <div class="settings_block settings_block_container">
                        <p>Dark mode</p>
                        <label class="switch_outline" for="darkmode">
                            <input class="switch_input" type="checkbox" id="darkmode"/>
                            <div class="switch_base"></div>
                            <div class="switch_thumb"></div>
                        </label>
                    </div>
                </div>
            </main>
        </form>
    `;
    document.getElementsByClassName("close_btn")[0].onclick = () => {
        document.getElementById("settings_section").remove();
        bgImage(pageHeader);
    };
    setTimeout(() => {
        document.getElementsByClassName("modal_container")[0].setAttribute("id", "modal_container");
    }, 0);
    // ######################################
    // #      Variables and Functions       #
    // ######################################
    var bgImagePreview = document.getElementById("background_image_preview"),
        previewTime = document.getElementById("setting_time"),
        previewDate = document.getElementById("setting_date"),
        lsBGImage = localStorage.getItem("backgroundImage"),
        imgBlock = document.getElementsByClassName("img_block"),
        darkmodeInput = document.getElementById("darkmode"),
        accentPicker = document.getElementById("accent_picker"),
        acColors = document.getElementsByClassName("ac_colors"),
        hourFormatInput = document.getElementById("24hour"),
        lsAcColor = localStorage.getItem("accentColor"),
        enterLink = document.getElementById("img_internet_input"),
        enterLinkBtn = document.getElementById("img_internet_save_btn"),
        errorMsg = document.getElementsByClassName("form_error");

    function clock() {
        var time = new Date(),
            hours = time.getHours(),
            minutes = String(time.getMinutes()).padStart(2, "0"),
            day = time.getDay(),
            month = time.getMonth(),
            date = time.getDate(),
            hours12Format = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            dayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        if (JSON.parse(localStorage.getItem("24hour")) === true) {
            previewTime.innerText = hours + ":" + minutes;
        } else {
            previewTime.innerText = hours12Format[hours] + ":" + minutes;
        }
        previewDate.innerText = dayArray[day] + ", " + monthArray[month] + " " + date;
    }

    function changeBGImage(a, b) {
        blockActive(imgBlock);
        imgBlock[a].classList.add("block_active");
        localStorage.setItem("backgroundImage", b);
    }

    function attPicked(i) {
        accentPicker.setAttribute("value", i);
    }

    function blockActive(a) {
        a[0].classList.remove("block_active");
        a[1].classList.remove("block_active");
        a[2].classList.remove("block_active");
        a[3].classList.remove("block_active");
        a[4].classList.remove("block_active");
        a[5].classList.remove("block_active");
        a[6].style.display = "none";
    }

    function changeAccentColor(a, b) {
        attPicked(a);
        blockActive(acColors);
        acColors[b].classList.add("block_active");
        document.documentElement.style.setProperty("--accentColor", accentPicker.getAttribute("value"));
        localStorage.setItem("accentColor", accentPicker.getAttribute("value"));
    }

    function checkAccentColor(color) {
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        const luminance = (0.2126 * r) + (0.7152 * g) + (0.0722 * b);
        return luminance >= 128;
    }
    function setAccentText() {
        if (checkAccentColor(localStorage.getItem("accentColor"))) {
            document.documentElement.style.setProperty("--accentText", "#1A1A1B");
            localStorage.setItem("accentText", "#1A1A1B");
        } else {
            document.documentElement.style.setProperty("--accentText", "#ffffff");
            localStorage.setItem("accentText", "#ffffff");
        }
    }
    // ##########################
    // #      Loaded Data       #
    // ##########################
    bgImage(bgImagePreview);
    if (lsBGImage == null || lsBGImage == wallpaper[0]) {
        imgBlock[0].classList.add("block_active");
    } else if (lsBGImage == wallpaper[1]) {
        imgBlock[1].classList.add("block_active");
    } else if (lsBGImage == wallpaper[2]) {
        imgBlock[2].classList.add("block_active");
    } else if (lsBGImage == wallpaper[3]) {
        imgBlock[3].classList.add("block_active");
    } else if (lsBGImage == wallpaper[4]) {
        imgBlock[4].classList.add("block_active");
    } else if (lsBGImage == wallpaper[5]) {
        imgBlock[5].classList.add("block_active");
    } else {
        imgBlock[6].setAttribute("style", `background-image:url(${lsBGImage})`);
    }
    clock();
    setInterval(clock, 1000);
    if (JSON.parse(localStorage.getItem("24hour")) === true) {
        hourFormatInput.setAttribute("checked", "");
    }
    if (JSON.parse(localStorage.getItem("darkmode")) === false) {
        darkmodeInput.removeAttribute("checked");
    }
    if (lsAcColor == color[0]) {
        attPicked(color[0]);
        acColors[0].classList.add("block_active");
    } else if (lsAcColor == color[1]) {
        attPicked(color[1]);
        acColors[1].classList.add("block_active");
    } else if (lsAcColor == color[2]) {
        attPicked(color[2]);
        acColors[2].classList.add("block_active");
    } else if (lsAcColor == color[3]) {
        attPicked(color[3]);
        acColors[3].classList.add("block_active");
    } else if (lsAcColor == color[4] || lsAcColor == null) {
        attPicked(color[4]);
        acColors[4].classList.add("block_active");
    } else if (lsAcColor == color[5]) {
        attPicked(color[5]);
        acColors[5].classList.add("block_active");
    } else {
        attPicked(lsAcColor);
        acColors[6].style.display = "block";
        acColors[6].style.background = lsAcColor;
    }
    // ##########################
    // #   Settings Auto Save   #
    // ##########################
    imgBlock[0].onclick = () => {
        changeBGImage(0, wallpaper[0]);
        bgImage(bgImagePreview);
    };
    imgBlock[1].onclick = () => {
        changeBGImage(1, wallpaper[1]);
        bgImage(bgImagePreview);
    };
    imgBlock[2].onclick = () => {
        changeBGImage(2, wallpaper[2]);
        bgImage(bgImagePreview);
    };
    imgBlock[3].onclick = () => {
        changeBGImage(3, wallpaper[3]);
        bgImage(bgImagePreview);
    };
    imgBlock[4].onclick = () => {
        changeBGImage(4, wallpaper[4]);
        bgImage(bgImagePreview);
    };
    imgBlock[5].onclick = () => {
        changeBGImage(5, wallpaper[5]);
        bgImage(bgImagePreview);
    };
    enterLink.oninput = () => {
        if (enterLink.value == "" || enterLink.value.match(/\s/)) {
            enterLinkBtn.setAttribute("variant-state", "disabled");
        } else {
            enterLinkBtn.removeAttribute("variant-state");
        }
    };
    enterLinkBtn.onclick = (e) => {
        e.preventDefault();
        fetch(enterLink.value)
        .then(response => {
            if (response.status === 200) {
                changeBGImage(6, enterLink.value);
                bgImage(bgImagePreview);
                imgBlock[6].setAttribute("style", `background-image:url(${enterLink.value})`);
            } else {
                errorMsg[0].removeAttribute("style");
                errorMsg[0].innerText = "Your request was unsuccessful, try again later.";
            }
        }).catch(() => {
            errorMsg[0].removeAttribute("style");
            errorMsg[0].innerText = "Please enter a valid image URL.";
        });
    };
    accentPicker.oninput = (e) => {
        blockActive(acColors);
        attPicked(e.target.value);
        acColors[6].style.display = "block";
        acColors[6].style.background = e.target.value;
        document.documentElement.style.setProperty("--accentColor", accentPicker.getAttribute("value"));
        localStorage.setItem("accentColor", accentPicker.getAttribute("value"));
        setAccentText();
    }
    acColors[0].onclick = () => {
        changeAccentColor(color[0], 0);
        setAccentText();
    };
    acColors[1].onclick = () => {
        changeAccentColor(color[1], 1);
        setAccentText();
    };
    acColors[2].onclick = () => {
        changeAccentColor(color[2], 2);
        setAccentText();
    };
    acColors[3].onclick = () => {
        changeAccentColor(color[3], 3);
        setAccentText();
    };
    acColors[4].onclick = () => {
        changeAccentColor(color[4], 4);
        setAccentText();
    };
    acColors[5].onclick = () => {
        changeAccentColor(color[5], 5);
        setAccentText();
    };
    hourFormatInput.onclick = () => {
        if (hourFormatInput.checked) {
            localStorage.setItem("24hour", true);
        } else {
            localStorage.setItem("24hour", false);
        }
    };
    darkmodeInput.onclick = () => {
        if (darkmodeInput.checked) {
            localStorage.setItem("darkmode", true);
        } else {
            localStorage.setItem("darkmode", false);
        }
        checkThemeMode();
    };
};

// ############################################

// ############################################
// #          Create To-Do Section            #
// ############################################
function createList() {
    addListBtn.setAttribute("disabled", "");
    addListBtn2.setAttribute("disabled", "");
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
                    <input autofocus type="text" id="name_list" class="input_text" placeholder="Enter a name" >
                    <button id="save_btn" disabled>Save</button>
                </div>
                    <p class="form_error" style="display: none">There is an error creating your list.</p>
            </main>
        </form>`;
    document.getElementsByClassName("close_btn")[0].onclick = () => {
        document.getElementById("create_list_section").remove();
        addListBtn.removeAttribute("disabled");
        addListBtn2.removeAttribute("disabled");
    };
    setTimeout(() => {
        document.getElementsByClassName("modal_container")[0].setAttribute("id", "modal_container");
    }, 0);
    var inputField = document.getElementById("name_list"),
        saveBtn = document.getElementById("save_btn");
    function saveAddList(e) {
        e.preventDefault();
        if (localStorage.getItem("list-last-id") == null) {
            localStorage.setItem("list-last-id", 0);
        }
        localStorage.setItem("list-last-id", parseInt(localStorage.getItem("list-last-id")) + 1);
        const padStartLastId = localStorage.getItem("list-last-id").toString().padStart(4, '0'),
              todos = "#" + padStartLastId + inputField.value.trim().replace(/^\S/, (c) => c.toUpperCase());

        if (localStorage.getItem(todos) == null) {
            localStorage.setItem(todos, "[]");
            saveBtn.setAttribute("disabled", "");
            localStorage.setItem("list-selected", todos);
            location.reload();
        } else {
            document.getElementsByClassName("form_error")[0].setAttribute("style", "display: block");
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

function createTodo() {
    var createTodoSection = document.createElement("div");
    addListBtn.setAttribute("disabled", "");
    addTaskBtn.setAttribute("disabled", "");
    pageBody[0].appendChild(createTodoSection);
    createTodoSection.setAttribute("id", "create_list_section");
    createTodoSection.setAttribute("class", "modal_bg");
    createTodoSection.innerHTML = `
        <form class="modal_container form_input" autocomplete="off">
            <header class="modal_header">
                <b>Add a task</b>
                <i class="close_btn">&#xe8bb;</i>
            </header>
            <div class="line_dividerX"></div>
            <main class="form_body add_list_body">
                <div class="input_section">
                    <input autofocus type="text" id="name_list" class="input_text" placeholder="Enter a name" >
                    <button id="save_btn" disabled>Save</button>
                </div>
                    <p class="form_error" style="display: none">There is an error creating your todo.</p>
            </main>
        </form>`;
    var inputField = document.getElementById("name_list"),
        saveBtn = document.getElementById("save_btn");
    document.getElementsByClassName("close_btn")[0].onclick = () => {
        document.getElementById("create_list_section").remove();
        addListBtn.removeAttribute("disabled");
        addTaskBtn.removeAttribute("disabled");
    };
    setTimeout(() => {
        document.getElementsByClassName("modal_container")[0].setAttribute("id", "modal_container");
    }, 0);
    function saveAddTodo(e) {
        e.preventDefault();
        localStorage.setItem(
            localStorage.getItem("list-selected"),
            JSON.stringify([...JSON.parse(localStorage.getItem(localStorage.getItem("list-selected")) || "[]"),
            { name: inputField.value.trim().replace(/^\S/, (c) => c.toUpperCase()), completed: false }])
        );
        location.reload();
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

// ############################################
// #           Mobile View Section            #
// ############################################
menuBtn.onclick = () => {
    if (document.getElementById("menu_btn_checkbox").checked) {
        menuBtn.innerHTML = `&#xe700;<input type="checkbox" id="menu_btn_checkbox" name="menu_btn_checkbox">`;
        todoTaskSection.style.display = "flex";
        for (let i = 0; i < mobileElmnt.length; i++) {
            mobileElmnt[i].removeAttribute("style")
        }
    } else {
        menuBtn.innerHTML = `&#xe711;<input type="checkbox" id="menu_btn_checkbox" name="menu_btn_checkbox" checked>`;
        todoTaskSection.style.display = "none";
        // todoTaskSection.classList.add("out_animation")
        // setTimeout(() => {
        //     todoTaskSection.style.display = "none";
        // }, 100);
        for (let i = 0; i < mobileElmnt.length; i++) {
            mobileElmnt[i].setAttribute("style", "display: flex !important;");
        }
    }
}