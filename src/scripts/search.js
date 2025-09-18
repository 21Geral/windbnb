export function setupSearchModal() {
  const searchModal = document.getElementById("searchModal");
  const overlay = document.getElementById("overlay");

  function openModal() {
    overlay.classList.remove("opacity-0", "pointer-events-none");
    overlay.classList.add("opacity-100");

    searchModal.classList.remove("opacity-0", "-translate-y-6", "pointer-events-none");
    searchModal.classList.add("opacity-100", "translate-y-0", "pointer-events-auto");
  }

  function closeModalFn() {
    overlay.classList.add("opacity-0", "pointer-events-none");
    overlay.classList.remove("opacity-100");

    searchModal.classList.add("opacity-0", "-translate-y-6", "pointer-events-none");
    searchModal.classList.remove("opacity-100", "translate-y-0", "pointer-events-auto");
  }

  // Delegación de eventos
  document.addEventListener("click", (e) => {
    // Abrir modal
    if (e.target.closest("#searchFilter")) {
      openModal();
    }

    // Cerrar modal con botón
    if (e.target.closest("#closeModal")) {
      closeModalFn();
    }

    // Cerrar modal al hacer clic fuera (overlay)
    if (e.target === overlay) {
      closeModalFn();
    }
  });

  // Cerrar modal con tecla ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModalFn();
  });
}
