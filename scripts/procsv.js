/**
 * Fetches data from Google Sheets CSV and mimics Tabletop behavior.
 */
var Procsv = {
  load: function load(options) {
    const googleSheetUrl = 'https://docs.google.com/spreadsheets/d/1-GUwxh2aceJG_tVfPoFQShuggz8jMz7d4yscWmDpzDw/edit?gid=0#gid=0';

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

