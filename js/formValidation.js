(() => {
    'use strict';
    const form = document.getElementById("formulario");

    form.addEventListener("submit", function (event) {

        // ACTIVATES THE BOOTSTRAP VALIDATION
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }

        form.classList.add("was-validated");
    });
})();