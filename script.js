document.addEventListener("DOMContentLoaded", function () {
  const quoteElement = document.getElementById("quote");
  const buttonContainer = document.getElementById("button-container");
  const secondaryButtons = document.getElementById("secondary-buttons");
  const outputElement = document.querySelector(".output");

  let clickedCount = 0; // Track clicks on the secondary buttons
  let secondaryClicked = { feel: false, seem: false }; // Track individual secondary button states

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

      buttonContainer.style.display = "none"; // Hide primary grid
      secondaryButtons.style.display = "none"; // Hide secondary buttons
      button.style.display = "none"; // Hide the clicked button

      // Add a back button
      const backBtn = document.createElement("button");
      backBtn.id = "back-btn";
      backBtn.textContent = "Back";
      backBtn.style.marginTop = "10px"; // Add some spacing
      backBtn.addEventListener("click", function () {
        outputElement.style.display = "none"; // Hide GIF
        outputElement.innerHTML = ""; // Clear the output

        if (!isSecondary) {
          // If a primary button was clicked, return to primary grid
          buttonContainer.style.display = "grid";
        } else {
          // If a secondary button was clicked, show only remaining unclicked buttons
          if (!secondaryClicked.feel) {
            document.querySelector("#feel-button").style.display = "block";
          }
          if (!secondaryClicked.seem) {
            document.querySelector("#seem-button").style.display = "block";
          }
          secondaryButtons.style.display = "grid";

          // Hide the secondary grid if both are clicked
          if (clickedCount === 2) {
            secondaryButtons.style.display = "none";
          }
        }
        backBtn.remove(); // Remove the back button
      });
      outputElement.appendChild(backBtn);
    }

    // Add event listeners to the primary grid buttons
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
        const id = item.id;
        if (id === "feel-button") secondaryClicked.feel = true;
        if (id === "seem-button") secondaryClicked.seem = true;

        clickedCount++; // Increment the click count for secondary buttons
        handleButtonClick(item, true);
      });
    });
  }
});
