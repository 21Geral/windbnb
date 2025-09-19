const overlay = document.getElementById("overlay");
const searchModal = document.getElementById("searchModal");
const closeModal = document.getElementById("closeModal");
const tabLocation = document.getElementById("tabLocation");
const tabGuests = document.getElementById("tabGuests");
const panelContent = document.getElementById("panelContent");
const selectedLocation = document.getElementById("selectedLocation");
const selectedGuests = document.getElementById("selectedGuests");

let adults = 0;
let children = 0;

export function setupSearchModal() {
  const modalCount = document.querySelectorAll("#searchModal").length;
  if (modalCount > 1) {
    console.warn("Aviso: hay más de un #searchModal en el DOM. Elimina duplicados para evitar bugs. Encontrados:", modalCount);
  }

  if (!overlay || !searchModal) {
    console.error("No se encontró overlay o searchModal en el DOM. Asegúrate de que los IDs existan.");
    return;
  }

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

  document.addEventListener("click", (e) => {
    if (e.target.closest("#searchFilter")) openModal();
    if (e.target.closest("#closeModal")) closeModalFn();
    if (e.target === overlay) closeModalFn();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModalFn();
  });

  tabLocation.addEventListener("click", () => {
    panelContent.innerHTML = `
      <ul class="space-y-4">
        <li class="cursor-pointer dark:text-white">Show All</li>
        <li class="cursor-pointer dark:text-white">📍 Helsinki, Finland</li>
        <li class="cursor-pointer dark:text-white">📍 Turku, Finland</li>
        <li class="cursor-pointer dark:text-white">📍 Oulu, Finland</li>
        <li class="cursor-pointer dark:text-white">📍 Vaasa, Finland</li>
      </ul>
    `;

    panelContent.querySelectorAll("li").forEach((item) => {
      item.addEventListener("click", () => {
        selectedLocation.textContent = item.textContent;
        selectedLocation.classList.remove("text-gray-400");
      });
    });
  });

  tabGuests.addEventListener("click", () => {
    renderGuestsPanel();
  });

  function renderGuestsPanel() {
    panelContent.innerHTML = `
      <div>
        <p class="font-semibold text-gray-700 dark:text-white">Adults</p>
        <p class="text-sm text-gray-400 dark:text-white">Ages 13 or above</p>
        <div class="flex items-center gap-3 mt-2">
          <button
            class="px-2 dark:text-white border rounded cursor-pointer transition-colors duration-150"
            id="adultMinus"
          >-</button>
          <span id="adultCount" class="dark:text-white">${adults}</span>
          <button
            class="px-2 dark:text-white border rounded cursor-pointer transition-colors duration-150"
            id="adultPlus"
          >+</button>
        </div>
      </div>
      <div>
        <p class="font-semibold text-gray-700 dark:text-white">Children</p>
        <p class="text-sm text-gray-400 dark:text-gray-200">Ages 2–12</p>
        <div class="flex items-center gap-3 mt-2">
          <button
            class="px-2 border dark:text-white rounded cursor-pointer transition-colors duration-150"
            id="childMinus"
          >-</button>
          <span id="childCount" class="dark:text-white">${children}</span>
          <button
            class="px-2 border dark:text-white rounded cursor-pointer transition-colors duration-150"
            id="childPlus"
          >+</button>
        </div>
      </div>
    `;

    attachGuestHandlers();
    updateGuests();
  }

  function attachGuestHandlers() {
    const adultPlusBtn = panelContent.querySelector("#adultPlus");
    const adultMinusBtn = panelContent.querySelector("#adultMinus");
    const childPlusBtn = panelContent.querySelector("#childPlus");
    const childMinusBtn = panelContent.querySelector("#childMinus");

    if (!adultPlusBtn || !adultMinusBtn || !childPlusBtn || !childMinusBtn) {
      console.error("No se encontraron botones de Guests en el panel. ¿El HTML cambió?");
      return;
    }

    [adultPlusBtn, adultMinusBtn, childPlusBtn, childMinusBtn].forEach((btn) => {
      const clean = btn.cloneNode(true);
      btn.parentNode.replaceChild(clean, btn);
    });

    const adultPlus = panelContent.querySelector("#adultPlus");
    const adultMinus = panelContent.querySelector("#adultMinus");
    const childPlus = panelContent.querySelector("#childPlus");
    const childMinus = panelContent.querySelector("#childMinus");

    adultPlus.addEventListener("click", () => {
      if (adults < 10) {
        adults++;
        updateGuests();
      } else {
        console.log("Límite adultos alcanzado (10).");
      }
    });
    adultMinus.addEventListener("click", () => {
      if (adults > 0) {
        adults--;
        updateGuests();
      }
    });

    childPlus.addEventListener("click", () => {
      if (children < 12) {
        children++;
        updateGuests();
      } else {
        console.log("Límite niños alcanzado (12).");
      }
    });
    childMinus.addEventListener("click", () => {
      if (children > 0) {
        children--;
        updateGuests();
      }
    });
  }

  function updateGuests() {
    const adultCountEl = panelContent.querySelector("#adultCount");
    const childCountEl = panelContent.querySelector("#childCount");
    const adultPlusBtn = panelContent.querySelector("#adultPlus");
    const adultMinusBtn = panelContent.querySelector("#adultMinus");
    const childPlusBtn = panelContent.querySelector("#childPlus");
    const childMinusBtn = panelContent.querySelector("#childMinus");

    if (!adultCountEl || !childCountEl) {
      const totalFallback = adults + children;
      if (totalFallback > 0) {
        selectedGuests.textContent = `${totalFallback} guest${totalFallback > 1 ? "s" : ""}`;
        selectedGuests.classList.remove("text-gray-400 dark:text-white");
      } else {
        selectedGuests.textContent = "Add guests";
        selectedGuests.classList.add("text-gray-400 dark:text-white");
      }
      return;
    }

    adultCountEl.textContent = adults;
    childCountEl.textContent = children;

    if (adultPlusBtn && adultMinusBtn && childPlusBtn && childMinusBtn) {
      adultPlusBtn.disabled = adults >= 10;
      adultMinusBtn.disabled = adults <= 0;
      childPlusBtn.disabled = children >= 12;
      childMinusBtn.disabled = children <= 0;

      [adultPlusBtn, childPlusBtn, adultMinusBtn, childMinusBtn].forEach((btn) => {
        btn.classList.toggle("opacity-50", btn.disabled);
        btn.classList.toggle("cursor-not-allowed", btn.disabled);
        btn.classList.toggle("bg-gray-100 ", btn.disabled);
        btn.classList.toggle("text-gray-400 dark:text-white", btn.disabled);
      });
    }

    const total = adults + children;
    if (total > 0) {
      selectedGuests.textContent = `${total} guest${total > 1 ? "s" : ""}`;
      selectedGuests.classList.remove("text-gray-400 dark:text-white");
    } else {
      selectedGuests.textContent = "Add guests";
      selectedGuests.classList.add("text-gray-400 dark:text-white");
    }
  }
}

export function getFilters() {
  const raw = selectedLocation ? selectedLocation.textContent : null;
  const location = raw && !raw.includes("Find") ? raw.replace("📍 ", "").trim() : null;
  const guests = adults + children;
  return { location, guests };
}

document.addEventListener("click", (e) => {
  const el = e.target.closest("button");
  if (!el) return;

  const insideModal = el.closest("#searchModal");
  const isSearchByText = el.textContent && el.textContent.toLowerCase().includes("search");

  if (insideModal && isSearchByText) {
    import("./cards.js").then(({ showCards }) => {
      const filters = getFilters();
      showCards(filters);
    });
  }
});
