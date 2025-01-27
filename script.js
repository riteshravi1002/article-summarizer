const summarizeBtn = document.getElementById("summarize-btn");
const urlInput = document.getElementById("url-input");
const summaryText = document.getElementById("summary-text");

summarizeBtn.addEventListener("click", async () => {
  const articleUrl = urlInput.value.trim();

  if (!articleUrl) {
    alert("Please enter a valid URL!");
    return;
  }

  summaryText.textContent = "Summarizing... Please wait.";

  try {
    const response = await fetch("https://article-extractor-and-summarizer.p.rapidapi.com/summarize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": "fd46eb5209msh4c19f41e8dabe0cp163192jsn7c4ed212e003",
        "X-RapidAPI-Host": "article-extractor-and-summarizer.p.rapidapi.com"
      },
      body: JSON.stringify({
        url: articleUrl,
        length: 5 // Number of sentences in the summary
      })
    });

    if (!response.ok) {
      throw new Error("Failed to summarize the article.");
    }

    const data = await response.json();
    summaryText.textContent = data.summary || "No summary available for this URL.";
  } catch (error) {
    console.error("Error:", error);
    summaryText.textContent = "An error occurred while summarizing the article. Please try again.";
  }
});
