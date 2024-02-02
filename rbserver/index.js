import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db.js';
import scrapeNews from './scrape.js';
import newsModal from './newsModal.js';
import cors from "cors";
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
dotenv.config();
connectDB();

const ITEMS_PER_PAGE = 30;


app.get('/api/news', async (req, res) => {
    try {
        console.log("req came");

        const { p = 1, ...otherQueryParams } = req.query;
        const page = parseInt(p);

        // If it's the user's first request (page 1), delete all articles
        if (page === 1) {
            await newsModal.deleteMany({});

            // Scrape data for all pages (1, 2, 3)
            const allScrapedData = [];
            for (let i = 1; i <= 3; i++) {
                const scrapedDataForPage = await scrapeNews(i);
                allScrapedData.push(...scrapedDataForPage);
            }

            // Update or insert scraped data into the database
            for (const newsItem of allScrapedData) {
                await newsModal.updateOne({ title: newsItem.title }, { $set: newsItem }, { upsert: true });
            }
        }

        // Fetch and send the requested number of articles based on the page
        const skipCount = (page - 1) * ITEMS_PER_PAGE;
        const NewsArticles = await newsModal.find().sort({ timestamp: -1 }).skip(skipCount).limit(ITEMS_PER_PAGE);

        res.json(NewsArticles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});





























































































































// import express from 'express';
// import puppeteer from 'puppeteer';
// import fs from 'fs-extra';
// import hbs from 'handlebars';
// import moment from 'moment';
// import path from 'path';

// const app = express();
// const port = 3000;

// const compile = async function (templateName, data) {
//     const filePath = path.join(process.cwd(), 'templates', `${templateName}.hbs`);
//     const html = await fs.readFile(filePath, 'utf8');
//     return hbs.compile(html)(data);
// }

// hbs.registerHelper('dateFormat', function (value, format) {
//     return moment(value).format(format);
// });

// app.get('/generate-pdf', async (req, res) => {
//     try {
//         const browser = await puppeteer.launch({
//             args: ['--no-sandbox'],
//             headless: true
//         });

//         const page = await browser.newPage();


//         const data = {
//             "Title": "Invoice Generator",
//             "arr": [
//                 {
//                     "name": "product 1",
//                     "qty": 2,
//                     "rate": 100,
//                     "total": 200
//                 },
//                 {
//                     "name": "product 1",
//                     "qty": 3,
//                     "rate": 10,
//                     "total": 30
//                 },
//                 {
//                     "name": "product 1",
//                     "qty": 5,
//                     "rate": 50,
//                     "total": 250
//                 }
//             ],
//             "Total": 480,
//             "GST": "18%",
//             "Grand-Total": 530,
//             "valid-until": "2017-07-23"
//         }


//         const content = await compile('shot-list', data);

//         await page.setContent(content);

//         await page.emulateMediaType('screen');
//         const pdfBuffer = await page.pdf({
//             path: "mypdf.pdf",
//             format: 'A4',
//             printBackground: true
//         });

//         var pdf = fs.readFileSync('mypdf.pdf');
//         res.contentType("application/pdf");
//         res.send(pdf);

//         console.log('PDF generated and sent to the client');
//         await browser.close();
//     } catch (error) {
//         console.log(error);
//         res.status(500).send('Internal Server Error');
//     }
// });

// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });
