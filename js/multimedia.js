import { images, videos } from './data.js';

// FUNCTION TO LOAD THE IMAGES IN THE GALLERY 
function loadImages() {
    const galleryContainer = document.getElementById('gallery-container');
    images.forEach((image, index) => {
        const col = document.createElement('div');
        col.classList.add('col-12', 'col-md-6', 'col-lg-4', 'p-0');

        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.alt;
        img.classList.add('w-200', 'p-2', 'gallery-img');
        img.setAttribute('data-bs-toggle', 'modal');
        img.setAttribute('data-bs-target', '#imageModal');
        img.setAttribute('data-index', index);

        col.appendChild(img);
        galleryContainer.appendChild(col);
    });

    // Setting up the image carousel
    setupImageCarousel();
}

// FUNCTION TO SETTING UP THE IMAGE CAROUSEL 
function setupImageCarousel() {
    let galleryImages = document.querySelectorAll(".gallery-img");
    let carouselInner = document.getElementById("carouselInner");
    let carouselIndicators = document.getElementById("carouselIndicators");

    galleryImages.forEach((img, index) => {
        img.addEventListener("click", function () {
            // Clean the carousel and indicators
            carouselInner.innerHTML = "";
            carouselIndicators.innerHTML = "";

            // Adiciona os itens do carrossel
            galleryImages.forEach((image, i) => {
                // Creates the carousel item
                const carouselItem = document.createElement("div");
                carouselItem.classList.add("carousel-item");
                if (i === index) carouselItem.classList.add("active");

                const imgElement = document.createElement("img");
                imgElement.src = image.src;
                imgElement.alt = image.alt;
                imgElement.classList.add("d-block", "w-100");

                carouselItem.appendChild(imgElement);
                carouselInner.appendChild(carouselItem);

                // Creates the indicators
                const indicatorButton = document.createElement("button");
                indicatorButton.type = "button";
                indicatorButton.setAttribute("data-bs-target", "#modalCarousel");
                indicatorButton.setAttribute("data-bs-slide-to", i);
                indicatorButton.setAttribute("aria-label", `Slide ${i + 1}`);
                if (i === index) {
                    indicatorButton.classList.add("active");
                    indicatorButton.setAttribute("aria-current", "true");
                }

                carouselIndicators.appendChild(indicatorButton);
            });

            // Initialize the carousel
            const carousel = new bootstrap.Carousel(document.getElementById('modalCarousel'));
        });
    });
}

// FUNTION TO LOAD THE VIDEOS
function loadVideos() {
    const gridContainerLatest = document.getElementById('grid-container-latest');
    const gridContainerPopular = document.getElementById('grid-container-popular');

    const latestVideos = [1, 2]; // Latest Video IDs
    const popularVideos = [4, 5, 6]; // Most popular video IDs

    // Function to create a YouTube iframe
    function createYouTubeIframe(youtubeId) {
        return `
            <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/${youtubeId}?enablejsapi=1&controls=1&autoplay=0&mute=1"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
            ></iframe>`;
    }

    // Function to render videos
    function renderVideos(videoList, container) {
        videoList.forEach(video => {
            const videoCard = document.createElement('div');
            videoCard.classList.add('col-md-4', 'video-item');
            videoCard.innerHTML = `
                <div class="video-card">
                    ${createYouTubeIframe(video.youtubeId)}
                </div>`;
            container.appendChild(videoCard);
        });
    }

    // Render latest videos
    const latest = videos.filter(video => latestVideos.includes(video.id));
    renderVideos(latest, gridContainerLatest);

    // Render most popular videos
    const popular = videos.filter(video => popularVideos.includes(video.id));
    renderVideos(popular, gridContainerPopular);

    // Setting the hover effect for videos
    setupVideoHover();
}

// FUNCTION TO SETTING THE HOVER EFFECT FOR VIDEOS
function setupVideoHover() {
    let players = [];

    // Function to initialize players
    function initializePlayers() {
        document.querySelectorAll('.video-item iframe').forEach((iframe, index) => {
            const player = new YT.Player(iframe, {
                events: {
                    'onReady': (event) => {
                        players[index] = event.target;
                        console.log(`Player ${index + 1} pronto.`);
                    },
                    'onError': (event) => {
                        console.error(`Erro no player ${index + 1}.`);
                    }
                }
            });
        });
    }

    // Hover event
    document.querySelectorAll('.video-item').forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            if (players[index]) {
                players[index].playVideo();
            }
        });

        item.addEventListener('mouseleave', () => {
            if (players[index]) {
                players[index].pauseVideo();
            }
        });
    });

    // Load the YouTube API
    if (typeof YT === 'undefined') {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        // Initialize players after API is loaded
        window.onYouTubeIframeAPIReady = initializePlayers;
    } else {
        initializePlayers(); // If the API is already loaded, it initializes the players immediately.
    }
}

// LOAD EVERYTHING WHEN PAGE IS READY
document.addEventListener('DOMContentLoaded', () => {
    loadImages();
    loadVideos();
});