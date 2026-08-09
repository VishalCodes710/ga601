const { chromium } = require('playwright');

(async () => {
  // Replace these placeholders with the actual URLs from Seed 7 to 16
  const urls = [
    'https://sanand0.github.io/tdsdata/js_table/?seed=7',
    'https://sanand0.github.io/tdsdata/js_table/?seed=8',
    'https://sanand0.github.io/tdsdata/js_table/?seed=9',
    'https://sanand0.github.io/tdsdata/js_table/?seed=10',
    'https://sanand0.github.io/tdsdata/js_table/?seed=11',
    'https://sanand0.github.io/tdsdata/js_table/?seed=12',
    'https://sanand0.github.io/tdsdata/js_table/?seed=13',
    'https://sanand0.github.io/tdsdata/js_table/?seed=14',
    'https://sanand0.github.io/tdsdata/js_table/?seed=15',
    'https://sanand0.github.io/tdsdata/js_table/?seed=16'
  ];

  let grandTotal = 0;
  const browser = await chromium.launch();
  const page = await browser.newPage();

  for (const url of urls) {
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      
      const pageSum = await page.evaluate(() => {
        let sum = 0;
        // Select all table data cells
        const cells = document.querySelectorAll('table td');
        cells.forEach(cell => {
          // Extract numbers, ignoring commas or extra text
          const text = cell.innerText.replace(/,/g, '');
          const match = text.match(/-?\d+(\.\d+)?/);
          if (match) {
            sum += parseFloat(match[0]);
          }
        });
        return sum;
      });

      console.log(`Sum for ${url}: ${pageSum}`);
      grandTotal += pageSum;
    } catch (error) {
      console.error(`Failed to scrape ${url}:`, error.message);
    }
  }

  console.log(`\nGrand Total across all tables: ${grandTotal}`);
  await browser.close();
})();
