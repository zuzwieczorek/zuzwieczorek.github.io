document.addEventListener("DOMContentLoaded", function () {
  const quoteElement = document.getElementById("quote");
  const buttonContainer = document.getElementById("button-container");
  const secondaryButtons = document.getElementById("secondary-buttons");
  const outputElement = document.querySelector(".output");

  let clickedButtonsCount = 0;

  if (quoteElement && buttonContainer && secondaryButtons && outputElement) {
    // Show the first button when page loads
    quoteElement.addEventListener("click", function () {
      buttonContainer.style.display = "grid"; // Show the first grid of buttons
      quoteElement.style.display = "none"; // Hide the initial quote button
    });

    // Function to handle button clicks
    function handleButtonClick(button) {
      const gifSrc = button.getAttribute("data-src");
      outputElement.innerHTML = `<img src="${gifSrc}" alt="GIF">`; // Show the GIF
      outputElement.style.display = "flex"; // Show the output (GIF)
      button.style.display = "none"; // Hide the clicked button
      clickedButtonsCount++;

      // Add a back button
      const backBtn = document.createElement("button");
      backBtn.id = "back-btn";
      backBtn.textContent = "Back";
      backBtn.addEventListener("click", function () {
        outputElement.style.display = "none"; // Hide GIF
        // Only show the secondary buttons if all 4 first buttons are clicked
        if (clickedButtonsCount === 4) {
          secondaryButtons.style.display = "grid"; // Show secondary buttons after 4 clicks
        } else {
          buttonContainer.style.display = "grid"; // Go back to the grid of buttons
        }
      });
      outputElement.appendChild(backBtn); // Add the back button to the output section

      // Show "Feel" and "Seem" buttons when all 4 buttons are clicked
      if (clickedButtonsCount === 4) {
        setTimeout(function () {
          secondaryButtons.style.display = "grid"; // Show secondary buttons after 4 clicks
        }, 500);
      }
    }

    // Add event listeners to the first grid buttons
    const items = buttonContainer.querySelectorAll(".item");
    items.forEach((item) => {
      item.addEventListener("click", function () {
        handleButtonClick(item); // Pass clicked button to handle button click
      });
    });

    // Add event listeners to the secondary buttons (Feel and Seem)
    const secondaryItems = secondaryButtons.querySelectorAll(".item");
    secondaryItems.forEach((item) => {
      item.addEventListener("click", function () {
        outputElement.innerHTML = `<img src="${item.getAttribute('data-src')}" alt="GIF">`; // Show the GIF
        outputElement.style.display = "flex"; // Show the output (GIF)
        item.style.display = "none"; // Hide the clicked secondary button
        clickedButtonsCount++; // Count the button click

        // After one secondary button is clicked, the other will stay
        if (clickedButtonsCount === 5) {
          setTimeout(function () {
            // Once the last button is clicked, everything disappears and the background goes black
            outputElement.style.display = "none";
            secondaryButtons.style.display = "none";
            buttonContainer.style.display = "none";
            quoteElement.style.display = "none";
            document.body.style.backgroundColor = "black"; // Set background to black
          }, 500);
        }
      });
    });
  }
});
