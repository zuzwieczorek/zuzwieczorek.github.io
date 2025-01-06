document.addEventListener("DOMContentLoaded", function () {
  const quoteElement = document.getElementById("quote");
  const buttonContainer = document.getElementById("button-container");
  const secondaryButtons = document.getElementById("secondary-buttons");
  const outputElement = document.querySelector(".output");

  if (quoteElement && buttonContainer && secondaryButtons && outputElement) {
    // Show the first button when the page loads
    quoteElement.addEventListener("click", function () {
      buttonContainer.style.display = "grid"; // Show the first grid of buttons
      quoteElement.style.display = "none"; // Hide the initial quote button
    });

    // Function to handle button clicks
    function handleButtonClick(button, nextContainer) {
      const gifSrc = button.getAttribute("data-src");
      outputElement.innerHTML = `<img src="${gifSrc}" alt="GIF">`; // Show the GIF
      outputElement.style.display = "flex"; // Show the output
      buttonContainer.style.display = "none"; // Hide all buttons
      secondaryButtons.style.display = "none"; // Hide secondary buttons

      // Add a back button
      const backBtn = document.createElement("button");
      backBtn.id = "back-btn";
      backBtn.textContent = "Back";
      backBtn.addEventListener("click", function () {
        outputElement.style.display = "none"; // Hide GIF
        if (nextContainer) {
          nextContainer.style.display = "grid"; // Show the next container
        } else {
          secondaryButtons.style.display = "grid"; // Show Feel/Seem buttons
        }
      });
      outputElement.appendChild(backBtn);
    }

    // Add event listeners to the first grid buttons
    const items = buttonContainer.querySelectorAll(".item");
    items.forEach((item, index) => {
      item.addEventListener("click", function () {
        handleButtonClick(item, buttonContainer); // Show GIF for the clicked button
        item.style.display = "none"; // Hide the clicked button
        if (index === items.length - 1) {
          secondaryButtons.style.display = "grid"; // Show Feel/Seem buttons after the last one
        }
      });
    });

    // Add event listeners to the secondary buttons (Feel and Seem)
    const secondaryItems = secondaryButtons.querySelectorAll(".item");
    secondaryItems.forEach((item) => {
      item.addEventListener("click", function () {
        handleButtonClick(item, null); // Show the selected GIF for Feel/Seem
        item.style.display = "none"; // Hide the clicked secondary button
      });
    });
  }
});
