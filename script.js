document.addEventListener("DOMContentLoaded", function () {
  const quoteElement = document.getElementById("quote");
  const buttonContainer = document.getElementById("button-container");
  const secondaryButtons = document.getElementById("secondary-buttons");
  const outputElement = document.querySelector(".output");

  let clickedCount = 0; // Track clicks on secondary buttons
  let secondaryClicked = { feel: false, seem: false }; // Track which secondary buttons are clicked

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

      buttonContainer.style.display = "none";
      secondaryButtons.style.display = "none";
      button.style.display = "none";

      // Add a back button
      const backBtn = document.createElement("button");
      backBtn.id = "back-btn";
      backBtn.textContent = "Back";
      backBtn.style.marginTop = "10px";
      backBtn.addEventListener("click", function () {
        outputElement.style.display = "none";
        outputElement.innerHTML = "";

        if (!isSecondary) {
          buttonContainer.style.display = "grid";
        } else {
          // Show only unclicked secondary buttons
          if (!secondaryClicked.feel) {
            document.querySelector("#feel-button").style.display = "block";
          }
          if (!secondaryClicked.seem) {
            document.querySelector("#seem-button").style.display = "block";
          }
          secondaryButtons.style.display = "grid";

          if (clickedCount === 2) {
            secondaryButtons.style.display = "none"; // Hide all if both clicked
          }
        }
        backBtn.remove();
      });
      outputElement.appendChild(backBtn);
    }

    // Add event listeners to primary grid buttons
    const items = buttonContainer.querySelectorAll(".item");
    items.forEach((item) => {
      item.addEventListener("click", function () {
        handleButtonClick(item);
      });
    });

    // Add event listeners to secondary buttons
    const secondaryItems = secondaryButtons.querySelectorAll(".item");
    secondaryItems.forEach((item) => {
      item.addEventListener("click", function () {
        const id = item.id;
        if (id === "feel-button") secondaryClicked.feel = true;
        if (id === "seem-button") secondaryClicked.seem = true;

        clickedCount++;
        handleButtonClick(item, true);
      });
    });
  }
});
