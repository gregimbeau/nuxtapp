// server/api/whoweare.js

export default defineEventHandler(() => {
  return {
    disclaimer:
      "This is a sample disclaimer. All information provided here is for educational purposes only. We are not responsible for any actions taken based on this information.",
    termsAndConditions:
      "By accessing this API, you agree to not misuse the information provided. Any misuse or unauthorized access may lead to legal action.",
    aboutUs:
      "We are a team dedicated to providing quality educational resources. Our mission is to make learning accessible and engaging for everyone.",
    ourVision:
      "We envision our application breaking new ground in both technical and non-technical fields, offering unparalleled value.",
    contactUs:
      "To reach out, please email us at contact@example.com. Your inquiries are important to us, and we strive to respond promptly.",
    logoSvg: `
      <div class="flex justify-center w-full pb-4">
        <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L21.5 22H2.5L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
    `,
  };
});