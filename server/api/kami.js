// server/api/kami.js

export default defineEventHandler(() => {
  return {
    disclaimer:
      "This is a sample disclaimer. All information provided here is for educational purposes only. We are not responsible for any actions taken based on this information.",
    termsAndConditions:
      "By accessing this API, you agree to not misuse the information provided. Any misuse or unauthorized access may lead to legal action.",
    aboutUs:
      "We are a team dedicated to providing quality educational resources. Our mission is to make learning accessible and engaging for everyone.",
  };
});
