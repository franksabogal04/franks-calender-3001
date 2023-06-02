const todayDate = luxon.DateTime.local().toFormat('cccc, LLL dd yyyy');
const currentDayElement = document.getElementById("currentDay");
currentDayElement.innerHTML = todayDate;

document.addEventListener("DOMContentLoaded", function () {
    var saveButtons = document.querySelectorAll(".custom-save-button");
    saveButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            var descriptionElement = this.previousElementSibling;
            var text = descriptionElement.value;
            var time = this.parentNode.getAttribute("id");

            localStorage.setItem(time, text);
        });
    });

    function updateTimeBlocks() {
        var currentHour = luxon.DateTime.local().hour;

        var timeBlocks = document.getElementsByClassName("custom-time-block");
        for (var i = 0; i < timeBlocks.length; i++) {
            var timeBlock = timeBlocks[i];
            var blockId = timeBlock.getAttribute("id");
            var blockTime = parseInt(blockId.split("custom-hour-")[1]);

            if (blockTime < currentHour) {
                timeBlock.classList.remove("custom-future", "custom-present");
                timeBlock.classList.add("custom-past");
            } else if (blockTime === currentHour) {
                timeBlock.classList.remove("custom-past", "custom-future");
                timeBlock.classList.add("custom-present");
            } else {
                timeBlock.classList.remove("custom-past", "custom-present");
                timeBlock.classList.add("custom-future");
            }
        }
    }

    document.getElementById("custom-hour-9").querySelector(".custom-description").value = localStorage.getItem("custom-hour-9");
    document.getElementById("custom-hour-10").querySelector(".custom-description").value = localStorage.getItem("custom-hour-10");
    document.getElementById("custom-hour-11").querySelector(".custom-description").value = localStorage.getItem("custom-hour-11");

    updateTimeBlocks();
});

