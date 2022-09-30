var headerTime = document.getElementById("time"),
    headerDate = document.getElementById("date"),
    greetings = document.getElementById("greetings");

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