# User Registration Web Application

A modern, responsive user registration system built with Django REST API, HTML, CSS, and JavaScript.

## Features

- ✨ Modern, responsive design with beautiful UI
- 🔐 Secure user registration with password validation
- 📱 Mobile-friendly responsive layout
- ⚡ Real-time form validation
- 🎨 Beautiful animations and transitions
- 🔍 View registered users
- 📊 Django REST API backend
- 🛡️ CSRF protection
- ✅ Form validation (client-side and server-side)

## Technology Stack

- **Backend**: Django 4.2.7, Django REST Framework
- **Database**: MySQL (configured and running)
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with modern design patterns
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Inter)

## Installation & Setup

### Prerequisites

- Python 3.8+
- pip (Python package manager)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd registration-app
   ```

2. **Create and activate virtual environment**
   ```bash
   python3 -m venv registration_env
   source registration_env/bin/activate  # On Windows: registration_env\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables**
   - Copy `.env.example` to `.env` (if exists)
   - Update database settings if needed

5. **Run migrations**
   ```bash
   python manage.py migrate
   ```

6. **Create superuser (optional)**
   ```bash
   python manage.py createsuperuser
   ```

7. **Start development server**
   ```bash
   python manage.py runserver
   ```

8. **Access the application**
   - Open browser and go to: `http://127.0.0.1:8000/`
   - Admin panel: `http://127.0.0.1:8000/admin/`

## Project Structure

```
registration_project/
├── accounts/                 # User registration app
│   ├── models.py            # CustomUser model
│   ├── serializers.py       # DRF serializers
│   ├── views.py             # API views and HTML views
│   └── urls.py              # App URL patterns
├── registration_project/    # Main project settings
│   ├── settings.py          # Django settings
│   └── urls.py              # Main URL configuration
├── templates/accounts/      # HTML templates
│   └── register.html        # Registration form
├── static/                  # Static files
│   ├── css/style.css        # Custom styling
│   └── js/script.js         # JavaScript functionality
├── requirements.txt         # Python dependencies
└── manage.py               # Django management script
```

## API Endpoints

### Registration API
- **POST** `/api/register/` - Register new user
  ```json
  {
    "username": "john_doe",
    "email": "john@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "phone_number": "+1234567890",
    "date_of_birth": "1990-01-01",
    "password": "secure_password",
    "password_confirm": "secure_password"
  }
  ```

### Users API
- **GET** `/api/users/` - List all registered users

## Features Overview

### User Registration Form
- First Name & Last Name (required)
- Username (required, min 3 characters)
- Email (required, validated)
- Phone Number (optional, validated format)
- Date of Birth (optional)
- Password with confirmation (required, min 8 characters)
- Real-time validation
- Password visibility toggle

### Validation
- **Client-side**: Real-time validation with visual feedback
- **Server-side**: Django model validation and DRF serializers
- **Security**: CSRF protection, password strength validation

### UI/UX Features
- Responsive design (desktop, tablet, mobile)
- Modern gradient background
- Glassmorphism effects
- Smooth animations and transitions
- Toast notifications for success/error messages
- Modal for viewing registered users
- Loading states and error handling

## Database Configuration

### MySQL (Currently Active)
The application is configured to use MySQL with the following setup:
- **Database**: `registration_db`
- **User**: `django_user`
- **Password**: `password`
- **Host**: `localhost`
- **Port**: `3306`

**Database Tables Created:**
- `custom_user` - Custom user model with extended fields
- Standard Django tables (auth, admin, sessions, etc.)

**MySQL Connection Status:** ✅ Active and Running

### SQLite (Alternative - Available)
SQLite configuration is available in `settings.py` (commented out) for development backup.

## Customization

### Styling
- Edit `static/css/style.css` for visual customizations
- Modify color scheme by updating CSS variables
- Adjust responsive breakpoints

### Form Fields
- Add/remove fields in `accounts/models.py`
- Update serializers in `accounts/serializers.py`
- Modify HTML template in `templates/accounts/register.html`

### Validation Rules
- Client-side: Update `static/js/script.js`
- Server-side: Modify `accounts/serializers.py`

## Security Features

- CSRF token protection
- Password strength validation
- Email format validation
- Phone number format validation
- Input sanitization
- XSS protection

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions, please open an issue in the repository or contact the development team.

---

**Happy Coding! 🚀**