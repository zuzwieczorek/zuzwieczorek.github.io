document.addEventListener("DOMContentLoaded", function () {
  const quoteElement = document.getElementById("quote");
  const buttonContainer = document.getElementById("button-container");
  const secondaryButtons = document.getElementById("secondary-buttons");
  const outputElement = document.querySelector(".output");

  let clickedCount = 0;

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
      outputElement.style.display = "flex"; // Show the GIF
      button.style.display = "none"; // Hide the clicked button
      clickedCount++;

      // Add a back button to exit the GIF view
      const backBtn = document.createElement("button");
      backBtn.id = "back-btn";
      backBtn.textContent = "Back";
      backBtn.addEventListener("click", function () {
        outputElement.style.display = "none"; // Hide the GIF
        if (clickedCount === 4) {
          // If all four buttons are clicked, show the secondary buttons
          secondaryButtons.style.display = "grid";
        } else {
          buttonContainer.style.display = "grid"; // Show the first grid again
        }
        backBtn.remove(); // Remove the back button
      });
      outputElement.appendChild(backBtn);
    }

    // Add event listeners to the first grid buttons
    const items = buttonContainer.querySelectorAll(".item");
    items.forEach((item) => {
      item.addEventListener("click", function () {
        handleButtonClick(item); // Handle each button click
      });
    });

    // Add event listeners to the secondary buttons (Feel and Seem)
    const secondaryItems = secondaryButtons.querySelectorAll(".item");
    secondaryItems.forEach((item) => {
      item.addEventListener("click", function () {
        const gifSrc = item.getAttribute("data-src");
        outputElement.innerHTML = `<img src="${gifSrc}" alt="GIF">`; // Show the GIF
        outputElement.style.display = "flex"; // Show the output
        secondaryButtons.style.display = "none"; // Hide secondary buttons after click

        // Add a back button to exit the GIF view
        const backBtn = document.createElement("button");
        backBtn.id = "back-btn";
        backBtn.textContent = "Back";
        backBtn.addEventListener("click", function () {
          outputElement.style.display = "none"; // Hide the GIF
          secondaryButtons.style.display = "grid"; // Show secondary buttons again
          backBtn.remove(); // Remove the back button
        });
        outputElement.appendChild(backBtn);
      });
    });
  }
});
