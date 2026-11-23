
async function loadLatestNews() {
  const section = document.querySelector("#news");
  if (!section) return;

  const heading = section.querySelector("h2");
  section.innerHTML = "";
  if (heading) section.appendChild(heading);

  const status = document.createElement("p");
  status.textContent = "Loading latest news...";
  section.appendChild(status);

  try {
    const response = await fetch("news.json?time=" + Date.now());
    if (!response.ok) throw new Error("News unavailable");

    const data = await response.json();
    status.remove();

    const updated = document.createElement("p");
    updated.textContent = "Last updated: " +
      new Date(data.updatedAt).toLocaleString("en-IN");
    section.appendChild(updated);

    for (const item of data.articles || []) {
      const card = document.createElement("article");
      card.style.cssText =
        "padding:12px;margin:12px 0;border:1px solid #ddd;border-radius:10px";

      const category = document.createElement("small");
      category.textContent = item.category + " | " + item.source;

      const title = document.createElement("h3");
      title.textContent = item.title;

      const date = document.createElement("p");
      date.textContent = item.date
        ? new Date(item.date).toLocaleString("en-IN")
        : "";

      const link = document.createElement("a");
      link.href = item.url;
      link.textContent = "Read Full News";
      link.target = "_blank";
      link.rel = "noopener noreferrer";

      card.append(category, title, date, link);
      section.appendChild(card);
    }

    if (!data.articles || data.articles.length === 0) {
      status.textContent = "No news available right now.";
      section.appendChild(status);
    }
  } catch (error) {
    status.textContent =
      "News is temporarily unavailable. Please try again later.";
  }
}

loadLatestNews();
