{\rtf1\ansi\ansicpg1252\cocoartf2758
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 document.addEventListener("DOMContentLoaded", function () \{\
  const quoteElement = document.getElementById("quote");\
  const buttonContainer = document.getElementById("button-container");\
  const secondaryButtons = document.getElementById("secondary-buttons");\
  const outputElement = document.querySelector(".output");\
\
  if (quoteElement && buttonContainer && secondaryButtons && outputElement) \{\
    // Show the first button when page loads\
    quoteElement.addEventListener("click", function () \{\
      buttonContainer.style.display = "grid"; // Show the first grid of buttons\
      quoteElement.style.display = "none"; // Hide the initial quote button\
    \});\
\
    // Function to handle button clicks\
    function handleButtonClick(button, nextContainer) \{\
      const gifSrc = button.getAttribute("data-src");\
      outputElement.innerHTML = `<img src="$\{gifSrc\}" alt="GIF">`; // Show the GIF\
      outputElement.style.display = "flex"; // Show the output\
      buttonContainer.style.display = "none"; // Hide all buttons\
      secondaryButtons.style.display = "none"; // Hide secondary buttons\
\
      // Add a back button\
      const backBtn = document.createElement("button");\
      backBtn.id = "back-btn";\
      backBtn.textContent = "Back";\
      backBtn.addEventListener("click", function () \{\
        outputElement.style.display = "none"; // Hide GIF\
        if (nextContainer) \{\
          nextContainer.style.display = "grid"; // Show the next container\
        \} else \{\
          quoteElement.style.display = "block"; // Show the initial quote button\
        \}\
      \});\
      outputElement.appendChild(backBtn);\
    \}\
\
    // Add event listeners to the first grid buttons\
    const items = buttonContainer.querySelectorAll(".item");\
    items.forEach((item) => \{\
      item.addEventListener("click", function () \{\
        handleButtonClick(item, buttonContainer); // Return to the main grid\
      \});\
    \});\
\
    // Add event listeners to the secondary buttons (Feel and Seem)\
    const secondaryItems = secondaryButtons.querySelectorAll(".item");\
    secondaryItems.forEach((item) => \{\
      item.addEventListener("click", function () \{\
        handleButtonClick(item, null); // No next container, end the navigation here\
      \});\
    \});\
  \}\
\});\
}