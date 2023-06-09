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
                        <button id="img_internet_save_btn" disabled>Change</button>
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

    closeMenu("settings_section");
    
    // ######################################
    // #      Variables and Functions       #
    // ######################################
    var bgImagePreview = document.querySelector("#background_image_preview"),
        previewTime = document.querySelector("#setting_time"),
        previewDate = document.querySelector("#setting_date"),
        lsBGImage = localStorage.getItem("backgroundImage"),
        imgBlock = document.querySelectorAll(".img_block"),
        darkmodeInput = document.querySelector("#darkmode"),
        accentPicker = document.querySelector("#accent_picker"),
        acColors = document.querySelectorAll(".ac_colors"),
        hourFormatInput = document.getElementById("24hour"),
        lsAcColor = localStorage.getItem("accentColor"),
        enterLink = document.querySelector("#img_internet_input"),
        enterLinkBtn = document.querySelector("#img_internet_save_btn"),
        errorMsg = document.querySelectorAll(".form_error");

    function updateWallpaper(n) {
        changeBGImage(n, wallpaper[n]);
        bgImage(bgImagePreview);
        bgImage(pageHeader);
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

    function attPicked(i) {accentPicker.setAttribute("value", i)}

    function updateColor(n) {
        changeAccentColor(color[n], n);
        setAccentText();
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

    if (JSON.parse(localStorage.getItem("24hour")) === true) {hourFormatInput.setAttribute("checked", "")}

    if (JSON.parse(localStorage.getItem("darkmode")) === true) {darkmodeInput.setAttribute("checked", "")}

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
    imgBlock[0].onclick = () => {updateWallpaper(0)};

    imgBlock[1].onclick = () => {updateWallpaper(1)};

    imgBlock[2].onclick = () => {updateWallpaper(2)};

    imgBlock[3].onclick = () => {updateWallpaper(3)};

    imgBlock[4].onclick = () => {updateWallpaper(4)};

    imgBlock[5].onclick = () => {updateWallpaper(5)};

    enterLink.oninput = () => {
        if (enterLink.value == "" || enterLink.value.match(/\s/)) {
            enterLinkBtn.setAttribute("disabled", "");
        } else {
            enterLinkBtn.removeAttribute("disabled");
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

    acColors[0].onclick = () => {updateColor(0)};

    acColors[1].onclick = () => {updateColor(1)};

    acColors[2].onclick = () => {updateColor(2)};

    acColors[3].onclick = () => {updateColor(3)};

    acColors[4].onclick = () => {updateColor(4)};

    acColors[5].onclick = () => {updateColor(5)};

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