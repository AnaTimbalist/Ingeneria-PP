document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById("subreddits")) {
        fetch("https://www.reddit.com/subreddits/popular.json")
            .then(response => response.json())
            .then(data => {
                let subredditsDiv = document.getElementById("subreddits");
                data.data.children.forEach(sub => {
                    let subreddit = sub.data;
                    let card = document.createElement("div");
                    card.className = "subreddit-card";
                    let imageUrl = subreddit.icon_img || subreddit.community_icon; // Încearcă să obții URL-ul imaginii
                    if (imageUrl && !imageUrl.startsWith('http')) {
                        imageUrl = `https://www.reddit.com${imageUrl}`; // Completează URL-ul dacă este relativ
                    }
                    card.innerHTML = `
                        <h3>${subreddit.title}</h3>
                        ${imageUrl ? `<img src="${imageUrl}" alt="${subreddit.title}" style="width:100px;height:100px;">` : ''}
                        <p>${subreddit.public_description}</p>
                        <a href="https://www.reddit.com${subreddit.url}" target="_blank">
                            <button>Vizitează subreddit</button>
                        </a>
                    `;
                    subredditsDiv.appendChild(card);
                });
            })
            .catch(error => console.error("Eroare la preluarea datelor de la Reddit:", error));
    }
});