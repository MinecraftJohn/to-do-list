// ############################################
// #           Variables Section              #
// ############################################
var headerTime = document.getElementById("time"),
    headerDate = document.getElementById("date"),
    greetings = document.getElementById("greetings"),
    accountPicture = document.getElementById("account_picture"),
    username = document.getElementById("username"),
    pageBody = document.getElementsByTagName("body"),
    pageHtml = document.getElementsByTagName("html"),
    editUserBtn = document.getElementsByClassName("setting_edit_user_btn"),
    settings = document.getElementById("settings"),
    aboutProject = document.getElementById("about_project");

// ############################################
// #            Startup Section               #
// ############################################
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

    headerTime.innerHTML = hours12Format[hours] + ":" + minutes;
    headerDate.innerHTML = dayArray[day] + ", " + monthArray[month] + " " + date;
    if (hours >= 6 && hours <= 11) {
        greetings.innerHTML = "Good morning,";
    } else if (hours >= 12 && hours <= 17) {
        greetings.innerHTML = "Good afternoon,";
    } else {
        greetings.innerHTML = "Good evening,";
    }
}
clock();
setInterval(clock, 1000);
if (localStorage.getItem("username") != null) {
    username.innerHTML = localStorage.getItem("username");
} else {
    username.innerHTML = "Account Name";
}
if (localStorage.getItem("profile") != null) {
    accountPicture.src = "data:image/png;base64," + localStorage.getItem("profile");
} else {
    accountPicture.src = "assets/img/default-user-profile.png";
}
if (localStorage.getItem("darkmode") != null) {
    pageHtml[0].setAttribute("darkmode", localStorage.getItem("darkmode"));
}

// ############################################
// #        Event Listeners Section           #
// ############################################
function openProfileSetting() {
    var editUserSection = document.createElement("div");
    pageBody[0].appendChild(editUserSection);
    editUserSection.setAttribute("id", "edit_user_section");
    editUserSection.setAttribute("class", "modal_bg");
    editUserSection.innerHTML = `
        <form id="edit_user_form" class="modal_container">
            <header class="modal_header">
                <b>Edit profile</b>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="close_btn" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </header>
            <div class="line_dividerX"></div>
            <div class="form_body">
                <div id="edit_user_account_profile">
                    <img id="edit_user_account_picture" src="" alt="User Profile">
                    <div id="change_picture_btn">
                        <label for="profile">Change</label>
                        <input type="file" id="profile" accept=".png, .jpg, .jpeg"/>
                    </div>
                </div>
                <input type="text" id="change_username" placeholder="Enter a name">
            </div>
            <div class="line_dividerX"></div>
            <footer class="form_footer">
                <p id="form_error"></p>
                <button id="edit_user_save_btn">Save</button>
            </footer>
        </form>
    `;
    document.getElementsByClassName("close_btn")[0].onclick = closeProfileSetting;
    var form = document.getElementById("edit_user_form"),
        profileImg = document.getElementById("edit_user_account_picture"),
        input = document.getElementById("change_username"),
        saveBtn = document.getElementById("edit_user_save_btn"),
        errorMsg = document.getElementById("form_error"),
        profile = document.getElementById("profile"),
        fileReader = new FileReader();
    setTimeout(function() {
        form.style.transform = "translate(-50%, -50%)";
        form.style.opacity = "1";
    }, 0);
    errorMsg.style.display = "none";
    if (localStorage.getItem("profile") != null) {
        profileImg.src = "data:image/png;base64," + localStorage.getItem("profile");
    } else {
        profileImg.src = "assets/img/default-user-profile.png";
    }
    if (localStorage.getItem("username") != null) {
        input.value = localStorage.getItem("username");
    }
    profile.onchange = function() {
        fileReader.onload = function() {
            profileImg.src = fileReader.result;
        };
        if (profile.files[0]) {
            fileReader.readAsDataURL(profile.files[0]);
        };
    };
    saveBtn.onclick = function(e) {
        if (input.value.match(/([A-ZÑ][a-z-ñ.]+)$/)) {
            localStorage.setItem("username", input.value);
            const base64String = fileReader.result
                .replace('data:', '')
                .replace(/^.+,/, '');
            localStorage.setItem("profile", base64String);
        } else {
            e.preventDefault();
            errorMsg.style.display = "block";
            errorMsg.innerHTML = "Please capital the first letter.";
        }
    };
}

function closeProfileSetting() {
    document.getElementById("edit_user_section").remove();
}
editUserBtn[0].onclick = openProfileSetting;

// ############################################
function openAboutProject() {
    var aboutProjectSection = document.createElement("div");
    pageBody[0].appendChild(aboutProjectSection);
    aboutProjectSection.setAttribute("id", "about_project_section");
    aboutProjectSection.setAttribute("class", "modal_bg");
    aboutProjectSection.innerHTML = `
        <div id="about_project_container" class="modal_container">
            <header class="modal_header">
                <b>About project</b>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="close_btn" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </header>
            <div class="line_dividerX"></div>
            <div class="modal_body">
                <svg height="42" viewBox="0 0 292 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M29 1.73205C30.8564 0.660254 33.1436 0.660254 35 1.73205L56.7128 14.2679C58.5692 15.3397 59.7128 17.3205 59.7128 19.4641V44.5359C59.7128 46.6795 58.5692 48.6603 56.7128 49.7321L35 62.2679C33.1436 63.3397 30.8564 63.3397 29 62.2679L7.28719 49.7321C5.43078 48.6603 4.28719 46.6795 4.28719 44.5359V19.4641C4.28719 17.3205 5.43078 15.3397 7.28719 14.2679L29 1.73205Z" fill="url(#paint0_linear_168_2)"/>
                    <rect x="21.6569" y="27.0711" width="18" height="8" rx="1" transform="rotate(45 21.6569 27.0711)" fill="#F1F3F9" fill-opacity="0.66"/>
                    <rect x="42.8701" y="20" width="8" height="28" rx="1" transform="rotate(45 42.8701 20)" fill="#F1F3F9"/>
                    <path d="M100.711 22.125H91.0547V51H85.4766V22.125H75.8438V17.3906H100.711V22.125ZM110.977 51.5625C107.273 51.5625 104.312 50.4453 102.094 48.2109C99.8906 45.9609 98.7891 42.9844 98.7891 39.2812C98.7891 35.25 99.9375 32.1016 102.234 29.8359C104.547 27.5703 107.656 26.4375 111.562 26.4375C115.312 26.4375 118.234 27.5391 120.328 29.7422C122.422 31.9453 123.469 35 123.469 38.9062C123.469 42.7344 122.336 45.8047 120.07 48.1172C117.82 50.4141 114.789 51.5625 110.977 51.5625ZM111.234 30.7734C109.109 30.7734 107.43 31.5156 106.195 33C104.961 34.4844 104.344 36.5312 104.344 39.1406C104.344 41.6562 104.969 43.6406 106.219 45.0938C107.469 46.5312 109.141 47.25 111.234 47.25C113.375 47.25 115.016 46.5391 116.156 45.1172C117.312 43.6953 117.891 41.6719 117.891 39.0469C117.891 36.4062 117.312 34.3672 116.156 32.9297C115.016 31.4922 113.375 30.7734 111.234 30.7734ZM142.852 51V17.3906H152.555C164.945 17.3906 171.141 22.8516 171.141 33.7734C171.141 38.9609 169.422 43.1328 165.984 46.2891C162.547 49.4297 157.938 51 152.156 51H142.852ZM148.406 22.125V46.2891H152.859C156.781 46.2891 159.828 45.2109 162 43.0547C164.188 40.8984 165.281 37.8516 165.281 33.9141C165.281 26.0547 161.211 22.125 153.07 22.125H148.406ZM187.336 51.5625C183.633 51.5625 180.672 50.4453 178.453 48.2109C176.25 45.9609 175.148 42.9844 175.148 39.2812C175.148 35.25 176.297 32.1016 178.594 29.8359C180.906 27.5703 184.016 26.4375 187.922 26.4375C191.672 26.4375 194.594 27.5391 196.688 29.7422C198.781 31.9453 199.828 35 199.828 38.9062C199.828 42.7344 198.695 45.8047 196.43 48.1172C194.18 50.4141 191.148 51.5625 187.336 51.5625ZM187.594 30.7734C185.469 30.7734 183.789 31.5156 182.555 33C181.32 34.4844 180.703 36.5312 180.703 39.1406C180.703 41.6562 181.328 43.6406 182.578 45.0938C183.828 46.5312 185.5 47.25 187.594 47.25C189.734 47.25 191.375 46.5391 192.516 45.1172C193.672 43.6953 194.25 41.6719 194.25 39.0469C194.25 36.4062 193.672 34.3672 192.516 32.9297C191.375 31.4922 189.734 30.7734 187.594 30.7734ZM237.82 51H219.211V17.3906H224.789V46.2891H237.82V51ZM244.828 21.9609C243.938 21.9609 243.172 21.6719 242.531 21.0938C241.906 20.5156 241.594 19.7812 241.594 18.8906C241.594 18 241.906 17.2578 242.531 16.6641C243.172 16.0703 243.938 15.7734 244.828 15.7734C245.75 15.7734 246.531 16.0703 247.172 16.6641C247.812 17.2578 248.133 18 248.133 18.8906C248.133 19.7344 247.812 20.4609 247.172 21.0703C246.531 21.6641 245.75 21.9609 244.828 21.9609ZM247.523 51H242.086V27H247.523V51ZM253.148 50.25V45.2109C255.18 46.7578 257.422 47.5312 259.875 47.5312C263.156 47.5312 264.797 46.5625 264.797 44.625C264.797 44.0781 264.656 43.6172 264.375 43.2422C264.094 42.8516 263.711 42.5078 263.227 42.2109C262.758 41.9141 262.195 41.6484 261.539 41.4141C260.898 41.1797 260.18 40.9141 259.383 40.6172C258.398 40.2266 257.508 39.8125 256.711 39.375C255.93 38.9375 255.273 38.4453 254.742 37.8984C254.227 37.3359 253.836 36.7031 253.57 36C253.305 35.2969 253.172 34.4766 253.172 33.5391C253.172 32.3828 253.445 31.3672 253.992 30.4922C254.539 29.6016 255.273 28.8594 256.195 28.2656C257.117 27.6562 258.164 27.2031 259.336 26.9062C260.508 26.5938 261.719 26.4375 262.969 26.4375C265.188 26.4375 267.172 26.7734 268.922 27.4453V32.2031C267.234 31.0469 265.297 30.4688 263.109 30.4688C262.422 30.4688 261.797 30.5391 261.234 30.6797C260.688 30.8203 260.219 31.0156 259.828 31.2656C259.438 31.5156 259.133 31.8203 258.914 32.1797C258.695 32.5234 258.586 32.9062 258.586 33.3281C258.586 33.8438 258.695 34.2812 258.914 34.6406C259.133 35 259.453 35.3203 259.875 35.6016C260.312 35.8672 260.828 36.1172 261.422 36.3516C262.031 36.5703 262.727 36.8125 263.508 37.0781C264.539 37.5 265.461 37.9297 266.273 38.3672C267.102 38.8047 267.805 39.3047 268.383 39.8672C268.961 40.4141 269.406 41.0547 269.719 41.7891C270.031 42.5078 270.188 43.3672 270.188 44.3672C270.188 45.5859 269.906 46.6484 269.344 47.5547C268.781 48.4609 268.031 49.2109 267.094 49.8047C266.156 50.3984 265.07 50.8359 263.836 51.1172C262.617 51.4141 261.328 51.5625 259.969 51.5625C257.344 51.5625 255.07 51.125 253.148 50.25ZM288.023 50.7422C286.961 51.2734 285.562 51.5391 283.828 51.5391C279.172 51.5391 276.844 49.3047 276.844 44.8359V31.2656H272.836V27H276.844V21.4453L282.281 19.8984V27H288.023V31.2656H282.281V43.2656C282.281 44.6875 282.539 45.7031 283.055 46.3125C283.57 46.9219 284.43 47.2266 285.633 47.2266C286.555 47.2266 287.352 46.9609 288.023 46.4297V50.7422Z" fill="var(--text)"/>
                    <defs>
                    <linearGradient id="paint0_linear_168_2" x1="18" y1="8.5" x2="47.5" y2="55" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#1A73E8"/>
                    <stop offset="1" stop-color="#0035FF"/>
                    </linearGradient>
                    </defs>
                </svg>
                <p>This project can list all you want to do for today based on what you save on it. Your to do list can be categorize and won't lost the data when you reload your browser. It is best to combine with a browser extension new tab changer.</p>
            </div>
            <div class="line_dividerX"></div>
            <footer class="form_footer" id="about_project_footer">
                <p>Last updated 10/5/2022</p>
                <a href="https://github.com/MinecraftJohn/to-do-list" target="_blank" rel="noopener noreferrer">Visit Github for more info.</a>
            </footer>
        </div>
    `;
    document.getElementsByClassName("close_btn")[0].onclick = closeAboutProject;
    var modalContainer = document.getElementById("about_project_container");
    setTimeout(function() {
        modalContainer.style.transform = "translate(-50%, -50%)";
        modalContainer.style.opacity = "1";
    }, 0);
}

function closeAboutProject() {
    document.getElementById("about_project_section").remove();
}
aboutProject.onclick = openAboutProject;
// #########################################
function openSettings() {
    var settingsSection = document.createElement("div");
    pageBody[0].appendChild(settingsSection);
    settingsSection.setAttribute("id", "settings_section");
    settingsSection.setAttribute("class", "modal_bg");
    settingsSection.innerHTML = `
        <form id="settings_container" class="modal_container">
            <header class="modal_header">
                <b>Settings</b>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="close_btn" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </header>
            <div class="line_dividerX"></div>
            <div class="modal_body settings_body">
                <div class="settings_block">
                    <div id="background_image_preview"></div>
                    <a class="a_btn">Change background image</a>
                </div>
                <div class="settings_block settings_block_container">
                    <p>Use 24-hour format</p>
                    <label class="toggle_switch" for="toggle_switch_checkbox">
                        <input type="checkbox" id="toggle_switch_checkbox"/>
                        <div></div>
                    </label>
                </div>
            </div>
            <div class="line_dividerX"></div>
            <footer class="form_footer" id="settings_footer">
                <button id="settings_save_btn">Save changes</button>
            </footer>
        </form>
    `;
    document.getElementsByClassName("close_btn")[0].onclick = closeSettings;
    var modalContainer = document.getElementById("settings_container");
    setTimeout(function() {
        modalContainer.style.transform = "translate(-50%, -50%)";
        modalContainer.style.opacity = "1";
    }, 0);
}

function closeSettings() {
    document.getElementById("settings_section").remove();
}
settings.onclick = openSettings;