<template>
  <div>
    <base-bread-crumb :items="breadcrumbItems"></base-bread-crumb>
    <div class="contact-container">
      <div class="contact-container__image-container">
        <img class="contact-container__image" src="/contact.png" />
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

            <div
              class="contact-container__field contact-container__field--full"
            >
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
  </div>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import { useToast } from "vue-toastification";

const toast = useToast();

const name = ref("");
const email = ref("");
const message = ref("");
const errors = reactive({
  name: "",
  email: "",
  message: "",
});
const submitMessage = ref("");
const isSuccess = ref(false);

const breadcrumbItems = computed(() => {
  return [
    { id: 1, label: "Home", to: "/" },
    {
      id: 2,
      label: "Contact",
    },
  ];
});

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateForm() {
  errors.name = "";
  errors.email = "";
  errors.message = "";

  let isValid = true;

  if (!name.value) {
    errors.name = "Name is required.";
    isValid = false;
  } else if (name.value.length < 2) {
    errors.name = "Name must be at least 2 characters.";
    isValid = false;
  }

  if (!email.value) {
    errors.email = "Email is required.";
    isValid = false;
  } else if (!validateEmail(email.value)) {
    errors.email = "Please enter a valid email address.";
    isValid = false;
  }

  if (!message.value) {
    errors.message = "Message is required.";
    isValid = false;
  } else if (message.value.length < 10) {
    errors.message = "Message must be at least 10 characters.";
    isValid = false;
  }

  return isValid;
}

function resetForm() {
  name.value = "";
  email.value = "";
  message.value = "";
}

function handleSubmit() {
  submitMessage.value = "";

  const isValid = validateForm();

  if (!isValid) {
    isSuccess.value = false;
    submitMessage.value = "Please fix the errors in the form.";
    toast.error(submitMessage.value);
    return;
  }

  console.log({
    name: name.value,
    email: email.value,
    message: message.value,
  });

  isSuccess.value = true;
  submitMessage.value = "Your message has been sent successfully.";
  toast.success(submitMessage.value);
  resetForm();
}
</script>

<style lang="scss" scoped>
@use "@/assets/styles/pages/contact";
</style>
