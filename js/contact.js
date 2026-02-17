// Send message via contact form
const form = document.getElementById('contact-form');
const submitBtn = document.querySelector('.submit-btn');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    formData.append("access_key", "48420434-5270-4282-9094-889f9994caac");

    const originalText = submitBtn.value;

    submitBtn.value = "Sending...";
    submitBtn.disabled = true;
    submitBtn.classList.add("message-sent")

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            submitBtn.value = "Sent";
            alert("Success! Your message has been sent.");
            form.reset();
        } else {
            alert("Error: " + data.message);
        }

    } catch (error) {
        alert("Something went wrong. Please try again.");
    } finally {

        setTimeout(function () {
            submitBtn.disabled = false;
            submitBtn.classList.remove("message-sent");
            submitBtn.value = originalText
        }, 5000)


    }
});