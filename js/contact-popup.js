class ContactPopup {
  constructor() {
      this.popup = document.createElement('div');
      this.popup.className = 'contact-popup';
      this.popup.innerHTML = `
          <div class="contact-popup-content">
              <button class="contact-close">&times;</button>
              <h2 class="section-title">contact.</h2>
              <p class="section-intro">text</p>
              <form class="contact-form">
                  <div class="form-row">
                      <div class="form-group">
                          <label for="name">name</label>
                          <input type="text" id="name" name="name" required>
                      </div>
                      <div class="form-group">
                          <label for="phone">phone</label>
                          <input type="tel" id="phone" name="phone" required placeholder="+7 (999) 999-99-99">
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="email">email</label>
                      <input type="email" id="email" name="email" required>
                  </div>
                  <div class="form-group">
                      <label for="message">message</label>
                      <textarea id="message" name="message" required minlength="10"></textarea>
                  </div>
                  <button type="submit" class="btn">send message</button>
              </form>
          </div>
      `;
      
      document.body.appendChild(this.popup);
      this.form = this.popup.querySelector('form');
      this.setupEvents();
  }

  setupEvents() {
      document.querySelector('a[href="#contact"]').addEventListener('click', (e) => {
          e.preventDefault();
          this.popup.classList.add('active');
          document.body.style.overflow = 'hidden';
      });

      this.popup.querySelector('.contact-close').addEventListener('click', () => {
          this.closePopup();
      });

      this.popup.addEventListener('click', (e) => {
          if (e.target === this.popup) {
              this.closePopup();
          }
      });

      const fields = ['name', 'phone', 'email', 'message'];
      fields.forEach(fieldId => {
          const field = this.form.querySelector(`#${fieldId}`);
          field.addEventListener('blur', () => {
              this.validateField(field);
          });
      });

      this.form.addEventListener('submit', (e) => {
          e.preventDefault();
          this.submitForm();
      });
  }

  validateField(field) {
      const value = field.value.trim();
      const fieldGroup = field.parentElement;
      let error = '';

      if (field.id === 'name') {
          if (!value) {
              error = 'Name is required';
          } else if (value.length < 2) {
              error = 'Name must be at least 2 characters';
          }
      }
      else if (field.id === 'phone') {
          if (!value) {
              error = 'Phone is required';
          } else if (!/^\+7\s?\(?\d{3}\)?\s?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/.test(value)) {
              error = 'Phone should match format: +7 (999) 999-99-99';
          }
      }
      else if (field.id === 'email') {
          if (!value) {
              error = 'Email is required';
          } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value)) {
              error = 'Please enter a valid email address';
          }
      }
      else if (field.id === 'message') {
          if (!value) {
              error = 'Message is required';
          } else if (value.length < 10) {
              error = 'Message must be at least 10 characters';
          }
      }

      if (error) {
          fieldGroup.classList.add('error');
          fieldGroup.classList.remove('success');
          this.showError(field, error);
      } else {
          fieldGroup.classList.remove('error');
          fieldGroup.classList.add('success');
          this.showError(field, '');
      }
  }

  showError(field, message) {
      let errorElement = field.parentElement.querySelector('.error-message');
      
      if (!errorElement && message) {
          errorElement = document.createElement('div');
          errorElement.className = 'error-message';
          field.parentElement.appendChild(errorElement);
      }
      
      if (errorElement) {
          errorElement.textContent = message;
      }
  }

  async submitForm() {
      const fields = ['name', 'phone', 'email', 'message'];
      let allValid = true;
      
      fields.forEach(fieldId => {
          const field = this.form.querySelector(`#${fieldId}`);
          this.validateField(field);
          if (field.parentElement.classList.contains('error')) {
              allValid = false;
          }
      });
      
      if (!allValid) return;

      const submitBtn = this.form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      try {
          const formData = new FormData(this.form);
          const response = await fetch('endpoint', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(Object.fromEntries(formData))
          });

          if (!response.ok) throw new Error('Server error');

          submitBtn.textContent = 'Message sent!';
          submitBtn.classList.add('success');
          this.form.reset();

          setTimeout(() => {
              this.closePopup();
              submitBtn.textContent = 'Send message';
              submitBtn.classList.remove('success');
              submitBtn.disabled = false;
          }, 2000);
      } catch (error) {
          submitBtn.textContent = 'Error! Try again';
          submitBtn.classList.add('error');

          setTimeout(() => {
              submitBtn.textContent = 'Send message';
              submitBtn.classList.remove('error');
              submitBtn.disabled = false;
          }, 3000);
      }
  }

  closePopup() {
      this.popup.classList.remove('active');
      document.body.style.overflow = '';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new ContactPopup();
});