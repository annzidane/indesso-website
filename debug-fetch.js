const http = require('http');

function fetchUrl(url) {
    return new Promise((resolve, reject) => {
        http.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', reject);
    });
}

async function run() {
    try {
        const url = 'http://localhost:3000/api/articles?category=Press%20Release&locale=en&limit=1';
        console.log("Fetching:", url);
        const data = await fetchUrl(url);
        if (data.data && data.data.length > 0) {
            console.log("First Article Image Data:", JSON.stringify(data.data[0].image, null, 2));
            console.log("First Article Keys:", Object.keys(data.data[0]));
        } else {
            console.log("No data found or error:", data);
        }
    } catch (e) {
        console.error("Error:", e.message);
    }
}

run();
