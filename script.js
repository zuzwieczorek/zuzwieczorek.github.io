document.addEventListener("DOMContentLoaded", function () {
  const quoteElement = document.getElementById("quote");
  const buttonContainer = document.getElementById("button-container");
  const secondaryButtons = document.getElementById("secondary-buttons");
  const outputElement = document.querySelector(".output");

  let primaryClickedCount = 0; // Track clicks on primary buttons
  let secondaryClicked = { feel: false, seem: false }; // Track which secondary buttons are clicked
  let clickedCount = 0; // Track clicks on secondary buttons

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
          // Show primary grid if not all primary buttons are clicked
          primaryClickedCount--;
          if (primaryClickedCount < items.length) {
            buttonContainer.style.display = "grid";
          } else {
            secondaryButtons.style.display = "grid"; // Show secondary buttons
          }
        } else {
          // Show only unclicked secondary buttons
          if (!secondaryClicked.feel) {
            document.querySelector("#fee
