const cheerio = require('cheerio');
const rp = require('request-promise');
const beep = require('beepbeep');
const asciify = require('asciify-image');

const getArticles = () => {
    beep(3);
    rp('https://www.theverge.com/games')
    .then(html => {

        const $ = cheerio.load(html);
    
        $('.c-compact-river .c-entry-box--compact__image-wrapper').attr('href', (i, link) => {

            rp(link)
            .then(html => {
                
                const $ = cheerio.load(html);
                const imgSrc = $('.c-picture img').attr('src');
                const articleTitle = $('.c-entry-hero__header-wrap h1').text();
        
                let options = {
                    width: 60,
                    height: 60,
                    fit: 'box'
                };

                if (typeof imgSrc !== 'undefined') {
                    asciify(imgSrc, options) 
                    .then(asciified => {
                        console.log(asciified);
                        console.log(`\n${articleTitle}`);
                        console.log(`${link} \n`);
                        console.log(`\n`);
                    });
                }
            })
        });        
    })
};

getArticles();
setInterval(getArticles, 1800000); // Scrape articles every 30 min