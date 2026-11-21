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

  OPTIONAL FIELDS (leave them out and the card looks like October's):
    kicker  replaces the small label ("Field notes" / "Portrait")
    notes   replaces the fixed headings with your own (see November for the shape)
    word    the homepage's "Mot de la semaine"
    photo   true for a real photo (pixel art is drawn crisp; photos are drawn smooth)
    imageFocus  which part of a cropped photo stays in view, like "70% 40%"
    person.image  adds a photo beside the Portrait

  accent: the month's color, taken from the animal. "light" is used on the light theme,
  "dark" on the dark theme (it needs to be brighter to show up on black).
*/

window.MONTHLY = [
  {
    id: "2026-11",
    label: "November 2026",
    accent: { light: "#A6192E", dark: "#F2848C" },   // Marine Corps scarlet, for the Corps' birthday (Nov 10)

    animal: {
      kicker: "Animal of the Month",
      number: 2,
      french: "Le bouledogue anglais",
      english: "The English Bulldog",
      nickname: "USMC mascot",
      scientific: "Canis familiaris",
      status: "Chesty & The Devil Dogs",
      image: "images/bulldog.jpg",
      imageAlt: "An English Bulldog in a Marine Corps dress blue mascot coat.",
      photo: true,              // a real photo, not pixel art (keeps it smooth instead of pixelated)
      imageFocus: "72% 45%",    // which part of the photo stays in view when it's cropped (x% y%)

      // LEARN: "notes" swaps the usual Biology / Behavior columns for two columns with
      // their own headings. Each entry is [heading, [paragraphs]].
      notes: [
        ["Origin", [
          "No Marine Corps tribute is complete without the iconic English Bulldog. Born out of World War I lore—where German soldiers reportedly nicknamed relentless U.S. Marines 'Teufelshunde' (Devil Dogs)—the English Bulldog became the Corps' mascot in 1922."
        ]],
        ["The mascots", [
          "Famous mascots like Sgt. Maj. Jiggs and the legendary 'Chesty' lineage (named after Lt. Gen. Lewis 'Chesty' Puller) have represented grit, stubbornness, and loyalty for over a century.",
          "Tough, stocky, and impossible to push around, the bulldog embodies the exact no-nonsense mindset General Gray fought to keep alive."
        ]]
      ],

      question: "Bulldogs were bred to look tough, but their short snouts make it hard to cool down by panting. How does a mascot built for grit get through summer parades in a dress blue coat?",

      vocab: [
        ["le bouledogue anglais", "the English Bulldog (masculine)"],
        ["la mascotte", "mascot"],
        ["le chien du diable", "devil dog"],
        ["têtu", "stubborn"],
        ["fidèle", "loyal, faithful"],
        ["le Corps des Marines", "the Marine Corps"]
      ],
      sentence: {
        fr: "Le bouledogue anglais est têtu, mais toujours fidèle.",
        en: "The English Bulldog is stubborn, but always faithful."
      },
      // LEARN: the homepage's "Mot de la semaine" box reads these two lines.
      word: { fr: "le bouledogue anglais", en: "English Bulldog" },

      sources: [
        ["DVIDS, \"The birth of the Marine Corps mascot\"", "https://www.dvidshub.net/news/84547/birth-marine-corps-mascot"],
        ["MCRD San Diego, \"Bulldog mascots in the Marine Corps\"", "https://www.mcrdsd.marines.mil/About/MCRD-San-Diego-Mascot/"],
        ["Photo via Military.com", "https://www.military.com/history/marine-corps-mascot-chesty-xvi-gets-promoted-his-way-outranking-you.html"]
      ]
    },

    person: {
      kicker: "Person of the Month",
      name: "General Alfred M. \"Al\" Gray Jr.",
      years: "1928–2024",
      role: "29th Commandant of the Marine Corps | \"The Enlisted Marines' Commandant\"",
      image: "images/al-gray.jpg",
      imageAlt: "General Alfred M. Gray Jr. in his camouflage utility uniform.",
      imageFocus: "54% 35%",

      // LEARN: "notes" swaps the four usual Portrait headings for your own. [heading, text].
      notes: [
        ["Why I looked him up", "I started digging into military history this month because I wanted to understand what great strategy actually looks like in the real world—and that search led me straight to General Alfred M. Gray Jr."],
        ["From private to Commandant", "Dropping out of college during the Korean War in 1950 to enlist as a private, Gray worked his way all the way up to four-star general and became the 29th Commandant of the Marine Corps in 1987."],
        ["Every Marine a rifleman", "Known as 'the Enlisted Marines' Commandant,' he famously took his official portrait in camouflage utilities instead of dress blues and institutionalized the mantra: 'Every Marine is, first and foremost, a rifleman.' To back it up, he created Marine Combat Training (MCT) so even Marines working behind a desk learn field tactics and survival before touching their primary job."],
        ["What I'm taking from it", "You don't have to be a Marine—or a future one—to live by what Gray stood for: great strategy isn't about fancy titles or sitting in an ivory tower. It's about making sure nobody on your team is above the fundamentals, preparing everyone for when things go sideways, and leading from the front no matter how high you climb."]
      ],

      sources: [
        ["Marines.mil, \"Marines mourn the loss of Corps legend and 29th Commandant, General Alfred Gray\" (2024)", "https://www.marines.mil/News/News-Display/Article/3720707/marines-mourn-the-loss-of-corps-legend-and-29th-commandant-general-alfred-gray/"],
        ["Marine Corps History Division, \"General Alfred M. Gray Jr.\"", "https://www.usmcu.edu/Research/Marine-Corps-History-Division/People/Whos-Who-in-Marine-Corps-History/Gagnon-Ingram/General-Alfred-M-Gray-Jr/"],
        ["Photo via USNI News", "https://news.usni.org/2024/03/20/gen-al-gray-beloved-marine-29th-usmc-commandant-dies-at-95"]
      ]
    }
  },
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
      image: "images/macaque.jpg",
      imageAlt: "A young Japanese macaque grooming an adult's face in a steaming hot spring",
      photo: true,
      imageFocus: "50% 45%",

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
        ["Hirata et al., \"Sweet-potato washing revisited\" (2001)", "https://www.j-monkey.jp/lng/pdf/sweet-potato-washing/Hirata-2001-Sweet-potato-washing-revisited.pdf"],
        ["Photo via Snow Monkey Resorts", "https://www.snowmonkeyresorts.com/tours/1-day-snow-monkey-zenkoji-temple-tour/"]
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
