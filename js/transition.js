document.addEventListener("DOMContentLoaded", function () {
    document.body.classList.add("show");

    document.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", function (e) {
            if (link.target === '_blank') return; // Ignore links that open in a new tab

            e.preventDefault();
            let href = this.href;
            document.body.classList.remove("show");
            setTimeout(() => {
                window.location.href = href;
            }, 800);
        });
    });
});