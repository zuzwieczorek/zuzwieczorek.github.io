document.addEventListener("DOMContentLoaded", function () {
  const quoteElement = document.getElementById("quote");
  const buttonContainer = document.getElementById("button-container");
  const secondaryButtons = document.getElementById("secondary-buttons");
  const outputElement = document.querySelector(".output");

  let primaryClickedCount = 0; // Track clicks on primary buttons
  let secondaryClickedCount = 0; // Track clicks on secondary buttons

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
          // Handle primary button logic
          primaryClickedCount--;
          button.style.display = "block";

          if (primaryClickedCount < buttonContainer.querySelectorAll(".item").length) {
            buttonContainer.style.display = "grid";
          }
        } else {
          // Handle secondary button logic
          secondaryClickedCount--;
          button.style.display = "block";

          if (secondaryClickedCount < secondaryButtons.querySelectorAll(".item").length) {
            secondaryButtons.style.display = "grid";
          }
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

        // Show secondary buttons if all primary buttons are clicked
        if (primaryClickedCount === primaryItems.length) {
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

        // Hide secondary buttons when both are clicked
        if (secondaryClickedCount === secondaryItems.length) {
          secondaryButtons.style.display = "none";
        }
      });
    });
  }
});
