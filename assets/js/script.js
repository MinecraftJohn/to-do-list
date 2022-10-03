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
            <div class="line_dividerX"></div>
            <footer class="form_footer">
                <p>Last updated 10/3/2022</p>
                <a href="https://github.com/MinecraftJohn/to-do-list" target="_blank" rel="noopener noreferrer">Visit Github Repository Project for more info.</a>
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