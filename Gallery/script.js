const API_KEY = 'ljGkao5RHVUDNHOplw46OdFt5ID4PES4rNmiJdmeemEpuoDjglgPG9EI';

// Function to fetch sports-related images from the Pexels API
async function fetchSportsImages() {
    const searchQuery = 'sports';
    const perPage = 16;

    const randomString = Math.random().toString(36).substring(7);
    const apiUrl = `https://api.pexels.com/v1/search?query=${searchQuery}&per_page=${perPage}&random=${randomString}`;

    const response = await fetch(apiUrl, {
        headers: {
            Authorization: API_KEY,
        },
    });

    const data = await response.json();
    const images = data.photos;

    const imageSection = document.getElementById('image-gallery');
    imageSection.innerHTML = ''; // Clear previous images
    images.forEach((image) => {
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');

        const img = document.createElement('img');
        img.src = image.src.medium;
        img.alt = image.url;
        img.addEventListener('click', () => window.open(image.url));

        imageContainer.appendChild(img);
        imageSection.appendChild(imageContainer);
    });
}

// Function to fetch sports-related videos from the Pexels API
async function fetchSportsVideos() {
    const searchQuery = 'sports';
    const perPage = 16;

    const randomString = Math.random().toString(36).substring(7);
    const apiUrl = `https://api.pexels.com/videos/search?query=${searchQuery}&per_page=${perPage}&random=${randomString}`;

    const response = await fetch(apiUrl, {
        headers: {
            Authorization: API_KEY,
        },
    });

    const data = await response.json();
    const videos = data.videos;

    const videoSection = document.getElementById('video-gallery');
    videoSection.innerHTML = ''; // Clear previous videos
    videos.forEach((video) => {
        const videoContainer = document.createElement('div');
        videoContainer.classList.add('video-container');

        const videoPlayer = document.createElement('video');
        videoPlayer.src = video.video_files[0].link;
        videoPlayer.controls = true;

        videoContainer.appendChild(videoPlayer);
        videoSection.appendChild(videoContainer);
    });
}

// Fetch sports-related images and videos when the page loads
window.addEventListener('load', () => {
    fetchSportsImages();
    fetchSportsVideos();
});
