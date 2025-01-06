document.addEventListener("DOMContentLoaded", function () {
  const quoteElement = document.getElementById("quote");
  const buttonContainer = document.getElementById("button-container");
  const secondaryButtons = document.getElementById("secondary-buttons");
  const outputElement = document.querySelector(".output");

  let clickedButtonsCount = 0;

  quoteElement.addEventListener("click", function () {
    buttonContainer.style.display = "grid"; 
    quoteElement.style.display = "none"; 
  });

  function handleButtonClick(button) {
    const gifSrc = button.getAttribute("data-src");
    outputElement.innerHTML = `<img src="${gifSrc}" alt="GIF">`;
    outputElement.style.display = "flex";
    button.style.display = "none";
    clickedButtonsCount++;

    const backBtn = document.createElement("button");
    backBtn.textContent = "Back";
    backBtn.addEventListener("click", function () {
      outputElement.style.display = "none"; 
      buttonContainer.style.display = "grid"; 
    });
    outputElement.appendChild(backBtn);

    if (clickedButtonsCount === 4) {
      secondaryButtons.style.display = "grid"; 
    }
  }

  const items = buttonContainer.querySelectorAll(".item");
  items.forEach((item) => {
    item.addEventListener("click", function () {
      handleButtonClick(item); 
    });
  });

  const secondaryItems = secondaryButtons.querySelectorAll(".item");
  secondaryItems.forEach((item) => {
    item.addEventListener("click", function () {
      outputElement.innerHTML = `<img src="${item.getAttribute('data-src')}" alt="GIF">`;
      outputElement.style.display = "flex";
      item.style.display = "none"; 
      clickedButtonsCount++;

      if (clickedButtonsCount === 5) {
        outputElement.style.display = "none";
        secondaryButtons.style.display = "none";
        buttonContainer.style.display = "none";
        quoteElement.style.display = "none";
        document.body.style.backgroundColor = "black"; 
      }
    });
  });
});

