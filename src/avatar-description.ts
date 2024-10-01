import { avatarList, descriptionPanel } from "./constants";

const aboutList = document.querySelector("#about-list") as HTMLElement;
const descriptionText = document.querySelector(
  "#description-text"
) as HTMLElement;

let activeIndex = 0;

function renderDescription(index: number) {
  descriptionText.innerHTML = descriptionPanel[index];
}

function renderAboutList() {
  avatarList.forEach((item, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    listItem.className =
      "hover:bg-white/50 hover:text-black p-4 cursor-pointer";

    if (index === activeIndex) {
      listItem.classList.add("active", "bg-white", "text-black");
      renderDescription(activeIndex);
    }

    listItem.addEventListener("mouseover", () => {
      renderDescription(index);
    });

    listItem.addEventListener("mouseout", () => {
      renderDescription(activeIndex);
    });

    listItem.addEventListener("click", () => {
      setActiveItem(index, listItem);
    });

    aboutList.appendChild(listItem);
  });
}

function setActiveItem(newIndex: number, clickedItem: HTMLElement) {
  const listItems = aboutList.querySelectorAll("li");
  listItems.forEach((item) => {
    item.classList.remove("active", "bg-white", "text-black");
  });

  clickedItem.classList.add("active", "bg-white", "text-black");

  activeIndex = newIndex;

  renderDescription(activeIndex);
}

renderAboutList();
