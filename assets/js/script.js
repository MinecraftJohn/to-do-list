var headerTime = document.getElementById("time"),
    headerDate = document.getElementById("date"),
    greetings = document.getElementById("greetings"),
    username = document.getElementById("username"),
    pageBody = document.getElementsByTagName("body"),
    editUserBtn = document.getElementsByClassName("setting_edit_user_btn");

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

editUserBtn[0].onclick = openProfileSetting;

function openProfileSetting() {
    var editUserSection = document.createElement("div");
    pageBody[0].appendChild(editUserSection);
    editUserSection.setAttribute("id", "edit_user_section");
    editUserSection.innerHTML = `
        <div id="edit_user_section">
            <form id="edit_user_form" action="">
                <header class="form_header">
                    <p class="form_title">Edit Profile</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="close_btn" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                </header>
                <div class="line_dividerX"></div>
                <div class="form_body">
                    <div id="edit_user_account_profile">
                        <img id="edit_user_account_picture" src="assets/img/default-user-profile.png" alt="User Profile">
                        <div id="change_picture_btn">Change</div>
                    </div>
                    <input type="text" id="change_username" placeholder="Enter a name">
                </div>
                <div class="line_dividerX"></div>
                <footer class="form_footer">
                    <button id="edit_user_save_btn">Save</button>
                </footer>
            </form>
        </div>`;
    document.getElementsByClassName("close_btn")[0].onclick = closeProfileSetting;
    setTimeout(function() {
        var form = document.getElementById("edit_user_form");
        form.style.transform = "translate(-50%, -50%)";
        form.style.opacity = "1";
    }, 0);
}

function closeProfileSetting() {
    document.getElementById("edit_user_section").remove();
}