// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const messageContainer = document.getElementById('messageContainer');
    const usersModal = document.getElementById('usersModal');
    
    // Form submission handler
    form.addEventListener('submit', handleFormSubmission);
    
    // Real-time validation
    setupRealTimeValidation();
    
    // Modal event listeners
    setupModalEventListeners();
});

// Handle form submission
async function handleFormSubmission(event) {
    event.preventDefault();
    
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<div class="loading"></div> Creating Account...';
    
    // Clear previous errors
    clearErrors();
    
    // Get form data
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    
    try {
        const response = await fetch('/api/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCsrfToken(),
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (response.ok) {
            showMessage('success', 'Account created successfully!', 'fas fa-check-circle');
            form.reset();
            clearValidationStates();
        } else {
            showMessage('error', 'Registration failed. Please check the errors below.', 'fas fa-exclamation-circle');
            displayErrors(result.errors);
        }
    } catch (error) {
        console.error('Registration error:', error);
        showMessage('error', 'Network error. Please try again.', 'fas fa-wifi');
    } finally {
        // Reset button state
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }
}

// Setup real-time validation
function setupRealTimeValidation() {
    const inputs = document.querySelectorAll('input');
    
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
            if (input.classList.contains('invalid')) {
                validateField(input);
            }
        });
    });
    
    // Password confirmation validation
    const password = document.getElementById('password');
    const passwordConfirm = document.getElementById('password_confirm');
    
    passwordConfirm.addEventListener('input', () => {
        validatePasswordMatch();
    });
    
    password.addEventListener('input', () => {
        if (passwordConfirm.value) {
            validatePasswordMatch();
        }
    });
}

// Validate individual field
function validateField(input) {
    const value = input.value.trim();
    const fieldName = input.name;
    let isValid = true;
    let errorMessage = '';
    
    // Required field validation
    if (input.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required.';
    }
    
    // Email validation
    else if (fieldName === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address.';
        }
    }
    
    // Phone number validation
    else if (fieldName === 'phone_number' && value) {
        const phoneRegex = /^\+?1?\d{9,15}$/;
        if (!phoneRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number.';
        }
    }
    
    // Password validation
    else if (fieldName === 'password' && value) {
        if (value.length < 8) {
            isValid = false;
            errorMessage = 'Password must be at least 8 characters long.';
        }
    }
    
    // Username validation
    else if (fieldName === 'username' && value) {
        if (value.length < 3) {
            isValid = false;
            errorMessage = 'Username must be at least 3 characters long.';
        }
    }
    
    // Update UI
    updateFieldValidation(input, isValid, errorMessage);
    
    return isValid;
}

// Validate password match
function validatePasswordMatch() {
    const password = document.getElementById('password');
    const passwordConfirm = document.getElementById('password_confirm');
    const isValid = password.value === passwordConfirm.value;
    const errorMessage = isValid ? '' : 'Passwords do not match.';
    
    updateFieldValidation(passwordConfirm, isValid, errorMessage);
}

// Update field validation UI
function updateFieldValidation(input, isValid, errorMessage) {
    const errorElement = document.getElementById(`${input.name}_error`);
    
    input.classList.remove('valid', 'invalid');
    
    if (input.value.trim()) {
        input.classList.add(isValid ? 'valid' : 'invalid');
    }
    
    if (errorElement) {
        errorElement.textContent = errorMessage;
    }
}

// Display API errors
function displayErrors(errors) {
    Object.keys(errors).forEach(fieldName => {
        const errorElement = document.getElementById(`${fieldName}_error`);
        const input = document.querySelector(`[name="${fieldName}"]`);
        
        if (errorElement && errors[fieldName]) {
            errorElement.textContent = Array.isArray(errors[fieldName]) 
                ? errors[fieldName][0] 
                : errors[fieldName];
        }
        
        if (input) {
            input.classList.add('invalid');
        }
    });
}

// Clear all errors
function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
    });
}

// Clear validation states
function clearValidationStates() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.classList.remove('valid', 'invalid');
    });
}

// Show message notification
function showMessage(type, message, icon) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.innerHTML = `
        <i class="${icon}"></i>
        <span>${message}</span>
    `;
    
    messageContainer.appendChild(messageDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.style.animation = 'slideInRight 0.3s ease-out reverse';
            setTimeout(() => {
                messageDiv.remove();
            }, 300);
        }
    }, 5000);
}

// Get CSRF token
function getCsrfToken() {
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]');
    return csrfToken ? csrfToken.value : '';
}

// Password toggle functionality
function togglePassword(fieldId) {
    const field = document.getElementById(fieldId);
    const button = field.parentNode.querySelector('.toggle-password i');
    
    if (field.type === 'password') {
        field.type = 'text';
        button.className = 'fas fa-eye-slash';
    } else {
        field.type = 'password';
        button.className = 'fas fa-eye';
    }
}

// Modal functionality
function setupModalEventListeners() {
    const modal = document.getElementById('usersModal');
    
    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
}

// Show users modal
async function showUsers() {
    const modal = document.getElementById('usersModal');
    const usersList = document.getElementById('usersList');
    
    modal.style.display = 'block';
    usersList.innerHTML = '<div class="loading"></div> Loading users...';
    
    try {
        const response = await fetch('/api/users/');
        const users = await response.json();
        
        if (response.ok) {
            displayUsers(users);
        } else {
            usersList.innerHTML = '<p style="color: #e53e3e; text-align: center;">Failed to load users.</p>';
        }
    } catch (error) {
        console.error('Error fetching users:', error);
        usersList.innerHTML = '<p style="color: #e53e3e; text-align: center;">Network error. Please try again.</p>';
    }
}

// Display users in modal
function displayUsers(users) {
    const usersList = document.getElementById('usersList');
    
    if (users.length === 0) {
        usersList.innerHTML = '<p style="text-align: center; color: #718096;">No users registered yet.</p>';
        return;
    }
    
    const usersHTML = users.map(user => `
        <div class="user-card">
            <h3>${user.first_name} ${user.last_name}</h3>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Username:</strong> ${user.username}</p>
            ${user.phone_number ? `<p><strong>Phone:</strong> ${user.phone_number}</p>` : ''}
            ${user.date_of_birth ? `<p><strong>Birthday:</strong> ${formatDate(user.date_of_birth)}</p>` : ''}
            <div class="user-meta">
                <span>ID: ${user.id}</span>
                <span>Joined: ${formatDate(user.created_at)}</span>
            </div>
        </div>
    `).join('');
    
    usersList.innerHTML = usersHTML;
}

// Close modal
function closeModal() {
    const modal = document.getElementById('usersModal');
    modal.style.display = 'none';
}

// Format date
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Form auto-save (optional feature)
function setupAutoSave() {
    const form = document.getElementById('registrationForm');
    const inputs = form.querySelectorAll('input:not([type="password"])');
    
    inputs.forEach(input => {
        // Load saved data
        const savedValue = localStorage.getItem(`form_${input.name}`);
        if (savedValue) {
            input.value = savedValue;
        }
        
        // Save on input
        input.addEventListener('input', () => {
            localStorage.setItem(`form_${input.name}`, input.value);
        });
    });
    
    // Clear saved data on successful submission
    form.addEventListener('submit', () => {
        inputs.forEach(input => {
            localStorage.removeItem(`form_${input.name}`);
        });
    });
}