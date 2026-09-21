const year = document.getElementById("y");
if (year) year.textContent = String(new Date().getFullYear());

const menuBtn = document.querySelector(".menu-btn");
const drawer = document.getElementById("drawer");
const topBar = document.querySelector(".top");

function setDrawer(open) {
  if (!drawer || !menuBtn) return;
  if (open) {
    drawer.hidden = false;
    // Allow display:flex to apply before opacity transition
    requestAnimationFrame(() => {
      drawer.classList.add("is-open");
    });
    menuBtn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  } else {
    drawer.classList.remove("is-open");
    menuBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    window.setTimeout(() => {
      if (!drawer.classList.contains("is-open")) drawer.hidden = true;
    }, 360);
  }
}

menuBtn?.addEventListener("click", () => {
  const open = menuBtn.getAttribute("aria-expanded") !== "true";
  setDrawer(open);
});

drawer?.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => setDrawer(false));
});

window.addEventListener(
  "scroll",
  () => {
    if (!topBar) return;
    topBar.classList.toggle("scrolled", window.scrollY > 8);
  },
  { passive: true }
);

// Offset sticky header for in-page links
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const id = link.getAttribute("href");
    if (!id || id === "#") return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: "smooth" });
  });
});
