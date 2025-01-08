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

      // Show GIF when the button is clicked
      outputElement.innerHTML = `<img src="${gifSrc}" alt="GIF">`;
      outputElement.style.display = "flex";

      button.style.display = "none"; // Hide the clicked button
      buttonContainer.style.display = "none"; // Hide the primary buttons
      secondaryButtons.style.display = "none"; // Hide the secondary buttons

      // Add a back button
      const backBtn = document.createElement("button");
      backBtn.id = "back-btn";
      backBtn.textContent = "Back";
      backBtn.style.marginTop = "10px";

      backBtn.addEventListener("click", function () {
        // Clear the GIF when going back
        outputElement.style.display = "none";
        outputElement.innerHTML = ""; // Clear the displayed GIF

        // Show the primary buttons if not all primary buttons are clicked
        if (primaryClickedCount < 4) {
          buttonContainer.style.display = "grid"; // Show primary buttons again
        } 
        // Show the secondary buttons if all primary buttons have been clicked
        else {
          secondaryButtons.style.display = "grid"; // Show secondary buttons only after all primary buttons are clicked
        }

        backBtn.remove(); // Remove the back button after going back
      });

      outputElement.appendChild(backBtn);
    }

    // Add event listeners to primary buttons
    const primaryItems = buttonContainer.querySelectorAll(".item");
    primaryItems.forEach((item) => {
      item.addEventListener("click", function () {
        primaryClickedCount++;
        handleButtonClick(item);

        // After clicking all primary buttons, show secondary buttons
        if (primaryClickedCount === primaryItems.length) {
          // The GIF will be displayed first before secondary buttons show
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
          secondaryButtons.style.display = "none"; // Hide secondary buttons after both are clicked
        }
      });
    });
  }
});
