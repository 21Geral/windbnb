import { setupSearchModal } from "./search.js";
import { showCards } from "./cards.js";

setupSearchModal();
showCards();

function darkmode() {
  const btn = document.querySelector("#ui-switch input"); // el input del switch
  const all = document.querySelector("#all");

  if (btn && all) {
    btn.addEventListener("change", function () {
      all.classList.toggle("dark", btn.checked);
    });
  }
}
darkmode();
