import emailjs from "@emailjs/browser";

const form = document.getElementById("contact-form") as HTMLFormElement;
const formStatus = document.getElementById(
  "form-status"
) as HTMLParagraphElement;

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = (document.getElementById("name") as HTMLInputElement).value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const message = (document.getElementById("message") as HTMLTextAreaElement)
    .value;

  try {
    await emailjs.send(
      import.meta.env.PUBLIC_SERVICE_ID,
      import.meta.env.PUBLIC_TEMPLATE_ID,
      {
        from_name: name,
        reply_to: email,
        message: message,
      },
      import.meta.env.PUBLIC_KEY
    );

    formStatus.classList.remove("hidden");
    formStatus.classList.remove("text-red-500");
    formStatus.classList.add("text-green-500");
    formStatus.textContent = "Message sent successfully!";
    form.reset();
  } catch (error) {
    formStatus.classList.remove("hidden");
    formStatus.classList.remove("text-green-500");
    formStatus.classList.add("text-red-500");
    formStatus.textContent = "Failed to send message. Please try again.";
  }
});
