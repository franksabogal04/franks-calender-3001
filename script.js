const todayDate = luxon.DateTime.local().toFormat('cccc, LLL dd yyyy');
const currentDayElement = document.getElementById("currentDay");
currentDayElement.innerHTML = todayDate;

document.addEventListener("DOMContentLoaded", function () {
    
    // Add click event listeners to all save buttons
    var saveButtons = document.querySelectorAll(".custom-save-button");
    saveButtons.forEach(function (button) {
        button.addEventListener("click", function () {

            // Retrieve the description element and its value
            var descriptionElement = this.previousElementSibling;
            var text = descriptionElement.value;
            var time = this.parentNode.getAttribute("id");

            // Store the text in local storage using the time as the key
            localStorage.setItem(time, text);
        });
    });

    // Update the appearance of time blocks based on the current hour
    function updateTimeBlocks() {
        var currentHour = luxon.DateTime.local().hour;

        // Iterate over all time blocks
        var timeBlocks = document.getElementsByClassName("custom-time-block");


        for (var i = 0; i < timeBlocks.length; i++) {
            var timeBlock = timeBlocks[i];
            var blockId = timeBlock.getAttribute("id");
            var blockTime = parseInt(blockId.split("custom-hour-")[1]);

            // Set appropriate classes to indicate past, present, or future
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

    // Populate the description fields of specific time blocks with saved data from local storage

    document.getElementById("custom-hour-9").querySelector(".custom-description").value = localStorage.getItem("custom-hour-9");

    document.getElementById("custom-hour-10").querySelector(".custom-description").value = localStorage.getItem("custom-hour-10");

    document.getElementById("custom-hour-11").querySelector(".custom-description").value = localStorage.getItem("custom-hour-11");

    // Update the appearance of time blocks initially
    updateTimeBlocks();
});

