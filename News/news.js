const url = 'https://allscores.p.rapidapi.com/api/allscores/news?langId=1&timezone=America%2FChicago&sport=1';
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '072c1fca36msh5131799fa3240efp196bbbjsnaac205374554',
        'X-RapidAPI-Host': 'allscores.p.rapidapi.com'
    }
};

async function fetchNewsData() {
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        const newsContainer = document.getElementById('newsContainer');
        data.news.forEach((newsItem) => {
            const newsBox = document.createElement('div');
            newsBox.classList.add('news-box');

            const newsDate = document.createElement('p');
            newsDate.classList.add('news-date');
            const publishDate = new Date(newsItem.publishDate);
            newsDate.textContent = publishDate.toLocaleString('en-US', { dateStyle: 'long' });
            newsBox.appendChild(newsDate);

            const newsImage = document.createElement('img');
            newsImage.classList.add('news-image');
            newsImage.src = newsItem.image;
            newsImage.alt = 'News Image';
            newsBox.appendChild(newsImage);

            const newsTitle = document.createElement('h2');
            newsTitle.classList.add('news-title');
            newsTitle.textContent = newsItem.title;
            newsBox.appendChild(newsTitle);

            // const newsContent = document.createElement('p');
            // newsContent.classList.add('news-content');
            // newsContent.textContent = newsItem.title;
            // newsBox.appendChild(newsContent);

            if (newsItem.title.length > 100) {
                const expandBtn = document.createElement('span');
                expandBtn.classList.add('expand-btn');
                expandBtn.textContent = 'Expand';
                expandBtn.addEventListener('click', () => {
                    newsContent.classList.toggle('expanded');
                    expandBtn.textContent = newsContent.classList.contains('expanded') ? 'Collapse' : 'Expand';
                });
                newsBox.appendChild(expandBtn);
            }
            const newsSource = document.createElement('div');
            newsSource.classList.add('news-source');

            const newsSourceImage = document.createElement('img');
            newsSourceImage.classList.add('news-source-image');
            // Assuming that the newsSources array is also provided in the API response
            const sourceInfo = data.newsSources.find((source) => source.id === newsItem.sourceId);
            newsSourceImage.src = `path/to/${sourceInfo.name}_logo.png`;
            newsSourceImage.alt = `${sourceInfo.name} Logo`;
            newsSource.appendChild(newsSourceImage);

            const newsSourceName = document.createElement('span');
            newsSourceName.classList.add('news-source-name');
            newsSource.appendChild(newsSourceName);
            newsBox.appendChild(newsSourceName);

            const learnMoreBtn = document.createElement('a');
            learnMoreBtn.classList.add('learn-more-btn');
            learnMoreBtn.textContent = 'Learn more';
            learnMoreBtn.href = newsItem.url;
            learnMoreBtn.target = '_blank'; // Open link in a new tab
            newsBox.appendChild(learnMoreBtn);

            newsContainer.appendChild(newsBox);
        });
    } catch (error) {
        console.error(error);
    }
}

fetchNewsData();
