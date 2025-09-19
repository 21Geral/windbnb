const container = document.querySelector("#containerCards");
const staysTitle = document.querySelector("#staysTitle");
const staysCount = document.querySelector("#staysCount");

for (let index = 1; index <= 13; index++) {
  container.innerHTML += `
  
<div role="status" class="w-full animate-pulse">
  <!-- Imagen con aspect ratio -->
  <div class="w-full aspect-[4/3] bg-gray-300 rounded-3xl dark:bg-gray-500"></div>
  <div class="flex justify-between items-center mt-3">
    <div class="flex items-center gap-2 text-sm">
      <div class="h-5 w-20 bg-gray-200 rounded-full dark:bg-gray-500"></div>
      <div class="h-5 w-28 bg-gray-200 rounded-full dark:bg-gray-500"></div>
    </div>
    <div class="flex items-center gap-2">
      <div class="w-4 h-4 bg-gray-200 rounded-full dark:bg-gray-500"></div>
      <div class="h-4 w-6 bg-gray-200 rounded-full dark:bg-gray-500"></div>
    </div>
  </div>
  <div class="h-5 bg-gray-200 rounded-full dark:bg-gray-500 mt-3 w-2/3"></div>

  <span class="sr-only">Loading...</span>
</div> 
  `;
}

export async function showCards(filters = {}) {
  try {
    let answer = await fetch("./src/scripts/stays.json");
    let data = await answer.json();
    setTimeout(() => {
      container.innerHTML = "";

      if (filters.location) {
        data = data.filter((stay) => `${stay.city}, ${stay.country}` === filters.location);
      }

      if (filters.guests) {
        data = data.filter((stay) => stay.maxGuests >= filters.guests);
      }

      if (filters.location && filters.location !== "Show All") {
        staysTitle.textContent = `Stays in ${filters.location}`;
      } else {
        staysTitle.textContent = "Stays in Finland";
      }
      // Render cards
      if (data.length === 0) {
        container.innerHTML = `<p class="text-gray-500 dark:bg-white text-center">No results found</p>`;
        return;
      }
      staysCount.textContent = `${data.length} stay${data.length !== 1 ? "s" : ""}`;

      data.forEach(({ photo, type, beds, rating, title, superHost }) => {
        let superhost = superHost ? "" : "hidden";
        container.innerHTML += `
        <div class="cursor-pointer">
          <div class="w-full aspect-[4/3] ">
            <img class="rounded-3xl  bg-cover w-full h-full" src="${photo}" alt="apartment-img" />
          </div>
          <div class="flex justify-between items-center text-center mt-2">
            <div class="flex items-center pt-2 text-center text-sm">
              <span class="border-[1px] rounded-xl px-4 py-1 mr-2 text-xs dark:text-white ${superhost}">SUPER HOST</span>
              <h2 class="text-gray-500 dark:text-gray-200">
                  ${type}${beds !== null ? ` · ${beds} beds` : ""}
                </h2>
            </div>
            <div class="flex items-center gap-2 text-center">
              <img class="w-5" src="https://windbnb-dev-challenges.vercel.app/assets/star.55f860b4.svg" alt="start" />
              <h4 class="text-sm">${rating}</h4>
            </div>
          </div>
          <h2 class="font-bold text-lg mt-2 dark:text-white">${title}</h2>
        </div>  
    `;
      });
    }, 2000);
  } catch (error) {
    console.log("Error cargando stays:", error);
  }
}
