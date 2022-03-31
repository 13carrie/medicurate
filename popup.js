let toggleOnOffBtn = document.getElementById("toggleOnOffBtn");
let descriptionDiv = document.getElementById("description");


chrome.storage.sync.get("isDisabled", function (data) {
    toggleOnOffBtn.checked = !data.isDisabled;
    setDescriptionText(data.isDisabled);
});

// "listener" for if button is toggled

toggleOnOffBtn.onclick = function toggleOnOff(btn) {
    let isDisabled = !document.getElementById('toggleOnOffBtn').checked; //sets isDisabled = toggle
    setDescriptionText(isDisabled); // sets description text
    chrome.storage.sync.set({isDisabled: isDisabled}) //
};

function setDescriptionText(isDisabled) {
    if (isDisabled) {
        descriptionDiv.innerHTML = "Not curating your search results";
    } else {
        descriptionDiv.innerHTML = "Currently curating your search results";
    }
}