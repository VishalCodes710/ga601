const { chromium } = require('playwright');

(async () => {
  // Replace these placeholders with the actual URLs from Seed 7 to 16
  const urls = [
    'https://example.com/seed7',
    'https://example.com/seed8',
    'https://example.com/seed9',
    'https://example.com/seed10',
    'https://example.com/seed11',
    'https://example.com/seed12',
    'https://example.com/seed13',
    'https://example.com/seed14',
    'https://example.com/seed15',
    'https://example.com/seed16'
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
