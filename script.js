document.addEventListener("DOMContentLoaded", function () {
  const quoteElement = document.getElementById("quote");
  const buttonContainer = document.getElementById("button-container");
  const secondaryButtons = document.getElementById("secondary-buttons");
  const outputElement = document.querySelector(".output");

  let buttonsClicked = 0; // To track button clicks

  // Show the first set of buttons when the quote is clicked
  quoteElement.addEventListener("click", function () {
    buttonContainer.style.display = "grid"; // Show the first grid of buttons
    quoteElement.style.display = "none"; // Hide the initial quote button
  });

  // Function to handle button clicks and make buttons disappear
  function handleButtonClick(button, nextContainer) {
    const gifSrc = button.getAttribute("data-src");
    outputElement.innerHTML = `<img src="${gifSrc}" alt="GIF">`; // Show the GIF
    outputElement.style.display = "flex"; // Show the GIF

    // Hide the button that was clicked
    button.style.display = "none";

    // After all buttons clicked, show secondary buttons
    if (buttonsClicked >= 4) {
      setTimeout(function () {
        secondaryButtons.style.display = "grid"; // Show the secondary buttons
      }, 300); // Delay showing secondary buttons until GIF is gone
    }

    // Add a back button
    const backBtn = document.createElement("button");
    backBtn.id = "back-btn";
    backBtn.textContent = "Back";
    backBtn.addEventListener("click", function () {
      outputElement.style.display = "none"; // Hide the GIF
      if (buttonsClicked < 4) {
        buttonContainer.style.display = "grid"; // Go back to the main grid
      } else if (buttonsClicked === 4) {
        secondaryButtons.style.display = "grid"; // Go to Feel and Seem buttons
      } else {
        quoteElement.style.display = "block"; // Final fallback to the quote
      }
    });
    outputElement.appendChild(backBtn);
  }

  // Add event listeners to the initial four buttons
  const items = buttonContainer.querySelectorAll(".item");
  items.forEach((item) => {
    item.addEventListener("click", function () {
      buttonsClicked++;
      handleButtonClick(item); // Handle the button click and disappear
    });
  });

  // Add event listeners to the secondary Feel and Seem buttons
  const secondaryItems = secondaryButtons.querySelectorAll(".item");
  secondaryItems.forEach((item) => {
    item.addEventListener("click", function () {
      handleButtonClick(item); // Handle secondary buttons
    });
  });
});
