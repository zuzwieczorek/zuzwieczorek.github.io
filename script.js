document.addEventListener("DOMContentLoaded", function () {
  const quoteElement = document.getElementById("quote");
  const buttonContainer = document.getElementById("button-container");
  const secondaryButtons = document.getElementById("secondary-buttons");
  const outputElement = document.querySelector(".output");

  let primaryClickedCount = 0; // Track how many primary buttons have been clicked
  let secondaryClickedCount = 0; // Track how many secondary buttons have been clicked

  if (quoteElement && buttonContainer && secondaryButtons && outputElement) {
    // Show the primary grid when the quote is clicked
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
        // Clear the GIF when going back
        outputElement.style.display = "none";
        outputElement.innerHTML = ""; // Clear the displayed GIF

        // Show primary or secondary buttons based on the progress
        if (primaryClickedCount === 4) {
          secondaryButtons.style.display = "grid"; // Show secondary buttons after all primary are clicked
        } else {
          buttonContainer.style.display = "grid"; // Show primary buttons if not all clicked
        }

        backBtn.remove(); // Remove the back button
      });

      outputElement.appendChild(backBtn);
    }

    // Add event listeners to primary buttons
    const primaryItems = buttonContainer.querySelectorAll(".item");
    primaryItems.forEach((item) => {
      item.addEventListener("click", function () {
        primaryClickedCount++;
        handleButtonClick(item);

        // Show secondary buttons only after all primary buttons are clicked
        if (primaryClickedCount === primaryItems.length) {
          // Clear the GIF if switching to secondary buttons
          outputElement.innerHTML = ""; 
          secondaryButtons.style.display = "grid"; 
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
