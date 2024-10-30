function validateForm(event) {
    event.preventDefault();
    let isValid = true;
    
    // Reset all error messages
    clearErrors();
    
    // Validate First Name
    const firstName = document.getElementById('firstName');
    if (!firstName.value.trim()) {
        showError('firstNameError', 'First name is required');
        isValid = false;
    } else if (!/^[A-Za-z\s]{2,30}$/.test(firstName.value.trim())) {
        showError('firstNameError', 'Please enter a valid first name');
        isValid = false;
    }
    
    // Validate Last Name
    const lastName = document.getElementById('lastName');
    if (!lastName.value.trim()) {
        showError('lastNameError', 'Last name is required');
        isValid = false;
    } else if (!/^[A-Za-z\s]{2,30}$/.test(lastName.value.trim())) {
        showError('lastNameError', 'Please enter a valid last name');
        isValid = false;
    }
    
    // Validate Email
    const email = document.getElementById('email');
    if (!email.value.trim()) {
        showError('emailError', 'Email is required');
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        showError('emailError', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate Arrival Date
    const arrivalDate = document.getElementById('arrivalDate');
    if (!arrivalDate.value) {
        showError('arrivalDateError', 'Arrival date is required');
        isValid = false;
    } else if (new Date(arrivalDate.value) < new Date()) {
        showError('arrivalDateError', 'Arrival date cannot be in the past');
        isValid = false;
    }
    
    // Validate Departure Date
    const departureDate = document.getElementById('departureDate');
    if (!departureDate.value) {
        showError('departureDateError', 'Departure date is required');
        isValid = false;
    } else if (new Date(departureDate.value) <= new Date(arrivalDate.value)) {
        showError('departureDateError', 'Departure date must be after arrival date');
        isValid = false;
    }
    
    // Validate Country
    const country = document.getElementById('country');
    if (!country.value) {
        showError('countryError', 'Please select a country');
        isValid = false;
    }
    
    // Validate Payment Mode
    const debitCard = document.getElementById('debitCard');
    const creditCard = document.getElementById('creditCard');
    if (!debitCard.checked && !creditCard.checked) {
        showError('paymentError', 'Please select a payment method');
        isValid = false;
    }
    
    if (isValid) {
        submitForm();
    }
    
    return false;
}

// Show error message
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    
    // Add invalid class to the input
    const inputElement = document.getElementById(elementId.replace('Error', ''));
    if (inputElement) {
        inputElement.classList.add('invalid');
    }
}

// Clear all error messages
function clearErrors() {
    const errorElements = document.querySelectorAll('.error');
    errorElements.forEach(element => {
        element.textContent = '';
        element.style.display = 'none';
    });
    
    // Remove invalid class from all inputs
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.classList.remove('invalid');
    });
}

// Reset form
function resetForm() {
    document.getElementById('bookingForm').reset();
    clearErrors();
    document.getElementById('successMessage').style.display = 'none';
}

// Submit form (simulated database insertion)
function submitForm() {
    // Simulate database insertion with timeout
    const successMessage = document.getElementById('successMessage');
    successMessage.textContent = 'Processing...';
    successMessage.style.display = 'block';
    
    setTimeout(() => {
        // In a real application, this would be an API call to your backend
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            arrivalDate: document.getElementById('arrivalDate').value,
            departureDate: document.getElementById('departureDate').value,
            country: document.getElementById('country').value,
            paymentMode: getSelectedPaymentModes()
        };
        
        console.log('Form data to be sent to database:', formData);
        successMessage.textContent = 'Booking successful! Thank you for your reservation.';
        successMessage.style.display = 'block';
    }, 1500);
}

// Get selected payment modes
function getSelectedPaymentModes() {
    const modes = [];
    if (document.getElementById('debitCard').checked) modes.push('Debit Card');
    if (document.getElementById('creditCard').checked) modes.push('Credit Card');
    return modes;
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Set minimum date for arrival date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('arrivalDate').min = today;
    
    // Update departure date minimum when arrival date changes
    document.getElementById('arrivalDate').addEventListener('change', function() {
        document.getElementById('departureDate').min = this.value;
    });
});