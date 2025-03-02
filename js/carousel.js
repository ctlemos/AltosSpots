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