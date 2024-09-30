const aboutList = document.querySelector("#about-list") as HTMLElement;
const descriptionText = document.querySelector(
  "#description-text"
) as HTMLElement;

const avatarList = ["About Me", "Skills", "Experience"];

const descriptionPanel = [
  `
              <div class="relative z-10 space-y-6">
            <h1
              class="max-sm:text-sm sm:text-xl md:text-2xl lg:text-3xl font-semibold uppercase tracking-wider text-[#00eaff] border-b border-[#00eaff] pb-2"
            >
              Ervin Behxheti
            </h1>
            <p class="text-base font-light leading-relaxed text-gray-300 poppins">
              I’m a front-end developer specializing in React.js, Next.js, and
              Node.js, with a focus on building responsive, high-performance web
              applications. I love solving problems and building things through
              code. Programming isn't just my profession—it’s my passion. I
              enjoy exploring new technologies, and enhancing my skills.
            </p>
          </div>
          <div class="absolute top-4 right-4 flex items-center gap-2">
            <div class="h-2 w-2 bg-[#00eaff] rounded-full"></div>
            <div class="text-sm uppercase tracking-wide text-[#00eaff]">
              Active
            </div>
          </div>
    `,
  `<h1
            class="max-sm:text-sm sm:text-xl md:text-2xl lg:text-3xl font-semibold uppercase tracking-wider text-[#00eaff] border-b border-[#00eaff] pb-2 mb-6"
          >
            Web Development Skills
          </h1>
          <div class="grid grid-cols-2 gap-6">
            <div>
              <h2 class="max-sm:text-sm sm:text-xl font-medium text-[#00eaff] mb-2">
                Languages & Frameworks
              </h2>
              <ul class="max-sm:text-xs md:space-y-2 text-sm leading-6 text-gray-300">
                <li>JavaScript</li>
                <li>TypeScript</li>
                <li>HTML & CSS</li>
                <li>React.js</li>
                <li>Next.js</li>
                <li>Node.js</li>
                <li>Express.js</li>
              </ul>
            </div>
            <div>
              <h2 class="max-sm:text-sm sm:text-xl font-medium text-[#00eaff] mb-2">
                Libraries & Tools
              </h2>
              <ul class="max-sm:text-xs md:space-y-2 text-sm leading-6 text-gray-300">
                <li>Three.js</li>
                <li>Zustand, Redux, useContext</li>
                <li>D3.js & Lodash</li>
                <li>TailwindCSS & SCSS</li>
                <li>Prisma & MongoDB</li>
                <li>Git & Version Control</li>
                <li>Supabase</li>
              </ul>
            </div>
            <div>
            </div>
          </div>
          <div class="absolute bottom-4 right-4 flex items-center gap-2">
            <div class="h-2 w-2 bg-[#00eaff] rounded-full"></div>
            <div class="text-sm uppercase tracking-wide text-[#00eaff]">
              Skillful
            </div>
          </div>`,
  `
            <h1 class="max-sm:text-sm sm:text-xl md:text-2xl lg:text-3xl font-semibold uppercase tracking-wider text-[#00eaff] border-b border-[#00eaff]">
          Work Experience
        </h1>
        
        <div class="space-y-6 pb-20">
          <div>
            <h2 class="max-sm:text-sm sm:text-xl font-medium text-[#00eaff]">Front-End Developer</h2>
            <p class="text-sm text-gray-400">Attributy &bull; September 2022 - June 2024</p>
          </div>
      
          <ul class="list-disc list-inside space-y-2 max-sm:text-xs text-sm leading-relaxed text-gray-300">
            <li>Developed an interactive data visualization dashboard that provided real-time insights, empowering clients to make informed business decisions and increasing client satisfaction.</li>
            <li>Implemented Server-side Rendering (SSR), boosting page load speed by 30% and significantly enhancing SEO, leading to higher search engine rankings and increased web traffic.</li>
            <li>Optimized website algorithms and performance, improving key processes by up to 80%, resulting in faster load times and a better user experience.</li>
            <li>Led a front-end optimization initiative, reducing bounce rates by 25% and improving user engagement through a more responsive and user-friendly interface.</li>
          </ul>
        </div>
      
        <div class="absolute bottom-4 right-4 flex items-center gap-2">
          <div class="h-2 w-2 bg-[#00eaff] rounded-full"></div>
          <div class="text-sm uppercase tracking-wide text-[#00eaff]">2 Years Experience</div>
        </div>`,
];

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
