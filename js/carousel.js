const videos = [
    // Latest videos
    { id: 1, title: "Vila de Rei (walkways and landscapes)", youtubeId: "Hr0PFvCieT8" },
    { id: 2, title: "Nature takes over", youtubeId: "mHqGW180Ils" },
    { id: 3, title: "Ribeira de Fráguas", youtubeId: "h8vW1Txc6ns" },
    // Most Popular videos
    { id: 4, title: "Minas de Ouro Romanas", youtubeId: "d0X47nGa0e8" },
    { id: 5, title: "Barragem da Aguieira", youtubeId: "cR5mfqB4qF4" },
    { id: 6, title: "Pesca na Barragem da Aguieira", youtubeId: "4SfAok-OfTI" }
];

const gridContainerLatest = document.getElementById('grid-container-latest');
const gridContainerPopular = document.getElementById('grid-container-popular');

const latestVideos = [1, 2, 3]; 
const popularVideos = [4, 5, 6]; 

// YOUTUBE IFRAME FUNCTION
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

// VIDEO RENDER FUNCTION (IN A GRID)
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

// RENDER VIDEOS IN "Latest" GRID
const latest = videos.filter(video => latestVideos.includes(video.id));
renderVideos(latest, gridContainerLatest);

// RENDER VIDEOS IN "Popular" GRID
const popular = videos.filter(video => popularVideos.includes(video.id));
renderVideos(popular, gridContainerPopular);

// YOUTUBE API INICIALIZER
let players = [];

function onYouTubeIframeAPIReady() {
    document.querySelectorAll('.video-item iframe').forEach((iframe, index) => {
        const player = new YT.Player(iframe, {
            events: {
                'onReady': (event) => {
                    players[index] = event.target;
                    console.log(`Player ${index + 1} pronto: ${videos[index].title}`);
                },
                'onError': (event) => {
                    console.error(`Erro no player ${index + 1}: ${videos[index].title}`);
                }
            }
        });
    });
} 

// HOVER EVENT
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

// YOUTUBE API LOADER
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);



// IMG CAROUSEL
document.addEventListener("DOMContentLoaded", function () {
    let modalImage = document.getElementById("modalImage");
    let galleryImages = document.querySelectorAll(".gallery-img");
    let modalCarousel = document.querySelector("#modalCarousel .carousel-inner");
    
    galleryImages.forEach((img, index) => {
        img.addEventListener("click", function () {
            modalCarousel.innerHTML = ""; // CLEANS THE CAROUSEL FROM THE MODAL
            
            galleryImages.forEach((image, i) => {
                let item = document.createElement("div");
                item.classList.add("carousel-item");
                if (i === index) item.classList.add("active");
                
                let imgElement = document.createElement("img");
                imgElement.src = image.src;
                imgElement.classList.add("d-block", "w-100");
                
                item.appendChild(imgElement);
                modalCarousel.appendChild(item);
            });
        });
    });
});