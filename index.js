// Smooth scrolling for anchor links
document.querySelectorAll("nav a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    targetSection.scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Get the button and social links section
const contactButton = document.querySelector(".contact-btn");
const socialLinks = document.querySelector(".social_links");

// Add click event listener to the button
contactButton.addEventListener("click", () => {
  // Toggle the 'active' class on the social links section
  socialLinks.classList.toggle("active");

  // Update button text based on state
  if (socialLinks.classList.contains("active")) {
    contactButton.textContent = "Hide Contact Info";
  } else {
    contactButton.textContent = "Contact Me";
  }
});
