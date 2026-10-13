// FoodBridge front-end demo interactions.
// Donations and pickup requests are kept in browser memory only; there is no database.

const donationForm = document.getElementById("donationForm");
const foodList = document.getElementById("foodList");
const searchInput = document.getElementById("search");
const toast = document.getElementById("toast");
let toastTimer;

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
}

function toggleMenu() {
  const links = document.querySelector(".navlinks");
  if (!links) return;
  const isOpen = links.style.display === "flex";
  links.style.display = isOpen ? "" : "flex";
  if (!isOpen) {
    links.style.flexDirection = "column";
    links.style.position = "absolute";
    links.style.top = "76px";
    links.style.left = "0";
    links.style.right = "0";
    links.style.padding = "18px 24px";
    links.style.background = "#fff";
    links.style.zIndex = "10";
    links.style.boxShadow = "0 10px 20px #173b2d18";
  }
}

function claimFood(meals) {
  showToast(`Pickup request noted for ${meals} meals (demo only).`);
}

function filterFood() {
  if (!foodList || !searchInput) return;
  const query = searchInput.value.trim().toLowerCase();
  foodList.querySelectorAll(".food-card").forEach(card => {
    const searchable = `${card.innerText} ${card.dataset.text || ""}`.toLowerCase();
    card.style.display = searchable.includes(query) ? "" : "none";
  });
}

if (donationForm) {
  donationForm.addEventListener("submit", event => {
    event.preventDefault();

    const donor = document.getElementById("donor").value.trim();
    const food = document.getElementById("food").value.trim();
    const quantity = Number(document.getElementById("quantity").value);
    const time = document.getElementById("time").value;
    const location = document.getElementById("location").value.trim();
    const notes = document.getElementById("notes").value.trim();

    if (!donor || !food || !Number.isFinite(quantity) || quantity < 1 || !time || !location) {
      document.getElementById("formMsg").textContent = "Please complete all required fields.";
      return;
    }

    // Add the new listing to the page only. Refreshing the page clears this demo entry.
    const card = document.createElement("article");
    card.className = "food-card";
    card.dataset.text = `${donor} ${food} ${location} ${notes}`;
    const photo = document.createElement("div");
    photo.className = "food-photo";
    photo.textContent = "🍱";
    const body = document.createElement("div");
    body.className = "food-body";
    const badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = `${quantity} meals`;
    const heading = document.createElement("h3");
    heading.textContent = food;
    const description = document.createElement("p");
    description.textContent = `${donor} • ${location}`;
    const pickup = document.createElement("small");
    pickup.textContent = `Pickup before ${time}`;
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Request Pickup";
    button.addEventListener("click", () => claimFood(quantity));

    body.append(badge, heading, description, pickup, button);
    card.append(photo, body);
    foodList.prepend(card);
    if (searchInput) searchInput.value = "";
    filterFood();

    document.getElementById("formMsg").textContent =
      "Donation added to the page for this session. It is not saved to a database.";
    donationForm.reset();
    showToast("Demo donation published on this page.");
    document.getElementById("find").scrollIntoView({ behavior: "smooth" });
  });
}

// Expose functions used by the HTML onclick handlers.
window.toggleMenu = toggleMenu;
window.claimFood = claimFood;
window.filterFood = filterFood;
