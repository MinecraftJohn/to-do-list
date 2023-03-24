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
        if (!clickMenu && clickBG) {closeAnimation()}
    }
    document.addEventListener('click', removeMenu);
    document.getElementsByClassName("close_btn")[0].onclick = closeAnimation;
    setTimeout(() => {modalContainer[0].setAttribute("id", "modal_container")}, 0);
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