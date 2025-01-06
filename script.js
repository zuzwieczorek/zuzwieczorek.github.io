document.addEventListener("DOMContentLoaded", function () {
  const quoteElement = document.getElementById("quote");
  const buttonContainer = document.getElementById("button-container");
  const secondaryButtons = document.getElementById("secondary-buttons");
  const outputElement = document.querySelector(".output");

  let buttonsClicked = 0; // Counter to track number of buttons clicked

  // Show the first set of buttons when the page loads
  quoteElement.addEventListener("click", function () {
    buttonContainer.style.display = "grid"; // Show the first grid of buttons
    quoteElement.style.display = "none"; // Hide the initial quote button
  });

  // Function to handle button clicks (both first 4 and Feel/Seem)
  function handleButtonClick(button, nextContainer) {
    const gifSrc = button.getAttribute("data-src");
    outputElement.innerHTML = `<img src="${gifSrc}" alt="GIF">`; // Show the GIF
    outputElement.style.display = "flex"; // Show the output
    button.style.display = "none"; // Hide the button that was clicked
    buttonContainer.style.display = "none"; // Hide the grid of buttons
    secondaryButtons.style.display = "none"; // Hide secondary buttons if they are visible

    // Add a back button
    const backBtn = document.createElement("button");
    backBtn.id = "back-btn";
    backBtn.textContent = "Back";
    backBtn.addEventListener("click", function () {
      outputElement.style.display = "none"; // Hide the GIF
      if (buttonsClicked < 4) {
        // If less than 4 buttons clicked, show the first grid again
        buttonContainer.style.display = "grid";
      } else if (buttonsClicked === 4) {
        // If all 4 buttons clicked, show the secondary buttons
        secondaryButtons.style.display = "grid";
      } else {
        // If all interactions are finished, go back to the quote
        quoteElement.style.display = "block";
      }
    });
    outputElement.appendChild(backBtn);
  }

  // Add event listeners to the first grid buttons (4 buttons)
  const items = buttonContainer.querySelectorAll(".item");
  items.forEach((item) => {
    item.addEventListener("click", function () {
      buttonsClicked++;
      handleButtonClick(item, buttonContainer); // Handle click and disappear
    });
  });

  // Add event listeners to the secondary buttons (Feel and Seem)
  const secondaryItems = secondaryButtons.querySelectorAll(".item");
  secondaryItems.forEach((item) => {
    item.addEventListener("click", function () {
      handleButtonClick(item, null); // Handle the secondary button click
    });
  });
});
