document.addEventListener("DOMContentLoaded", function () {
  const quoteElement = document.getElementById("quote");
  const buttonContainer = document.getElementById("button-container");
  const secondaryButtons = document.getElementById("secondary-buttons");
  const outputElement = document.querySelector(".output");

  let clickedButtonsCount = 0;
  let clickedSecondaryButtonsCount = 0;

  if (quoteElement && buttonContainer && secondaryButtons && outputElement) {
    // Show the first button when page loads
    quoteElement.addEventListener("click", function () {
      buttonContainer.style.display = "grid"; // Show the first grid of buttons
      quoteElement.style.display = "none"; // Hide the initial quote button
    });

    // Function to handle button clicks
    function handleButtonClick(button, nextContainer, isSecondary = false) {
      const gifSrc = button.getAttribute("data-src");
      outputElement.innerHTML = `<img src="${gifSrc}" alt="GIF">`; // Show the GIF
      outputElement.style.display = "flex"; // Show the output
      if (isSecondary) {
        clickedSecondaryButtonsCount++;
      } else {
        clickedButtonsCount++;
      }

      // Add a back button
      const backBtn = document.createElement("button");
      backBtn.id = "back-btn";
      backBtn.textContent = "Back";
      backBtn.addEventListener("click", function () {
        outputElement.style.display = "none"; // Hide GIF
        if (isSecondary) {
          // If we are in the secondary grid (Feel/Seem)
          if (clickedSecondaryButtonsCount < 2) {
            secondaryButtons.style.display = "grid"; // Show Feel and Seem if there is one button left
          } else {
            secondaryButtons.style.display = "none"; // Otherwise hide Feel and Seem
          }
        } else {
          // If we are in the primary grid (4 buttons)
          if (clickedButtonsCount < 4) {
            buttonContainer.style.display = "grid"; // Show remaining primary buttons
          } else {
            // Show Feel and Seem after the last of the 4 buttons is clicked and back is pressed
            secondaryButtons.style.display = "grid"; // Show secondary buttons after the 4th button click and back
            buttonContainer.style.display = "none"; // Hide the primary button grid
          }
        }

        // After both secondary buttons are clicked, hide everything and make the screen black
        if (clickedSecondaryButtonsCount === 2) {
          setTimeout(function () {
            outputElement.style.display = "none";
            secondaryButtons.style.display = "none";
            buttonContainer.style.display = "none";
            quoteElement.style.display = "none";
            document.body.style.backgroundColor = "black"; // Set background to black
          }, 500);
        }
      });
      outputElement.appendChild(backBtn);

      // If it's the last secondary button (Feel/Seem), do not hide it until back is clicked
      if (isSecondary && clickedSecondaryButtonsCount < 2) {
        button.style.display = "none"; // Hide the clicked secondary button
      }
    }

    // Add event listeners to the first grid buttons
    const items = buttonContainer.querySelectorAll(".item");
    items.forEach((item) => {
      item.addEventListener("click", function () {
        handleButtonClick(item, buttonContainer);
        item.style.display = "none"; // Hide the clicked primary button
      });
    });

    // Add event listeners to the secondary buttons (Feel and Seem)
    const secondaryItems = secondaryButtons.querySelectorAll(".item");
    secondaryItems.forEach((item) => {
      item.addEventListener("click", function () {
        handleButtonClick(item, null, true); // True signifies it's a secondary button
        item.style.display = "none"; // Hide the clicked secondary button
      });
    });
  }
});
