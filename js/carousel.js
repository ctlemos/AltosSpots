/* VIDEO GRID */
const videos = [
    { id: 1, title: "Vila de Rei (walkways and landscapes)", thumbnail: "https://img.youtube.com/vi/Hr0PFvCieT8/maxresdefault.jpg", url: "https://www.youtube.com/watch?v=Hr0PFvCieT8" },
    { id: 2, title: "Nature takes over", thumbnail: "https://img.youtube.com/vi/mHqGW180Ils/maxresdefault.jpg", url: "https://www.youtube.com/watch?v=mHqGW180Ils" },
    { id: 3, title: "Ribeira de Fráguas", thumbnail: "https://img.youtube.com/vi/6AJAvJnu7zw/maxresdefault.jpg", url: "https://www.youtube.com/watch?v=6AJAvJnu7zw" }
];

const gridContainer = document.getElementById('grid-container');
const carouselContainer = document.getElementById('carousel-container');
const timelineContainer = document.getElementById('timeline-container');

videos.forEach((video, index) => {
    // DINAMIC GRID
    gridContainer.innerHTML += `
        <div class="col-md-4">
            <a href="${video.url}" target="_blank" class="video-card d-block">
                <img src="${video.thumbnail}" class="w-100">
                <div class="video-overlay">${video.title}</div>
            </a>
        </div>`;
});


/* IMG CAROUSEL */
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