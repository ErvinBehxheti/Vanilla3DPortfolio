import { navLinks } from "./constants";

const menuIcon = document.getElementById("menu-icon") as HTMLImageElement;
const sidebar = document.getElementById("sidebar") as HTMLDivElement;

let isOpen = false;

export const toggleMenu = () => {
  isOpen = !isOpen;
  sidebar.classList.toggle("max-h-screen", isOpen);
  sidebar.classList.toggle("max-h-0", !isOpen);
  menuIcon.src = isOpen ? "assets/close.svg" : "assets/menu.svg";
};

const closeMenu = () => {
  isOpen = false;
  sidebar.classList.remove("max-h-screen");
  sidebar.classList.add("max-h-0");
  menuIcon.src = "assets/menu.svg";
};

const populateNavItems = (navContainer: HTMLElement) => {
  navLinks.forEach((item) => {
    const li = document.createElement("li");
    li.classList.add("nav-li");

    const a = document.createElement("a");
    a.href = item.href;
    a.classList.add("nav-li_a");
    a.textContent = item.name;
    a.onclick = closeMenu;

    li.appendChild(a);
    navContainer.appendChild(li);
  });
};

export const initNav = () => {
  const navItems = document.getElementById("nav-items") as HTMLUListElement;
  const navItemsMobile = document.getElementById(
    "nav-items-mobile"
  ) as HTMLUListElement;

  populateNavItems(navItems);
  populateNavItems(navItemsMobile);
};
