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
    function handleButtonClick(button) {
      const gifSrc = button.getAttribute("data-src");
      outputElement.innerHTML = `<img src="${gifSrc}" alt="GIF">`;
      outputElement.style.display = "flex";

      button.style.display = "none"; // Hide the clicked button
      clickedCount++; // Increment click count

      // If all buttons are clicked, prepare to show secondary buttons
      if (clickedCount === totalButtons) {
        buttonContainer.style.display = "none";
      }

      // Add a back button
      const backBtn = document.createElement("button");
      backBtn.id = "back-btn";
      backBtn.textContent = "Back";
      backBtn.addEventListener("click", function () {
        outputElement.style.display = "none"; // Hide the GIF
        outputElement.innerHTML = ""; // Clear the output
        if (clickedCount === totalButtons) {
          // Show secondary buttons when all initial buttons are clicked
          secondaryButtons.style.display = "grid";
        } else {
          buttonContainer.style.display = "grid"; // Show the grid again
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
        const gifSrc = item.getAttribute("data-src");
        outputElement.innerHTML = `<img src="${gifSrc}" alt="GIF">`;
        outputElement.style.display = "flex";
        secondaryButtons.style.display = "none"; // Hide secondary buttons

        // Add a back button for secondary buttons
        const backBtn = document.createElement("button");
        backBtn.id = "back-btn-secondary";
        backBtn.textContent = "Back";
        backBtn.addEventListener("click", function () {
          outputElement.style.display = "none";
          secondaryButtons.style.display = "grid"; // Show secondary buttons again
        });
        outputElement.appendChild(backBtn);
      });
    });
  }
});
