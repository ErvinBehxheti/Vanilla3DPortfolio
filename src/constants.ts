export const navLinks = [
  {
    id: 1,
    name: "Home",
    href: "#home",
  },
  {
    id: 2,
    name: "About",
    href: "#about",
  },
  {
    id: 3,
    name: "Work",
    href: "#work",
  },
  {
    id: 4,
    name: "Contact",
    href: "#contact",
  },
];

export const myProjects = [
  {
    title: "Neural Blogging",
    desc: "This project is a Progressive Web App (PWA) designed to provide a seamless native app experience on mobile devices. It leverages ChatGPT and web APIs to assist users in creating blog posts. When a new blog post is published, all registered devices with notifications enabled will receive a notification, ensuring users stay updated with the latest content. The app combines the accessibility of a website with the functionality and engagement of a native application. For the moment I have disabled the notification feature",
    href: "https://neural-blogging.vercel.app",
    logo: "/assets/logo/neural-blogging.png",
    image: "/assets/projects/neural-blogging.png",
    logoStyle: {
      backgroundColor: "#13202F",
      border: "0.2px solid #17293E",
      boxShadow: "0px 0px 60px 0px #2F6DB54D",
    },
    spotlight: "/assets/spotlight5.png",
    tags: [
      {
        id: 0,
        name: "NextJS",
        path: "https://cdn.worldvectorlogo.com/logos/next-js.svg",
      },
      {
        id: 1,
        name: "React.js",
        path: "/assets/react.svg",
      },
      {
        id: 2,
        name: "TailwindCSS",
        path: "/assets/tailwindcss.png",
      },
      {
        id: 3,
        name: "TypeScript",
        path: "/assets/typescript.png",
      },
      {
        id: 4,
        name: "Framer Motion",
        path: "/assets/framer.png",
      },
    ],
  },
  {
    title: "Kosherja (BeeHive)",
    desc: "This project is a user management platform with a modern UI/UX. Admins sign up with token-based authentication and use these tokens to scrape LinkedIn profiles for public information, including emails. They can then contact these users, manage them on a dedicated page, and store all scraped data. Additionally, the platform allows admins to download user data in Excel format.",
    logo: "/assets/logo/kosherja-logo.svg",
    logoStyle: {
      backgroundColor: "#2A1816",
      border: "0.2px solid #36201D",
      boxShadow: "0px 0px 60px 0px #AA3C304D",
    },
    image: "/assets/projects/kosherja.png",
    spotlight: "/assets/spotlight1.png",
    tags: [
      {
        id: 0,
        name: "NextJS",
        path: "https://cdn.worldvectorlogo.com/logos/next-js.svg",
      },
      {
        id: 1,
        name: "React.js",
        path: "/assets/react.svg",
      },
      {
        id: 2,
        name: "TailwindCSS",
        path: "assets/tailwindcss.png",
      },
      {
        id: 3,
        name: "TypeScript",
        path: "/assets/typescript.png",
      },
      {
        id: 4,
        name: "Cheerio",
        path: "https://cheerio.js.org/img/orange-c.svg",
      },
    ],
  },
  {
    title: "DigitalLove - ECommerce Store",
    desc: "This project is a streamlined eCommerce platform built with Next.js, Sanity, and Stripe. It features a user-friendly interface where customers can browse products, view detailed descriptions, and make secure purchases. Sanity handles content management, allowing for easy updates to product listings and site content. Stripe for ensuring secure transactions. The platform provides a smooth shopping experience with fast loading times and responsive design, optimized for both desktop and mobile devices.",
    href: "https://next-typescript-ecommerce-sanity-stripe-wggq.vercel.app/",
    logo: "https://avatars.githubusercontent.com/u/108547162?s=200&v=4",
    logoStyle: {
      backgroundColor: "#60f5a1",
      background:
        "linear-gradient(0deg, #60F5A150, #60F5A150), linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(208, 213, 221, 0.8) 100%)",
      border: "0.2px solid rgba(208, 213, 221, 1)",
      boxShadow: "0px 0px 60px 0px rgba(35, 131, 96, 0.3)",
    },
    image: "/assets/projects/ecommerce.png",
    spotlight: "/assets/spotlight3.png",
    tags: [
      {
        id: 0,
        name: "NextJS",
        path: "https://cdn.worldvectorlogo.com/logos/next-js.svg",
      },
      {
        id: 1,
        name: "React.js",
        path: "/assets/react.svg",
      },
      {
        id: 2,
        name: "TailwindCSS",
        path: "assets/tailwindcss.png",
      },
      {
        id: 3,
        name: "TypeScript",
        path: "/assets/typescript.png",
      },
      {
        id: 4,
        name: "Framer Motion",
        path: "/assets/framer.png",
      },
      {
        id: 5,
        name: "Sanity",
        path: "https://cdn.sanity.io/images/o0o2tn5x/production/eb0843b1adb22478e8f30d7fe89b377ebc6d5e85-280x280.png",
      },
      {
        id: 6,
        name: "Stripe",
        path: "https://images.ctfassets.net/kftzwdyauwt9/6c20363e-30c0-486d-2e9bfa611583/b15f2e43a5a525763c966ab4562a31b2/stripe.jpg?w=3840&q=90&fm=webp",
      },
    ],
  },
  {
    title: "PriceSeer",
    desc: "Using Next.js Server Actions, I created a web scraper that collects product information from the Amazon website and adds it to PriceSeer, a price-tracking platform. The scraper efficiently retrieves data such as product prices, descriptions, and availability. To enhance user experience, I also implemented cron jobs that run at scheduled intervals, automatically notifying subscribers whenever there are changes to the product's price or other key details (SCRAPING NOT WORKING MOMENTARILY)",
    href: "https://priceseer.vercel.app/",
    logo: "https://priceseer.vercel.app/assets/icons/logo.svg",
    logoStyle: {
      backgroundColor: "#13202F",
      border: "0.2px solid #17293E",
      boxShadow: "0px 0px 60px 0px #2F6DB54D",
    },
    image: "/assets/projects/scraping.png",
    spotlight: "/assets/spotlight1.png",
    tags: [
      {
        id: 0,
        name: "NextJS",
        path: "https://cdn.worldvectorlogo.com/logos/next-js.svg",
      },
      {
        id: 1,
        name: "React.js",
        path: "/assets/react.svg",
      },
      {
        id: 2,
        name: "TailwindCSS",
        path: "assets/tailwindcss.png",
      },
      {
        id: 3,
        name: "TypeScript",
        path: "/assets/typescript.png",
      },
      {
        id: 4,
        name: "Cheerio",
        path: "https://cheerio.js.org/img/orange-c.svg",
      },
    ],
  },
  {
    title: "TikTik - Social Media App",
    desc: "The website is a TikTok clone built using modern web development technologies. Developed with Next.js, the site ensures fast server-side rendering and optimized performance. Tailwind CSS is used to create a responsive and mobile-friendly user interface, that works effortlessly across devices.Sanity.io for the backend, allowing for content management and dynamic video uploads. The integration of Google authentication simplifies the login process, offering users a secure way to sign in or create accounts. Search filters are implemented to help users discover content easily.The file structure of the application is well-organized, promoting scalability and maintainability.",
    href: "https://tiktik-03.vercel.app/",
    logo: "https://www.freepnglogos.com/uploads/camera-logo-png/photography-clipart-camera-logo-pencil-color-6.png",
    logoStyle: {
      backgroundColor: "#60f5a1",
      background:
        "linear-gradient(0deg, #60F5A150, #60F5A150), linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(208, 213, 221, 0.8) 100%)",
      border: "0.2px solid rgba(208, 213, 221, 1)",
      boxShadow: "0px 0px 60px 0px rgba(35, 131, 96, 0.3)",
    },
    image: "/assets/projects/socialmedia.png",
    spotlight: "/assets/spotlight2.png",
    tags: [
      {
        id: 0,
        name: "NextJS",
        path: "https://cdn.worldvectorlogo.com/logos/next-js.svg",
      },
      {
        id: 1,
        name: "React.js",
        path: "/assets/react.svg",
      },
      {
        id: 2,
        name: "TailwindCSS",
        path: "assets/tailwindcss.png",
      },
      {
        id: 3,
        name: "TypeScript",
        path: "/assets/typescript.png",
      },
      {
        id: 5,
        name: "Sanity",
        path: "https://cdn.sanity.io/images/o0o2tn5x/production/eb0843b1adb22478e8f30d7fe89b377ebc6d5e85-280x280.png",
      },
    ],
  },
  {
    title: "Admin Dashboard",
    desc: "This advanced dashboard provides a comprehensive suite of tools for efficient data management and visualization. It includes interactive graphs for data analysis, Kanban boards for task management, and to-do lists for tracking progress. Users can customize their experience with color pickers and manage data through dynamic tables. The dashboard is designed for versatility, offering a robust and intuitive interface to handle a wide range of features and functionalities seamlessly.",
    href: "https://react-typescript-syncfusion-dashboard.vercel.app/",
    logo: "https://cdn-icons-png.flaticon.com/512/6820/6820898.png",
    logoStyle: {
      backgroundColor: "#0E1F38",
      border: "0.2px solid #0E2D58",
      boxShadow: "0px 0px 60px 0px #2F67B64D",
    },
    image: "/assets/projects/dashboard.png",
    spotlight: "/assets/spotlight4.png",
    tags: [
      {
        id: 1,
        name: "React.js",
        path: "/assets/react.svg",
      },
      {
        id: 2,
        name: "TailwindCSS",
        path: "assets/tailwindcss.png",
      },
      {
        id: 3,
        name: "TypeScript",
        path: "/assets/typescript.png",
      },
    ],
  },
];

export const avatarList = ["About Me", "Skills", "Experience"];

export const descriptionPanel = [
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

export const curvePath = [
  10.136184463414924, -1.374508746897471, 10.384881573913269,
  9.1152593889854714, -1.374508746897471, 8.5846792797570011,
  9.0669355709754882, -1.0665123466336568, 5.8937771631608156,
  10.151040177840205, -0.65913653144937956, 3.4340491740541346,
  10.806779203170416, 1.8859391007298545, 0.46855774212986023,
  10.761433540147586, 2.8724172201359197, -1.2811838605587311,
  9.6195923104445065, 2.8724172201359197, -3.2833099941904766,
  6.9763020889151646, 2.7659257976905427, -4.7591958908830172,
  6.0461277891353697, 1.0727045302089879, -6.6638740164090482,
  7.3472235778544794, -1.8228856326635698, -9.0685043046185623,
  7.226367212900791, -1.8228856326635698, -10.499536640855691,
  5.8354566696263914, -1.8228856326635698, -12.039219379199908,
  3.6532357452141353, -0.20463983570573391, -13.87695442281038,
  -0.30169589630131455, 1.5965000671484342, -14.879986418947327,
  -2.8925694230502157, 2.2971364614427481, -13.892095587598131,
  -4.537672295357936, 4.5863515759659208, -12.140831652074551,
  -6.1287913464117594, 5.9653814634119815, -8.9776527318875896,
  -6.0120301606452813, 4.4081161943855998, -6.712084358394045,
  -5.2138252159038974, 2.820894808418279, -4.4532820412085607,
  -2.3424712835109611, 2.2032065005086259, -3.0788773693500198,
  -0.0076956453915433265, 1.8931797788880202, -1.6577070662471063,
  -0.24767503988481437, 2.8845808465856684, 0.073915859214221724,
  -2.2174044353598896, 4.2415524507318576, 2.215992718290742,
  -3.4526531678364756, 3.0615192023340851, 4.7922404932096558,
  -3.7356278971556445, 1.4054080369354316, 7.8432021841434629,
  -3.4003734463804118, 1.1924069108769393, 9.2464090886227073,
  -1.8851803760476225, 1.5269331003449989, 10.306083896408374,
  0.01071077144031829, 2.1101821577522295, 10.490880699847727,
  0.42562058195647001, 2.2759939598834387, 11.613129436580291,
  0.096405262182225115, 0.032317784084054391, 16.223455375061565,
  2.3458797884520433, 0.38907275257695584, 19.91188266079584,
  5.7018400098488771, 1.73337964747396, 20.615481586999959, 7.9720939736751824,
  1.73337964747396, 19.303399329816457, 9.8672362721095652,
  0.090083018057025177, 16.893338541618121, 11.225959519544134,
  -1.374508746897471, 14.279002555560753, 11.288646925965876,
  -1.374508746897471, 11.926359497447137, 10.136184463414924,
  -1.374508746897471, 10.384881573913269,
];
