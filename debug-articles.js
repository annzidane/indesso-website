const { getArticles } = require("./lib/strapi/articles-api");

async function run() {
    console.log("Fetching Press Release...");
    const press = await getArticles("Press Release", "en", 0, 1);
    console.log("Press Release Item:", JSON.stringify(press.data[0], null, 2));

    console.log("\nFetching Corporate Events (Stories)...");
    const stories = await getArticles("Corporate Events", "en", 0, 1);
    console.log("Stories Item:", JSON.stringify(stories.data[0], null, 2));
}

run();
