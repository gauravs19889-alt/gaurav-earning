import fs from "node:fs/promises";

const topics = [
  { name: "India", query: "India sourcelang:English" },
  { name: "Technology", query: "technology sourcelang:English" },
  { name: "Education", query: "education sourcelang:English" },
  { name: "Sports", query: "sports sourcelang:English" },
  { name: "World", query: "world sourcelang:English" }
];

const allNews = [];
const seen = new Set();

function formatDate(value) {
  const match = /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z$/.exec(value || "");
  if (!match) return value || "";
  return `${match[1]}-${match[2]}-${match[3]}T${match[4]}:${match[5]}:${match[6]}Z`;
}

for (const topic of topics) {
  try {
    const params = new URLSearchParams({
      query: topic.query,
      mode: "ArtList",
      format: "json",
      maxrecords: "12",
      sort: "DateDesc",
      timespan: "7d"
    });

    const response = await fetch(
      `https://api.gdeltproject.org/api/v2/doc/doc?${params}`,
      { headers: { "User-Agent": "GauravEarningNews/1.0" } }
    );

    if (!response.ok) {
      console.log(`Could not load ${topic.name}: ${response.status}`);
      continue;
    }

    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("json")) continue;

    const data = await response.json();

    for (const article of data.articles || []) {
      if (!article.title || !article.url) continue;
      if (!article.url.startsWith("https://")) continue;
      if (seen.has(article.url)) continue;

      seen.add(article.url);

      allNews.push({
        category: topic.name,
        title: article.title,
        url: article.url,
        source: article.domain || "News source",
        date: formatDate(article.seendate)
      });
    }
  } catch (error) {
    console.log(`Error in ${topic.name}:`, error.message);
  }

  await new Promise(resolve => setTimeout(resolve, 6500));
}

if (allNews.length === 0) {
  throw new Error("No news received. Keeping the previous news file unchanged.");
}

allNews.sort((a, b) => new Date(b.date) - new Date(a.date));

await fs.writeFile(
  "news.json",
  JSON.stringify({
    updatedAt: new Date().toISOString(),
    attribution: "News links discovered through GDELT Project",
    articles: allNews.slice(0, 50)
  }, null, 2)
);

console.log(`Updated successfully: ${Math.min(allNews.length, 50)} articles`);
  
