document.addEventListener("DOMContentLoaded", () => {
  const closeButtons = document.querySelectorAll(
    ".closeable-message .close-button"
  );

  closeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const block = event.target.closest(".closeable-message");
      if (block) {
        block.style.display = "none";
      }
    });
  });
});
