const apiKey = 'AIzaSyDzKvyczIMnVD2FzqrFEQrNtsgYdvWgDVc';

document.getElementById('search-btn').addEventListener('click', () => {
    const query = document.getElementById('search-input').value;
    if (query) {
        searchYouTube(query);
    }
});

function searchYouTube(query) {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&key=${apiKey}&maxResults=9000&type=video`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = ''; // Clear previous results

            data.items.forEach(item => {
                const videoId = item.id.videoId;
                const videoTitle = item.snippet.title;
                const iframe = `<div class="video">
                    <iframe src="https://www.youtube.com/embed/${videoId}" allowfullscreen></iframe>
                    <p>${videoTitle}</p>
                </div>`;
                resultsDiv.innerHTML += iframe;
            });
        })
        .catch(error => {
            console.error('Gagal mengambil data:', error);
        });
}