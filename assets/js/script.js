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
        "https://wallpaperaccess.com/full/53106.jpg"
    ],
    lsUsername = localStorage.getItem("username"),
    lsProfile = localStorage.getItem("profile"),
    addListBtn = document.getElementById("add_list_btn"),
    todoTaskSection = document.getElementById("todo_task_section"),
    listContainer = document.getElementById("list_container");

// ############################################
// #            Startup Section               #
// ############################################
function bgImage(elmnt) {
    if (localStorage.getItem("backgroundImage") == null) {
        elmnt.style.backgroundImage = "url(" + wallpaper[0] + ")";
    } else {
        elmnt.style.backgroundImage = "url(" + localStorage.getItem("backgroundImage") + ")";
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
        headerTime.innerHTML = hours + ":" + minutes;
    } else {
        headerTime.innerHTML = hours12Format[hours] + ":" + minutes;
    }
    headerDate.innerHTML = dayArray[day] + ", " + monthArray[month] + " " + date;
    if (hours >= 6 && hours <= 11) {
        greetings.innerHTML = "Good morning,";
    } else if (hours >= 12 && hours <= 17) {
        greetings.innerHTML = "Good afternoon,";
    } else {
        greetings.innerHTML = "Good evening,";
    }
}
bgImage(pageHeader);
clock();
setInterval(clock, 1000);
if (lsUsername != null) {
    username.innerHTML = lsUsername;
} else {
    username.innerHTML = "Account Name";
}

function defaultProfilePicture(elmnt, n, more) {
    elmnt.innerHTML = `
    <svg height="` + n + `" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M163.786 104.571C163.786 124.434 147.44 140.643 127.143 140.643C106.846 140.643 90.5 124.434 90.5 104.571C90.5 84.7089 106.846 68.5 127.143 68.5C147.44 68.5 163.786 84.7089 163.786 104.571Z" stroke="currentColor" stroke-width="9"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M175.137 192.15C174.831 166.14 153.651 145.15 127.569 145.15C101.486 145.15 80.3067 166.14 80.0005 192.15H71C71.3066 161.17 96.5158 136.15 127.569 136.15C158.621 136.15 183.831 161.17 184.137 192.15H175.137Z" fill="currentColor"/>
    </svg>` + more;
}
if (lsProfile != null) {
    accountProfile.innerHTML = '<img id="account_picture" src="data:image/png;base64,' + lsProfile + '" alt="User Profile">';
} else {
    defaultProfilePicture(accountProfile, 42, "");
}

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
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (key.startsWith("#")) {
            if (localStorage.getItem("todo-selected") == key) {
                listContainer.innerHTML += `
                <div class="list_container list_active">
                    <div class="list_color"></div>
                    <p class="list_name">` + key.substring(1) + `</p>
                </div>`;
            } else {
                listContainer.innerHTML += `
                <div class="list_container">
                    <p class="list_name">` + key.substring(1) + `</p>
                </div>`;
            }
        }
    }
}
// ############################################
// #        Event Listeners Section           #
// ############################################
editUserBtn[0].onclick = () => {
    var editUserSection = document.createElement("div"),
        fileInputDOM = `<div id="change_picture_btn"><label for="profile">Change</label></div>`,
        profileImgDOM = `<img id="edit_user_account_picture" alt="User Profile" src="data:image/png;base64,` + lsProfile + `">` + fileInputDOM;
    pageBody[0].appendChild(editUserSection);
    editUserSection.setAttribute("id", "edit_user_section");
    editUserSection.setAttribute("class", "modal_bg");
    editUserSection.innerHTML = `
        <form class="modal_container" autocomplete="off">
            <header class="modal_header">
                <b>Edit profile</b>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="close_btn" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </header>
            <div class="line_dividerX"></div>
            <div class="form_body">
                <div id="edit_user_account_profile"></div>
                <input type="file" id="profile" accept=".png, .jpg, .jpeg" style="display: none"/>
                <input type="text" class="input_text" id="change_username" placeholder="Enter a name">
            </div>
            <div class="line_dividerX"></div>
            <footer class="form_footer">
                <p class="form_error" style="display: none"></p>
                <button id="save_btn">Save</button>
            </footer>
        </form>`;
    document.getElementsByClassName("close_btn")[0].onclick = () => {
        document.getElementById("edit_user_section").remove();
    };
    setTimeout(() => {
        document.getElementsByClassName("modal_container")[0].setAttribute("id", "modal_container");
    }, 0);
    var userProfile = document.getElementById("edit_user_account_profile"),
        input = document.getElementById("change_username"),
        saveBtn = document.getElementById("save_btn"),
        errorMsg = document.getElementsByClassName("form_error"),
        profile = document.getElementById("profile"),
        fileReader = new FileReader();
    if (lsProfile != null) {
        userProfile.innerHTML = profileImgDOM;
    } else {
        defaultProfilePicture(userProfile, 98, fileInputDOM);
    }
    if (lsUsername != null) {
        input.value = lsUsername;
    }
    profile.onchange = () => {
        userProfile.innerHTML = profileImgDOM;
        fileReader.onload = function() {
            document.getElementById("edit_user_account_picture").src = fileReader.result;
        };
        if (profile.files[0]) {
            fileReader.readAsDataURL(profile.files[0]);
        };
    };
    saveBtn.onclick = (e) => {
        const inputValue = input.value.trim().toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
        if (inputValue.match(/^[a-zA-ZÑñ]+(?: [a-zA-ZÑñ-]+)*$/)) {
            localStorage.setItem("username", inputValue);
            const base64String = fileReader.result
                .replace('data:', '')
                .replace(/^.+,/, '');
            localStorage.setItem("profile", base64String);
        } else {
            e.preventDefault();
            errorMsg[0].style.display = "block";
            errorMsg[0].innerHTML = "Numbers are not allowed.";
        }
    };

};

// #########################################
settings.onclick = () => {
    var settingsSection = document.createElement("div"),
        color = ["#ea3c78", "#fe8d18", "#ffba25", "#177d1f", "#1a73e8", "#b040bf"];
    pageBody[0].appendChild(settingsSection);
    settingsSection.setAttribute("id", "settings_section");
    settingsSection.setAttribute("class", "modal_bg");
    settingsSection.innerHTML = `
        <form class="modal_container" autocomplete="off">
            <header class="modal_header">
                <b>Settings</b>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="close_btn" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </header>
            <div class="line_dividerX"></div>
            <div class="modal_body settings_body">
                <div id="background_image_preview">
                    <h1 id="setting_time" class="time_stats" style="font-size: 32px">00:00</h1>
                    <h3 id="setting_date" class="time_stats">Day, Month 00</h3>
                </div>
                <div class="settings_block">
                    <p>Background</p>
                    <div id="block_container">
                        <div class="block img_block" style="background-image:url(` + wallpaper[0] + `)"></div>
                        <div class="block img_block" style="background-image:url(` + wallpaper[1] + `)"></div>
                        <div class="block img_block" style="background-image:url(` + wallpaper[2] + `)"></div>
                        <div class="block img_block" style="background-image:url(` + wallpaper[3] + `)"></div>
                        <div class="block img_block" style="background-image:url(` + wallpaper[4] + `)"></div>
                        <div class="block img_block" style="background-image:url(` + wallpaper[5] + `)"></div>
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
                        <div class="block ac_colors" style="background:` + color[0] + `"></div>
                        <div class="block ac_colors" style="background:` + color[1] + `"></div>
                        <div class="block ac_colors" style="background:` + color[2] + `"></div>
                        <div class="block ac_colors" style="background:` + color[3] + `"></div>
                        <div class="block ac_colors" style="background:` + color[4] + `"></div>
                        <div class="block ac_colors" style="background:` + color[5] + `"></div>
                        <div class="block ac_colors block_active" style="display: none"></div>
                    </div>
                    <div>
                        <label for="accent_picker" class="modal_input_label">Custom color</label>
                        <input type="color" id="accent_picker" value="#1a73e8">
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
                            <input class="switch_input" type="checkbox" id="darkmode" checked/>
                            <div class="switch_base"></div>
                            <div class="switch_thumb"></div>
                        </label>
                    </div>
                </div>
            </div>
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
            previewTime.innerHTML = hours + ":" + minutes;
        } else {
            previewTime.innerHTML = hours12Format[hours] + ":" + minutes;
        }
        previewDate.innerHTML = dayArray[day] + ", " + monthArray[month] + " " + date;
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
        imgBlock[6].setAttribute("style", "background-image:url(" + lsBGImage + ")");
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
                imgBlock[6].setAttribute("style", "background-image:url(" + enterLink.value + ")");
            } else {
                errorMsg[0].removeAttribute("style");
                errorMsg[0].innerHTML = "Your request was unsuccessful, try again later.";
            }
        }).catch(() => {
            errorMsg[0].removeAttribute("style");
            errorMsg[0].innerHTML = "Please enter a valid image URL.";
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
aboutProject.onclick = () => {
    var aboutProjectSection = document.createElement("div");
    pageBody[0].appendChild(aboutProjectSection);
    aboutProjectSection.setAttribute("id", "about_project_section");
    aboutProjectSection.setAttribute("class", "modal_bg");
    aboutProjectSection.innerHTML = `
        <div class="modal_container">
            <header class="modal_header">
                <b>About project</b>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="close_btn" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </header>
            <div class="line_dividerX"></div>
            <div class="modal_body">
                <svg width="213" height="37" id="logo" viewBox="0 0 213 37" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>
                <p>This project allows you to create a customizable to-do list that is organized into categories. The list is saved in your browser's local storage, so it won't be lost when you reload the page.
                    <br><br>
                    However, clearing your browser's data will also delete the saved to-do list. To make the most of this project, it is recommended to use it with a browser extension that changes the new tab page.
                </p>
            </div>
            <div class="line_dividerX"></div>
            <footer class="form_footer" id="about_project_footer">
                <p id="last_update"></p>
                <a href="https://github.com/MinecraftJohn/to-do-list" target="_blank" rel="noopener noreferrer">Visit Github for more info.</a>
            </footer>
        </div>
    `;
    fetch("https://api.github.com/repos/MinecraftJohn/to-do-list/commits?branch=main")
        .then((response) => response.json())
        .then((commits) => {
            const latestCommit = commits[0];
            const date = new Date(latestCommit.commit.author.date);
            const formattedDate = date.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
            });
            document.querySelector("#last_update").innerHTML = formattedDate;
        });
    document.getElementsByClassName("close_btn")[0].onclick = () => {
        document.getElementById("about_project_section").remove();
    };
    setTimeout(() => {
        document.getElementsByClassName("modal_container")[0].setAttribute("id", "modal_container");
    }, 0);

    var logo = document.getElementById("logo");

    function dynamicLogo(color) {
        logo.innerHTML = '<path d="M25.125 7.125H15.4688V36H9.89062V7.125H0.257812V2.39062H25.125V7.125ZM35.3906 36.5625C31.6875 36.5625 28.7266 35.4453 26.5078 33.2109C24.3047 30.9609 23.2031 27.9844 23.2031 24.2812C23.2031 20.25 24.3516 17.1016 26.6484 14.8359C28.9609 12.5703 32.0703 11.4375 35.9766 11.4375C39.7266 11.4375 42.6484 12.5391 44.7422 14.7422C46.8359 16.9453 47.8828 20 47.8828 23.9062C47.8828 27.7344 46.75 30.8047 44.4844 33.1172C42.2344 35.4141 39.2031 36.5625 35.3906 36.5625ZM35.6484 15.7734C33.5234 15.7734 31.8438 16.5156 30.6094 18C29.375 19.4844 28.7578 21.5312 28.7578 24.1406C28.7578 26.6562 29.3828 28.6406 30.6328 30.0938C31.8828 31.5312 33.5547 32.25 35.6484 32.25C37.7891 32.25 39.4297 31.5391 40.5703 30.1172C41.7266 28.6953 42.3047 26.6719 42.3047 24.0469C42.3047 21.4062 41.7266 19.3672 40.5703 17.9297C39.4297 16.4922 37.7891 15.7734 35.6484 15.7734ZM67.2656 36V2.39062H76.9688C89.3594 2.39062 95.5547 7.85156 95.5547 18.7734C95.5547 23.9609 93.8359 28.1328 90.3984 31.2891C86.9609 34.4297 82.3516 36 76.5703 36H67.2656ZM72.8203 7.125V31.2891H77.2734C81.1953 31.2891 84.2422 30.2109 86.4141 28.0547C88.6016 25.8984 89.6953 22.8516 89.6953 18.9141C89.6953 11.0547 85.625 7.125 77.4844 7.125H72.8203ZM111.75 36.5625C108.047 36.5625 105.086 35.4453 102.867 33.2109C100.664 30.9609 99.5625 27.9844 99.5625 24.2812C99.5625 20.25 100.711 17.1016 103.008 14.8359C105.32 12.5703 108.43 11.4375 112.336 11.4375C116.086 11.4375 119.008 12.5391 121.102 14.7422C123.195 16.9453 124.242 20 124.242 23.9062C124.242 27.7344 123.109 30.8047 120.844 33.1172C118.594 35.4141 115.562 36.5625 111.75 36.5625ZM112.008 15.7734C109.883 15.7734 108.203 16.5156 106.969 18C105.734 19.4844 105.117 21.5312 105.117 24.1406C105.117 26.6562 105.742 28.6406 106.992 30.0938C108.242 31.5312 109.914 32.25 112.008 32.25C114.148 32.25 115.789 31.5391 116.93 30.1172C118.086 28.6953 118.664 26.6719 118.664 24.0469C118.664 21.4062 118.086 19.3672 116.93 17.9297C115.789 16.4922 114.148 15.7734 112.008 15.7734ZM162.234 36H143.625V2.39062H149.203V31.2891H162.234V36ZM169.242 6.96094C168.352 6.96094 167.586 6.67188 166.945 6.09375C166.32 5.51562 166.008 4.78125 166.008 3.89062C166.008 3 166.32 2.25781 166.945 1.66406C167.586 1.07031 168.352 0.773438 169.242 0.773438C170.164 0.773438 170.945 1.07031 171.586 1.66406C172.227 2.25781 172.547 3 172.547 3.89062C172.547 4.73438 172.227 5.46094 171.586 6.07031C170.945 6.66406 170.164 6.96094 169.242 6.96094ZM171.938 36H166.5V12H171.938V36ZM177.562 35.25V30.2109C179.594 31.7578 181.836 32.5312 184.289 32.5312C187.57 32.5312 189.211 31.5625 189.211 29.625C189.211 29.0781 189.07 28.6172 188.789 28.2422C188.508 27.8516 188.125 27.5078 187.641 27.2109C187.172 26.9141 186.609 26.6484 185.953 26.4141C185.312 26.1797 184.594 25.9141 183.797 25.6172C182.812 25.2266 181.922 24.8125 181.125 24.375C180.344 23.9375 179.688 23.4453 179.156 22.8984C178.641 22.3359 178.25 21.7031 177.984 21C177.719 20.2969 177.586 19.4766 177.586 18.5391C177.586 17.3828 177.859 16.3672 178.406 15.4922C178.953 14.6016 179.688 13.8594 180.609 13.2656C181.531 12.6562 182.578 12.2031 183.75 11.9062C184.922 11.5938 186.133 11.4375 187.383 11.4375C189.602 11.4375 191.586 11.7734 193.336 12.4453V17.2031C191.648 16.0469 189.711 15.4688 187.523 15.4688C186.836 15.4688 186.211 15.5391 185.648 15.6797C185.102 15.8203 184.633 16.0156 184.242 16.2656C183.852 16.5156 183.547 16.8203 183.328 17.1797C183.109 17.5234 183 17.9062 183 18.3281C183 18.8438 183.109 19.2812 183.328 19.6406C183.547 20 183.867 20.3203 184.289 20.6016C184.727 20.8672 185.242 21.1172 185.836 21.3516C186.445 21.5703 187.141 21.8125 187.922 22.0781C188.953 22.5 189.875 22.9297 190.688 23.3672C191.516 23.8047 192.219 24.3047 192.797 24.8672C193.375 25.4141 193.82 26.0547 194.133 26.7891C194.445 27.5078 194.602 28.3672 194.602 29.3672C194.602 30.5859 194.32 31.6484 193.758 32.5547C193.195 33.4609 192.445 34.2109 191.508 34.8047C190.57 35.3984 189.484 35.8359 188.25 36.1172C187.031 36.4141 185.742 36.5625 184.383 36.5625C181.758 36.5625 179.484 36.125 177.562 35.25ZM212.438 35.7422C211.375 36.2734 209.977 36.5391 208.242 36.5391C203.586 36.5391 201.258 34.3047 201.258 29.8359V16.2656H197.25V12H201.258V6.44531L206.695 4.89844V12H212.438V16.2656H206.695V28.2656C206.695 29.6875 206.953 30.7031 207.469 31.3125C207.984 31.9219 208.844 32.2266 210.047 32.2266C210.969 32.2266 211.766 31.9609 212.438 31.4297V35.7422Z" fill="' +
            color + `"/>
                <defs>
                <linearGradient id="paint0_linear_179_2" x1="59.4688" y1="4.38281" x2="62.7124" y2="37.6935" gradientUnits="userSpaceOnUse">
                <stop stop-color="#1A73E8"/>
                <stop offset="1" stop-color="#0035FF"/>
                </linearGradient>
                </defs>`;
    }
    if (JSON.parse(pageHtml[0].getAttribute("darkmode")) === true) {
        dynamicLogo("var(--text)");
    } else {
        dynamicLogo("url(#paint0_linear_179_2)");
    }
};

// ############################################
// #          Create To-Do Section            #
// ############################################
function createTodo() {
    var createToDoSection = document.createElement("div");
    pageBody[0].appendChild(createToDoSection);
    createToDoSection.setAttribute("id", "create_todo_section");
    createToDoSection.setAttribute("class", "modal_bg");
    createToDoSection.innerHTML = `
        <form class="modal_container" autocomplete="off">
            <header class="modal_header">
                <b>Add list</b>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="close_btn" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </header>
            <div class="line_dividerX"></div>
            <div class="form_body add_list_body">
                <div class="input_section">
                    <input type="text" id="name_list" class="input_text" placeholder="Enter a name">
                    <button id="save_btn" variant-state="disabled">Save</button>
                </div>
                    <p class="form_error" style="display: none">The name you entered already exists.</p>
            </div>
        </form>`;
    document.getElementsByClassName("close_btn")[0].onclick = () => {
        document.getElementById("create_todo_section").remove();
    };
    setTimeout(() => {
        document.getElementsByClassName("modal_container")[0].setAttribute("id", "modal_container");
    }, 0);
    var inputField = document.getElementById("name_list"),
        saveBtn = document.getElementById("save_btn");
    inputField.oninput = () => {
        if (inputField.value == "" || inputField.value.match(/\s/)) {
            saveBtn.setAttribute("variant-state", "disabled");
        } else {
            saveBtn.removeAttribute("variant-state");
        }
    };
    saveBtn.onclick = (e) => {
        e.preventDefault();
        if (localStorage.getItem("todo-last-id") == null) {
            localStorage.setItem("todo-last-id", 0);
        }
        localStorage.setItem("todo-last-id", parseInt(localStorage.getItem("todo-last-id")) + 1);
        const padStartLastId = localStorage.getItem("todo-last-id").toString().padStart(4, '0'),
              todos = "#" + padStartLastId + inputField.value;

        if (localStorage.getItem(todos) == null) {
            localStorage.setItem(todos, "");
            saveBtn.setAttribute("variant-state", "disabled");
            localStorage.setItem("todo-selected", todos);
            setTimeout(() => {
                location.reload();
            }, 400);
        } else {
            document.getElementsByClassName("form_error")[0].setAttribute("style", "display: block");
        }
    };
}
addListBtn.onclick = createTodo;
document.getElementById("add_list_btn2").onclick = createTodo;