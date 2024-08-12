// Prompt the user for their name using an alert
const userName = prompt("Please enter your name:");

// Set the input as the heading
if (userName) {
  document.getElementById("dynamicHeading").textContent = `Hi, ${userName}!`;
} else {
  document.getElementById("dynamicHeading").textContent = "Hi, Guest!";
}
