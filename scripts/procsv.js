/**
 * Fetches data from Google Sheets CSV and mimics Tabletop behavior.
 */
var Procsv = {
  load: function load(options) {
    const googleSheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTz5HReY6D0MUcXLWcWXhVwK9hUAY9DUrpEGMesYy2JsojUvaM4LwqNDZWSJuME1mKvtMWHN1MGDWoP/pub?output=csv';

    const tab = options.tabs.shift();
    if (!tab) {
      options.callback(); // Call the callback when all tabs are loaded
    } else {
      // Use PapaParse to load Google Sheets CSV
      Papa.parse(googleSheetUrl, {
        download: true,
        header: true,
        complete: function(results) {
          options.self[tab] = results.data; // Store the parsed data
          load(options); // Recursively load the next tab
        },
        error: function(err) {
          console.error(`Error: Could not load ${tab} sheet`, err);
          alert('Error: Could not load ' + tab + ' sheet');
        }
      });
    }
  },

  // Returns an object with contents of the requested tab (sheet)
  sheets: function(sheet) {
    return { 'elements': this[sheet] };
  }
};

