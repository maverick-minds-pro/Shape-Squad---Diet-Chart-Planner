// Utility: get selected items for a given class (section)
function getSelectedItems(className) {
  return Array.from(document.querySelectorAll(`.${className}:checked`)).map(cb => {
    const label = cb.closest("label"); // get parent label

    if (!label) return cb.value;

    // Special handling for water note (manual quantity)
    if (cb.value === "water") {
      const qtyInput = label.querySelector(".water-qty");
      const qty = qtyInput && qtyInput.value ? qtyInput.value : "1"; // default 1L
      // Return text with quantity, no icon
      return `Drink ${qty}L water daily`;
    }

    // For other notes, return text content only (no icons)
    return label.querySelector(".note-text") ? label.querySelector(".note-text").textContent.trim() : cb.value;
  });
}




// Function to generate the chart in a new tab
function generateChart() {
  // Collect selections
  const selections = {
    "Morning : Pre-WorkOut": getSelectedItems("morning-pre"),
    "Morning : Post-WorkOut": getSelectedItems("morning-post"),
    "Morning : Breakfast": getSelectedItems("morning-break"),
    "Lunch": getSelectedItems("lunch"),
    "Evening : Pre-WorkOut": getSelectedItems("evening-pre"),
    "Evening : Post-WorkOut": getSelectedItems("evening-post"),
    "Evening : Snacks": getSelectedItems("evening-snack"),
    "Dinner": getSelectedItems("dinner"),
    "Notes": getSelectedItems("notes")
  };

  // Open new window
  const newWindow = window.open("", "_blank");
  newWindow.document.write(`
    <html>
      <head>
        <title>Final Diet Chart</title>
        <style>
          body {
            background: #121212;
            color: #fff;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            padding: 30px;
          }
          .header {
            text-align: center;
            margin-bottom: 40px;
          }
          .header h1 {
            font-size: 36px;
            font-weight: bold;
            margin: 0;
          }
          .header h3 {
            font-size: 20px;
            font-weight: normal;
            margin: 5px 0 20px;
            color: #ccc;
          }
          .header h2 {
            font-size: 28px;
            font-weight: bold;
            margin-top: 30px;
            text-decoration: underline;
          }
          h2 {
            text-align: center;
            margin-top: 35px;
            font-size: 24px;
            font-weight: bold;
            color: #1db954;
          }
          .items {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 25px;
            margin: 15px 0;
            font-size: 18px;
          }
          .items span {
            background: #1e1e1e;
            padding: 8px 15px;
            border-radius: 10px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.4);
          }
          button {
            display: block;
            margin: 50px auto 20px;
            padding: 12px 25px;
            background: #1db954;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 18px;
            font-weight: bold;
            transition: 0.3s;
          }
          button:hover {
            background: #17a44b;
          }
        </style>
      </head>
      <body>
        <!-- Page Header -->
        <div class="header">
          <h1>Shape Squad Fitness Centre</h1>
          <h3>Anantpur Rewa M.P. 486001</h3>
          <h2>DIET CHART</h2>
        </div>

        <!-- Sections -->
        ${Object.keys(selections)
          .filter(section => selections[section].length > 0) // skip empty sections
          .map(section => `
            <h2>${section}</h2>
            <div class="items">
              ${selections[section].map(item => `<span>${item}</span>`).join("")}
            </div>
          `).join("")}

        <!-- Print Button -->
        <button onclick="window.print()">Print Diet Chart</button>
      </body>
    </html>
  `);
  newWindow.document.close();
}
