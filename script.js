document.addEventListener("DOMContentLoaded", function () {
  const quoteElement = document.getElementById("quote");
  const buttonContainer = document.getElementById("button-container");
  const secondaryButtons = document.getElementById("secondary-buttons");
  const outputElement = document.querySelector(".output");

  let lastContainer = null; // Track the last container that was visible
  let isLastItemClicked = false; // Track if the last item in the first grid is clicked

  if (quoteElement && buttonContainer && secondaryButtons && outputElement) {
    // Show the first button when page loads
    quoteElement.addEventListener("click", function () {
      buttonContainer.style.display = "grid"; // Show the first grid of buttons
      quoteElement.style.display = "none"; // Hide the initial quote button
      lastContainer = buttonContainer; // Track the first grid
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
        if (isLastItemClicked) {
          // Show the secondary grid (Feel / Seem) after clicking the last item
          secondaryButtons.style.display = "grid";
          buttonContainer.style.display = "none";
        } else {
          lastContainer.style.display = "grid"; // Show the last container
        }
      });
      outputElement.appendChild(backBtn);
    }

    // Add event listeners to the first grid buttons
    const items = buttonContainer.querySelectorAll(".item");
    items.forEach((item, index) => {
      item.addEventListener("click", function () {
        if (index === items.length - 1) {
          // Track if the last item is clicked
          isLastItemClicked = true;
        }
        lastContainer = buttonContainer; // Track the first grid
        handleButtonClick(item, secondaryButtons); // Go to the secondary buttons
        buttonContainer.style.display = "none"; // Hide the first grid
      });
    });

    // Add event listeners to the secondary buttons (Feel and Seem)
    const secondaryItems = secondaryButtons.querySelectorAll(".item");
    secondaryItems.forEach((item) => {
      item.addEventListener("click", function () {
        lastContainer = secondaryButtons; // Track the second grid (Feel / Seem)
        handleButtonClick(item, null); // No next container, end the navigation here
      });
    });
  }
});
