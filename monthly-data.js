/*
  MONTHLY FEATURES
  ================
  Every month gets one entry in this list: a Field Notes animal and a Portrait person.
  The homepage shows the FIRST entry. The archive page shows all of them.

  TO ADD A NEW MONTH: copy the whole { ... } block below, paste it at the TOP of the
  list (right after the opening "["), add a comma after it, and change the text.
  Nothing else on the site needs to change.

  LEARN: this is a JavaScript array of objects. It works like JSON, a common way to store
  data as text. Keeping data separate from the HTML that displays it is a core idea in
  web development: you edit content here and never touch the layout.

  LEARN: why a .js file and not .json? Browsers won't load .json files when you open the
  page by double-clicking (file://). A .js file loads either way, so preview still works.

  accent: the month's color, taken from the animal. "light" is used on the light theme,
  "dark" on the dark theme (it needs to be brighter to show up on black).
*/

window.MONTHLY = [
  {
    id: "2026-10",
    label: "October 2026",
    accent: { light: "#B5473B", dark: "#F08B7D" },   // the macaque's red face

    animal: {
      number: 1,
      french: "Le macaque japonais",
      english: "Japanese macaque",
      nickname: "the snow monkey",
      scientific: "Macaca fuscata",
      status: "Least Concern on the IUCN Red List",
      // Replace with your own drawing or pixel art, e.g. image: "images/macaque.png"
      image: null,
      imageAlt: "Drawing of a Japanese macaque",

      biology: [
        "The northernmost-living monkey on Earth. Some troops spend their winters in the snowy mountains of northern Japan, farther north than any other non-human primate.",
        "A thick coat that grows denser for winter, and a short tail.",
        "The red face is bare skin with blood vessels close to the surface. It turns a brighter red during breeding season."
      ],

      behavior: [
        "At Jigokudani in Nagano, some macaques soak in volcanic hot springs through the winter. A 2018 Kyoto University study found that females who bathed had lower levels of stress hormones in winter, which suggests the baths help them cope with the cold.",
        "In 1953, on the island of Kōshima, a young female that researchers named Imo started washing sweet potatoes in water before eating them. The habit spread through her troop and was passed down to later generations, one of the first documented cases of culture in an animal other than humans."
      ],

      question: "Wet fur loses heat fast. How does a macaque keep a warm bath from costing it more warmth than it gives once it climbs back out into the snow?",

      vocab: [
        ["le macaque", "the macaque (masculine)"],
        ["la neige", "snow"],
        ["la source chaude", "hot spring"],
        ["le pelage", "fur, coat"],
        ["la troupe", "troop"],
        ["se baigner", "to bathe"]
      ],
      sentence: {
        fr: "En hiver, certains macaques se baignent dans les sources chaudes.",
        en: "In winter, some macaques bathe in hot springs."
      },

      sources: [
        ["Kyoto University, \"Spa therapy helps Japan's snow monkeys cope with the cold\" (2018)", "https://www.kyoto-u.ac.jp/en/research/research_results/2018/180404_1.html"],
        ["Hirata et al., \"Sweet-potato washing revisited\" (2001)", "https://www.j-monkey.jp/lng/pdf/sweet-potato-washing/Hirata-2001-Sweet-potato-washing-revisited.pdf"]
      ]
    },

    person: {
      name: "Claude Shannon",
      years: "1916–2001",
      role: "Mathematician and electrical engineer",

      figured: "That information can be measured. His 1948 paper, \"A Mathematical Theory of Communication,\" showed how to count the information in a message in bits, and proved there's a hard limit on how much any channel can carry reliably. Every text, call and video stream is built on that idea.",

      before: "Eleven years earlier, his MIT master's thesis showed that circuits made of electrical relays could carry out Boolean logic. That link between switches and math is what every digital computer is built on.",

      unknown: "His ideas are everywhere and almost invisible, so his name isn't. He also juggled, rode a unicycle through the halls of Bell Labs, and built Theseus, a mechanical mouse that could learn its way through a maze.",

      mine: "Code by Charles Petzold builds a computer out of relays and logic gates, which is Shannon's 1937 idea told slowly, one switch at a time. It's a big part of why a 28-pin chip on my kitchen counter felt like something I could understand.",

      sources: [
        ["Encyclopedia.com, \"Shannon, Claude Elwood\"", "https://www.encyclopedia.com/people/science-and-technology/mathematics-biographies/claude-elwood-shannon"]
      ]
    }
  }
];
