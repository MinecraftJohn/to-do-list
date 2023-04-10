editUserBtn[0].onclick = () => {
    var editUserSection = document.createElement("div"),
        fileInputDOM = `<div id="change_picture_btn"><label for="profile">Change</label></div>`,
        profileImgDOM = `<img id="edit_user_account_picture" alt="User Profile" src="data:image/png;base64,${lsProfile}">${fileInputDOM}`;
    pageBody[0].appendChild(editUserSection);
    editUserSection.setAttribute("id", "edit_user_section");
    editUserSection.setAttribute("class", "modal_bg");
    editUserSection.innerHTML = `
        <form class="modal_container" autocomplete="off">
            <header class="modal_header">
                <b>Edit profile</b>
                <i class="close_btn">&#xe8bb;</i>
            </header>
            <div class="line_dividerX"></div>
            <main class="form_body">
                <div id="edit_user_account_profile"></div>
                <input type="file" class="hidden" id="profile" accept=".png, .jpg, .jpeg"/>
                <input type="text" class="input_text" id="change_username" placeholder="Enter a name" maxlength="30">
            </main>
            <div class="line_dividerX"></div>
            <footer class="form_footer">
                <p class="form_error hidden"></p>
                <button id="save_btn">Save</button>
            </footer>
        </form>`;
    
    var userProfile = document.querySelector("#edit_user_account_profile"),
        input = document.querySelector("#change_username"),
        saveBtn = document.querySelector("#save_btn"),
        errorMsg = document.querySelector(".form_error"),
        profile = document.querySelector("#profile"),
        fileReader = new FileReader();

    closeMenu("edit_user_section");
    
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
            document.querySelector("#edit_user_account_picture").src = fileReader.result;
        };
        if (profile.files[0]) {
            fileReader.readAsDataURL(profile.files[0]);
        };
    };

    saveBtn.onclick = (e) => {
        const inputValue = input.value.trim().toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
        function errorInput(msg) {
            e.preventDefault();
            errorMsg.classList.remove("hidden");
            errorMsg.innerText = msg;
        }
        if (inputValue.match(/^[a-zA-ZÑñ]+(?: [a-zA-ZÑñ-]+)*$/) && inputValue.length < 33) {
            e.preventDefault();
            localStorage.setItem("username", inputValue);
            if (fileReader.readyState == 2) {
                const base64String = fileReader.result
                    .replace('data:', '')
                    .replace(/^.+,/, '');
                localStorage.setItem("profile", base64String);
                lsProfile = localStorage.getItem("profile");
            }
            lsUsername = localStorage.getItem("username");
            updateUser();
            document.querySelector(".close_btn").click();
        } else if (inputValue == "") {
            errorInput("Your input name is empty");
        } else {
            errorInput("Number is not allowed");
        }
    };
};