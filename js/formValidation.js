document.getElementById('formulario').addEventListener('submit', function (event) {
    event.preventDefault(); 

    if (this.checkValidity()) {
        const formData = new FormData(this); // GETS THE FORM DATA

        fetch('formValidation.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(data.message); // SUCESS MESSAGE
                this.reset(); // CLEANS FORM
            } else {
                alert(data.message); // ERROR MESSAGE
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });
    }

    this.classList.add('was-validated'); // VALIDATION MESSAGE
}, false);