<template>
  <div class="contact-container">
    <div class="contact-container__image">
      <img src="/contact.png" />
    </div>

    <div class="contact-container__call-write-section">
      <div class="contact-container__call-us">
        <div class="contact-container__half-container">
          <div class="contact-container__call-logo">
            <div>
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="40" height="40" rx="20" fill="#DB4444" />
                <path
                  d="M18.5542 14.24L15.1712 10.335C14.7812 9.88503 14.0662 9.88703 13.6132 10.341L10.8312 13.128C10.0032 13.957 9.76623 15.188 10.2452 16.175C13.1069 22.1 17.8853 26.8851 23.8062 29.755C24.7922 30.234 26.0222 29.997 26.8502 29.168L29.6582 26.355C30.1132 25.9 30.1142 25.181 29.6602 24.791L25.7402 21.426C25.3302 21.074 24.6932 21.12 24.2822 21.532L22.9182 22.898C22.8484 22.9712 22.7565 23.0195 22.6566 23.0354C22.5567 23.0513 22.4543 23.0339 22.3652 22.986C20.1357 21.7021 18.2862 19.8503 17.0052 17.619C16.9573 17.5298 16.9399 17.4273 16.9558 17.3272C16.9717 17.2271 17.02 17.135 17.0932 17.065L18.4532 15.704C18.8652 15.29 18.9102 14.65 18.5542 14.239V14.24Z"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <p>Call us</p>
          </div>
          <p>We are available 24/7, 7 days a week.</p>
          <p>Phone: +8801611112222</p>

          <div class="contact-container__divider"></div>

          <div class="contact-container__write-logo">
            <div>
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="40" height="40" rx="20" fill="#DB4444" />
                <path
                  d="M10 13L20 20L30 13M10 27H30V13H10V27Z"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <p>Write to us</p>
          </div>
          <p>Fill out our form and we will contact you within 24 hours.</p>
        </div>
      </div>

      <div class="contact-container__write-us">
        <form class="contact-container__form" @submit.prevent="handleSubmit">
          <div class="contact-container__field">
            <input
              type="text"
              placeholder="Your Name"
              v-model.trim="name"
              :class="{ 'contact-container__input-error': errors.name }"
            />
            <p v-if="errors.name" class="contact-container__error-message">
              {{ errors.name }}
            </p>
          </div>

          <div class="contact-container__field">
            <input
              type="email"
              placeholder="Your email"
              v-model.trim="email"
              :class="{ 'contact-container__input-error': errors.email }"
            />
            <p v-if="errors.email" class="contact-container__error-message">
              {{ errors.email }}
            </p>
          </div>

          <div class="contact-container__field contact-container__field--full">
            <textarea
              rows="7"
              v-model.trim="message"
              placeholder="Your Message"
              :class="{ 'contact-container__input-error': errors.message }"
            ></textarea>
            <p v-if="errors.message" class="contact-container__error-message">
              {{ errors.message }}
            </p>
          </div>

          <p
            v-if="submitMessage"
            :class="[
              'contact-container__form-status',
              isSuccess
                ? 'contact-container__form-status--success'
                : 'contact-container__form-status--error',
            ]"
          >
            {{ submitMessage }}
          </p>

          <div class="contact-container__submit-button">
            <base-button>Send Message</base-button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      message: "",
      errors: {
        name: "",
        email: "",
        message: "",
      },
      submitMessage: "",
      isSuccess: false,
    };
  },
  methods: {
    validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },

    validateForm() {
      this.errors = {
        name: "",
        email: "",
        message: "",
      };

      let isValid = true;

      if (!this.name) {
        this.errors.name = "Name is required.";
        isValid = false;
      } else if (this.name.length < 2) {
        this.errors.name = "Name must be at least 2 characters.";
        isValid = false;
      }

      if (!this.email) {
        this.errors.email = "Email is required.";
        isValid = false;
      } else if (!this.validateEmail(this.email)) {
        this.errors.email = "Please enter a valid email address.";
        isValid = false;
      }

      if (!this.message) {
        this.errors.message = "Message is required.";
        isValid = false;
      } else if (this.message.length < 10) {
        this.errors.message = "Message must be at least 10 characters.";
        isValid = false;
      }

      return isValid;
    },

    resetForm() {
      this.name = "";
      this.email = "";
      this.message = "";
    },

    handleSubmit() {
      this.submitMessage = "";

      const isValid = this.validateForm();

      if (!isValid) {
        this.isSuccess = false;
        this.submitMessage = "Please fix the errors in the form.";
        this.$toast.error(this.submitMessage);
        return;
      }

      console.log({
        name: this.name,
        email: this.email,
        message: this.message,
      });

      this.isSuccess = true;
      this.submitMessage = "Your message has been sent successfully.";
      this.$toast.success(this.submitMessage);
      this.resetForm();
    },
  },
};
</script>

<style scoped>
.contact-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;
}

.contact-container__image img {
  border-radius: 4px;
}

.contact-container__call-write-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.contact-container__call-us,
.contact-container__write-us {
  padding: 40px;
  background: #ffffff;
  box-shadow: 0px 1px 13px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.contact-container__half-container {
  max-width: 60%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.contact-container__call-logo,
.contact-container__write-logo {
  display: flex;
  align-items: center;
  gap: 15px;
}

.contact-container__divider {
  margin: 20px 0 40px 0;
  height: 1px;
  background-color: black;
  width: 100%;
}

.contact-container__form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;
  row-gap: 22px;
}

.contact-container__field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.contact-container__field--full {
  grid-column: 1 / -1;
}

.contact-container__form input,
.contact-container__form textarea {
  background: #f5f5f5;
  border: 1px solid transparent;
  outline: none;
  padding: 15px;
  border-radius: 4px;
  font: inherit;
}

.contact-container__form input {
  width: 100%;
}

.contact-container__form textarea {
  resize: none;
  width: 100%;
}

.contact-container__input-error {
  border-color: #db4444 !important;
}

.contact-container__error-message {
  margin: 0;
  font-size: 13px;
  color: #db4444;
}

.contact-container__form-status {
  grid-column: 1 / -1;
  margin: 0;
  font-size: 14px;
}

.contact-container__form-status--success {
  color: green;
}

.contact-container__form-status--error {
  color: #db4444;
}

.contact-container__submit-button {
  grid-column: 2 / -1;
  justify-self: end;
  margin-right: -8px;
}
</style>
