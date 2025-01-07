document.addEventListener("DOMContentLoaded", function () {
  const quoteElement = document.getElementById("quote");
  const buttonContainer = document.getElementById("button-container");
  const secondaryButtons = document.getElementById("secondary-buttons");
  const outputElement = document.querySelector(".output");

  let clickedCount = 0; // To track how many buttons have been clicked
  const totalButtons = buttonContainer.querySelectorAll(".item").length;

  if (quoteElement && buttonContainer && secondaryButtons && outputElement) {
    // Show the first grid of buttons when the quote is clicked
    quoteElement.addEventListener("click", function () {
      buttonContainer.style.display = "grid";
      quoteElement.style.display = "none";
    });

    // Function to handle button clicks
    function handleButtonClick(button, isSecondary = false) {
      const gifSrc = button.getAttribute("data-src");
      outputElement.innerHTML = `<img src="${gifSrc}" alt="GIF">`;
      outputElement.style.display = "flex";

      buttonContainer.style.display = "none"; // Hide the buttons grid
      secondaryButtons.style.display = "none"; // Hide secondary buttons (if visible)
      button.style.display = "none"; // Hide the clicked button

      if (!isSecondary) {
        clickedCount++; // Increment click count for primary grid
      }

      // Add a back button
      const backBtn = document.createElement("button");
      backBtn.id = "back-btn";
      backBtn.textContent = "Back";
      backBtn.style.marginTop = "10px"; // Small margin for better appearance
      backBtn.addEventListener("click", function () {
        outputElement.style.display = "none"; // Hide the GIF
        outputElement.innerHTML = ""; // Clear the output

        if (clickedCount === totalButtons && !isSecondary) {
          // Show secondary buttons only if all primary buttons are clicked
          secondaryButtons.style.display = "grid";
        } else if (!isSecondary) {
          buttonContainer.style.display = "grid"; // Show the primary grid again
        } else {
          // After clicking secondary buttons, nothing further appears
          secondaryButtons.style.display = "none";
        }
      });
      outputElement.appendChild(backBtn);
    }

    // Add event listeners to the first grid buttons
    const items = buttonContainer.querySelectorAll(".item");
    items.forEach((item) => {
      item.addEventListener("click", function () {
        handleButtonClick(item);
      });
    });

    // Add event listeners to the secondary buttons (Feel and Seem)
    const secondaryItems = secondaryButtons.querySelectorAll(".item");
    secondaryItems.forEach((item) => {
      item.addEventListener("click", function () {
        handleButtonClick(item, true); // Indicate it's a secondary button
      });
    });
  }
});
