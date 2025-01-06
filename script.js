document.addEventListener("DOMContentLoaded", function () {
  const quoteElement = document.getElementById("quote");
  const buttonContainer = document.getElementById("button-container");
  const secondaryButtons = document.getElementById("secondary-buttons");
  const outputElement = document.querySelector(".output");

  let clickedCount = 0;
  let gifDisplayed = false;

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
      outputElement.style.display = "flex"; // Show the output
      button.style.display = "none"; // Hide the clicked button
      clickedCount++;

      if (clickedCount === 4 && !gifDisplayed) {
        gifDisplayed = true;
        // Once all 4 are clicked, show the "Back" button and prepare for Feel / Seem buttons
        const backBtn = document.createElement("button");
        backBtn.id = "back-btn";
        backBtn.textContent = "Back";
        backBtn.addEventListener("click", function () {
          // Hide the GIF and show secondary buttons (Feel / Seem)
          outputElement.style.display = "none";
          secondaryButtons.style.display = "grid";
        });
        outputElement.appendChild(backBtn);
      }
    }

    // Add event listeners to the first grid buttons
    const items = buttonContainer.querySelectorAll(".item");
    items.forEach((item) => {
      item.addEventListener("click", function () {
        handleButtonClick(item); // Call handleButtonClick when a button is clicked
      });
    });

    // Add event listeners to the secondary buttons (Feel and Seem)
    const secondaryItems = secondaryButtons.querySelectorAll(".item");
    secondaryItems.forEach((item) => {
      item.addEventListener("click", function () {
        outputElement.innerHTML = `<img src="${item.getAttribute('data-src')}" alt="GIF">`; // Show the GIF
        outputElement.style.display = "flex"; // Show the output
        secondaryButtons.style.display = "none"; // Hide secondary buttons after click
      });
    });
  }
});
