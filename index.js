// async function sayHello() {
//     let [tab] = await chrome.tabs.query({ active: true })
//     chrome.scripting.executeScript({
//         target: { tabId: tab.id },
//         func: () => {
//             alert('Hellooooo!')
//         }
//     })
// }
// document.getElementById("myButton").addEventListener("click", sayHello)

const toggleButton = document.getElementById("toggleButton");

// Get the current state from storage
chrome.storage.local.get(["isEnabled"], (result) => {
  const isEnabled = result.isEnabled !== false; // Default to true
  toggleButton.textContent = isEnabled ? "Turn Off" : "Turn On";
});

// Handle button click
toggleButton.addEventListener("click", () => {
  chrome.storage.local.get(["isEnabled"], (result) => {
    const isEnabled = result.isEnabled !== false; // Default to true
    const newState = !isEnabled;

    // Update the button text
    toggleButton.textContent = newState ? "Turn Off" : "Turn On";

    // Save the new state
    chrome.storage.local.set({ isEnabled: newState }, () => {
      console.log("Extension is now " + (newState ? "enabled" : "disabled"));
    });
  });
});
