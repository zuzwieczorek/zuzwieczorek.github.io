document.addEventListener("DOMContentLoaded", function () {
  const quoteElement = document.getElementById("quote");
  const buttonContainer = document.getElementById("button-container");
  const secondaryButtons = document.getElementById("secondary-buttons");
  const outputElement = document.querySelector(".output");

  let primaryClickedCount = 0; // Track primary button clicks
  let secondaryClickedCount = 0; // Track secondary button clicks

  if (quoteElement && buttonContainer && secondaryButtons && outputElement) {
    // Show primary grid when the quote is clicked
    quoteElement.addEventListener("click", function () {
      buttonContainer.style.display = "grid";
      quoteElement.style.display = "none";
    });

    // Function to handle button clicks
    function handleButtonClick(button, isSecondary = false) {
      const gifSrc = button.getAttribute("data-src");
      outputElement.innerHTML = `<img src="${gifSrc}" alt="GIF">`;
      outputElement.style.display = "flex";

      button.style.display = "none"; // Hide the clicked button
      buttonContainer.style.display = "none";
      secondaryButtons.style.display = "none";

      // Add a back button
      const backBtn = document.createElement("button");
      backBtn.id = "back-btn";
      backBtn.textContent = "Back";
      backBtn.style.marginTop = "10px";

      backBtn.addEventListener("click", function () {
        outputElement.style.display = "none";
        outputElement.innerHTML = ""; // Clear previous GIF

        if (!isSecondary) {
          buttonContainer.style.display = "grid"; // Restore primary buttons
        } else {
          secondaryButtons.style.display = "grid"; // Restore secondary buttons
        }

        backBtn.remove();
      });

      outputElement.appendChild(backBtn);
    }

    // Add event listeners to primary buttons
    const primaryItems = buttonContainer.querySelectorAll(".item");
    primaryItems.forEach((item) => {
      item.addEventListener("click", function () {
        primaryClickedCount++;
        handleButtonClick(item);

        // Show secondary buttons when all primary buttons are clicked
        if (primaryClickedCount === primaryItems.length) {
          secondaryButtons.style.display = "grid";
          outputElement.innerHTML = ""; // Clear the GIF when switching to secondary buttons
        }
      });
    });

    // Add event listeners to secondary buttons
    const secondaryItems = secondaryButtons.querySelectorAll(".item");
    secondaryItems.forEach((item) => {
      item.addEventListener("click", function () {
        secondaryClickedCount++;
        handleButtonClick(item, true);

        // Hide secondary buttons if both are clicked
        if (secondaryClickedCount === secondaryItems.length) {
          secondaryButtons.style.display = "none";
        }
      });
    });
  }
});
