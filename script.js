const year = document.getElementById("y");
if (year) year.textContent = String(new Date().getFullYear());

const menuBtn = document.querySelector(".menu-btn");
const drawer = document.getElementById("drawer");

function closeDrawer() {
  if (!drawer || !menuBtn) return;
  drawer.hidden = true;
  menuBtn.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
}

function openDrawer() {
  if (!drawer || !menuBtn) return;
  drawer.hidden = false;
  menuBtn.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
}

menuBtn?.addEventListener("click", () => {
  if (drawer?.hidden) openDrawer();
  else closeDrawer();
});

drawer?.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => closeDrawer());
});

const revealTargets = document.querySelectorAll(".section-head, .pillars li, .stages article, .close-panel");
revealTargets.forEach((el) => el.classList.add("reveal"));

const io = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
);

revealTargets.forEach((el) => io.observe(el));
