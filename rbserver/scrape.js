import puppeteer from 'puppeteer';
export default async function scrapeNews(pageNumber) {
    const browserOptions = {
        headless: 'old'
    };
    const browser = await puppeteer.launch(browserOptions);
    const page = await browser.newPage();
    await page.goto(`https://news.ycombinator.com/news?p=${pageNumber}`);

    const data = await page.evaluate(() => {
        const newsRows = document.querySelectorAll('tr.athing');

        const results = [];

        newsRows.forEach((newsRow) => {
            const titleAnchor = newsRow.querySelector('td.title a');
            const subtextCell = newsRow.nextElementSibling.querySelector('td.subtext');

            if (titleAnchor && subtextCell) {
                const scoreElement = subtextCell.querySelector('span.score');
                const userElement = subtextCell.querySelector('a.hnuser');
                const ageElement = subtextCell.querySelector('span.age');
                const commentsElement = subtextCell.querySelector('span.subline > a:nth-child(6)');

                const score = scoreElement ? scoreElement.textContent.trim() : 'N/A';
                const user = userElement ? userElement.textContent.trim() : 'N/A';
                const age = ageElement ? ageElement.textContent.trim() : 'N/A';
                const comments = commentsElement ? commentsElement.textContent.trim() : 'N/A';

                const title = titleAnchor.textContent.trim();
                const href = titleAnchor.getAttribute('href');

                results.push({ title, href, score, user, age, comments });
            }
        });

        return results;
    });

    await browser.close();

    return data;
}
