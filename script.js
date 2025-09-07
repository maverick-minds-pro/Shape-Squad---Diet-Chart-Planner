function getSelectedItems(className) {
  return Array.from(document.querySelectorAll(`.${className}:checked`))
    .map(cb => cb.value);
}

function generateChart() {
  const selections = {
    "Morning": getSelectedItems("morning"),
    "Lunch": getSelectedItems("lunch"),
    "Evening": getSelectedItems("evening"),
    "Dinner": getSelectedItems("dinner"),
    "Notes": getSelectedItems("notes")
  };

  const newWindow = window.open("", "_blank");
  newWindow.document.write(`
    <html>
      <head>
        <title>Final Diet Chart</title>
        <style>
          body {
            background: #121212;
            color: #fff;
            font-family: Arial, sans-serif;
            padding: 20px;
          }
          h1 {
            text-align: center;
            margin-bottom: 30px;
          }
          h2 {
            text-align: center;
            margin-top: 25px;
          }
          .items {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin: 15px 0;
            font-size: 18px;
          }
          button {
            display: block;
            margin: 40px auto;
            padding: 10px 20px;
            background: #1db954;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
          }
          /* Hide the print button when printing */
          @media print {
            button {
              display: none !important;
            }
          }
        </style>
      </head>
      <body>
        <h1>Final Diet Chart</h1>
        ${Object.keys(selections).map(section => `
          <h2>${section}</h2>
          <div class="items">
            ${selections[section].length > 0 ? selections[section].map(item => `<span>${item}</span>`).join("") : "<span>--</span>"}
          </div>
        `).join("")}
        <button onclick="window.print()">Print Diet Chart</button>
      </body>
    </html>
  `);
  newWindow.document.close();
}
