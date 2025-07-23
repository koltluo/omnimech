// /static/js/emailjs-handler.js

(function() {
    // Initialize EmailJS ONCE
    const EMAILJS_USER_ID = "Y7gu1M9_xZGOiqsUy"; // <<< REPLACE
    const EMAILJS_SERVICE_ID = "service_2fjj4d9"; // <<< REPLACE
    const EMAILJS_TEMPLATE_ID = "template_0ijder4"; // <<< Use your unified template ID

    emailjs.init(EMAILJS_USER_ID);

    // --- Helper Function to Get Form Data ---
    function getFormData(formElement) {
        const formData = new FormData(formElement);
        const data = {
            // Initialize all possible fields to null or empty string
            your_subject: null,
            your_quantity: null,
            your_name: null,
            radio_usertype: null,
            your_email: null,
            your_phone: null,
            your_whatsapp: null,
            your_skype: null,
            your_company: null,
            menu_country: null,
            your_message: null,
            form_source: formElement.id // Identify the form
        };

        // Populate with actual values from the form
        for (const [key, value] of formData.entries()) {
            if (key === 'radio_usertype') {
                 // Special handling for radio buttons if needed, but FormData usually gets the selected one
                 const selectedRadio = formElement.querySelector('input[name="radio_usertype"]:checked');
                 if (selectedRadio) {
                     data[key] = selectedRadio.value;
                 }
            } else if (data.hasOwnProperty(key)) {
                data[key] = value;
            }
        }
        return data;
    }

    // --- Helper Function to Display Messages ---
    function showMessage(formId, message, isSuccess) {
        const msgBoxId = formId.replace('Form', 'MsgBox'); // e.g., contactPageForm -> contactMsgBox
        const msgBox = document.getElementById(msgBoxId);
        if (msgBox) {
            msgBox.textContent = message;
            msgBox.className = 'alert'; // Reset classes
            msgBox.classList.add(isSuccess ? 'alert-success' : 'alert-danger');
            msgBox.style.display = 'block';
            // Optional: Hide message after some time
            // setTimeout(() => { msgBox.style.display = 'none'; }, 5000);
        } else {
            console.warn(`Message box with ID ${msgBoxId} not found for form ${formId}`);
            alert(message); // Fallback to alert
        }
    }

    // --- Attach Event Listeners to Forms ---
    function setupFormListener(formId) {
        const form = document.getElementById(formId);
        if (form) {
            form.addEventListener('submit', function(event) {
                event.preventDefault();
                const submitButton = form.querySelector('button[type="submit"]');
                const originalButtonText = submitButton ? submitButton.textContent : 'Submit';
                if(submitButton) submitButton.disabled = true;
                if(submitButton) submitButton.textContent = 'Sending...';


                const dataToSend = getFormData(form);
                console.log('Sending data:', dataToSend); // For debugging

                emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, dataToSend)
                    .then(function(response) {
                        console.log('SUCCESS!', response.status, response.text);
                        showMessage(formId, 'Message sent successfully!', true);
                        form.reset(); // Clear the form
                    }, function(error) {
                        console.log('FAILED...', error);
                        showMessage(formId, 'Failed to send message. Please try again.', false);
                    })
                    .finally(() => {
                         // Re-enable button and restore text regardless of success/failure
                         if(submitButton) submitButton.disabled = false;
                         if(submitButton) submitButton.textContent = originalButtonText;
                    });
            });
        } else {
            // console.log(`Form with ID ${formId} not found on this page.`); // Optional: Log if form isn't present
        }
    }

    // Setup listeners for all potential forms when the DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        setupFormListener('contactPageForm');
        setupFormListener('bookingPageForm');
        setupFormListener('footerSubscriptionForm');
    });

})();
