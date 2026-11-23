// Inhalte für die TikTok-Trendspiele im 1-gegen-1-Bereich

// Blind Ranking: 5 Dinge nacheinander auf Platz 1–5 setzen, ohne zu wissen, was noch kommt
const BLIND = [
  { e: "⚽", n: "Fußballer", items: ["Erling Haaland", "Kylian Mbappé", "Lionel Messi", "Cristiano Ronaldo", "Neymar", "Jude Bellingham", "Lamine Yamal", "Vinícius Júnior", "Mohamed Salah", "Harry Kane", "Kevin De Bruyne", "Jamal Musiala", "Florian Wirtz", "David Alaba", "Marko Arnautović", "Luka Modrić", "Robert Lewandowski", "Bukayo Saka", "Pedri"] },
  { e: "🍔", n: "Fast Food", items: ["McDonald's", "Burger King", "KFC", "Subway", "Domino's", "Pizza Hut", "Five Guys", "Döner", "Leberkässemmel", "Würstelstand", "Nordsee", "Starbucks", "Dunkin'", "Taco Bell"] },
  { e: "🍫", n: "Snacks & Süßes", items: ["Nutella", "Haribo", "Pringles", "Manner-Schnitten", "Kinder Bueno", "KitKat", "Twix", "Snickers", "Milka", "M&M's", "Oreo", "Chips", "Popcorn", "Mozartkugel", "Soletti"] },
  { e: "📱", n: "Apps", items: ["TikTok", "Instagram", "Snapchat", "WhatsApp", "YouTube", "Spotify", "Netflix", "Discord", "BeReal", "Pinterest", "Twitch", "Duolingo", "Google Maps", "ChatGPT"] },
  { e: "🎮", n: "Videospiele", items: ["Minecraft", "Fortnite", "EA FC", "GTA V", "Roblox", "Mario Kart", "Among Us", "Brawl Stars", "Clash Royale", "Call of Duty", "Rocket League", "Pokémon", "Zelda", "Valorant", "League of Legends"] },
  { e: "✈️", n: "Urlaubsziele", items: ["Mallorca", "Kroatien", "Italien", "Griechenland", "Dubai", "New York", "Paris", "London", "Thailand", "Malediven", "Japan", "Ägypten", "Türkei", "Lignano", "Barcelona"] },
  { e: "🦸", n: "Superkräfte", items: ["Fliegen", "Unsichtbarkeit", "Teleportieren", "Gedankenlesen", "Zeitreisen", "Superstärke", "Superschnell laufen", "Unsterblichkeit", "Mit Tieren reden", "Dinge mit Gedanken bewegen", "Heilen", "Gestalt wechseln"] },
  { e: "🏫", n: "Schulfächer", items: ["Mathe", "Deutsch", "Englisch", "Turnen", "Geschichte", "Geografie", "Biologie", "Chemie", "Physik", "Informatik", "Musik", "Bildnerische Erziehung", "Werken"] },
  { e: "🍕", n: "Essen", items: ["Pizza", "Schnitzel", "Burger", "Sushi", "Pasta", "Döner", "Tacos", "Kaiserschmarrn", "Pommes", "Lasagne", "Gulasch", "Käsespätzle", "Ramen", "Wraps", "Palatschinken"] },
  { e: "🏎️", n: "Automarken", items: ["Ferrari", "Lamborghini", "Porsche", "BMW", "Mercedes", "Audi", "Tesla", "VW", "Bugatti", "McLaren", "Toyota", "Škoda", "Rolls-Royce", "Aston Martin"] },
  { e: "🏅", n: "Sportarten", items: ["Fußball", "Basketball", "Tennis", "Skifahren", "Schwimmen", "Formel 1", "Eishockey", "Volleyball", "Boxen", "Tischtennis", "Handball", "Golf", "Klettern", "Radfahren", "Snowboarden"] },
  { e: "🐼", n: "Tiere", items: ["Hund", "Katze", "Pferd", "Delfin", "Pinguin", "Löwe", "Panda", "Faultier", "Koala", "Hai", "Adler", "Fuchs", "Otter", "Elefant", "Giraffe"] },
  { e: "🌶️", n: "Spicy: Date-Ideen", items: ["Kino", "Picknick", "Eislaufen", "Essen gehen", "Bowling", "Escape Room", "Spaziergang im Park", "Konzert", "Freizeitpark", "Zusammen kochen", "Minigolf", "Sonnenuntergang schauen", "Shoppen", "Zoo", "Prater"] },
  { e: "🚩", n: "Spicy: Red Flags", items: ["Antwortet nie", "Redet nur über den Ex", "Liest deine Nachrichten", "Ist unhöflich zur Bedienung", "Kommt immer zu spät", "Postet alles über euch", "Lügt bei Kleinigkeiten", "Ist extrem eifersüchtig", "Hat keine Freunde", "Vergisst deinen Geburtstag", "Schaut beim Date nur aufs Handy", "Mag keine Tiere", "Lacht nie über deine Witze", "Ghostet nach dem Date"] },
  { e: "🥤", n: "Getränke", items: ["Cola", "Fanta", "Sprite", "Red Bull", "Almdudler", "Eistee", "Apfelsaft", "Wasser", "Kakao", "Milchshake", "Bubble Tea", "Orangensaft", "Spezi", "Holundersaft"] },
];

// Älter oder neuer? Erscheinungs- bzw. Gründungsjahre
const YEARS = [
  ["📱 iPhone", 2007], ["▶️ YouTube", 2005], ["📸 Instagram", 2010], ["💬 WhatsApp", 2009], ["👍 Facebook", 2004], ["🔎 Google", 1998],
  ["⛏️ Minecraft", 2011], ["🪂 Fortnite", 2017], ["👻 Snapchat", 2011], ["🎮 PlayStation", 1994], ["🕹️ Nintendo Switch", 2017],
  ["🍄 Super Mario Bros.", 1985], ["⚡ Pokémon (erste Spiele)", 1996], ["🧱 Tetris", 1984], ["🟩 Game Boy", 1989], ["❎ Xbox", 2001], ["🎳 Wii", 2006],
  ["🚓 GTA V", 2013], ["🐂 Red Bull", 1987], ["🍫 Nutella", 1964], ["🥤 Coca-Cola", 1886], ["🍊 Fanta", 1940], ["🎧 Spotify", 2008],
  ["📦 Amazon", 1994], ["🍏 Apple", 1976], ["🪟 Microsoft", 1975], ["📚 Wikipedia", 2001], ["🎙️ Discord", 2015], ["🔪 Among Us", 2018],
  ["🟥 Roblox", 2006], ["💶 Euro-Bargeld", 2002], ["🌕 Mondlandung", 1969], ["🧱 Fall der Berliner Mauer", 1989], ["🚢 Untergang der Titanic", 1912],
  ["🏆 Erste Fußball-WM", 1930], ["🧙 Erstes Harry-Potter-Buch", 1997], ["🌌 Erster Star-Wars-Film", 1977], ["🟢 Shrek", 2001], ["🤠 Toy Story", 1995],
  ["❄️ Die Eiskönigin", 2013], ["👱‍♀️ Barbie-Puppe", 1959], ["🧩 Lego-Stein", 1958], ["🟨 Zauberwürfel", 1974], ["🍬 PEZ", 1927],
  ["🎡 Wiener Riesenrad", 1897], ["🍰 Sachertorte", 1832], ["🎂 Mozart geboren", 1756], ["🧇 Manner-Schnitte", 1898], ["🏔️ Erste Winterspiele in Innsbruck", 1964],
  ["⚽ EM in Österreich & Schweiz", 2008], ["🇪🇺 Österreich in der EU", 1995], ["🌐 Erste Website", 1991], ["✉️ Erste SMS", 1992], ["🥚 Überraschungsei", 1974],
];

// Tiki-Taka-Toe: Zeilen = Vereine, Spalten = Nationen
const TTT_CLUBS = ["Real Madrid", "FC Barcelona", "FC Bayern", "Paris Saint-Germain", "Juventus", "Chelsea", "Manchester United", "Manchester City", "Liverpool", "Arsenal", "Inter Mailand", "AC Mailand", "Borussia Dortmund", "Atlético Madrid", "Tottenham", "Ajax Amsterdam", "Benfica", "SSC Neapel", "AS Rom", "Bayer Leverkusen", "RB Leipzig", "Red Bull Salzburg", "FC Sevilla", "AS Monaco"];
const TTT_NATIONS = ["🇫🇷 Frankreich", "🇧🇷 Brasilien", "🇪🇸 Spanien", "🇩🇪 Deutschland", "🏴󠁧󠁢󠁥󠁮󠁧󠁿 England", "🇦🇷 Argentinien", "🇵🇹 Portugal", "🇳🇱 Niederlande", "🇮🇹 Italien", "🇧🇪 Belgien", "🇦🇹 Österreich", "🇭🇷 Kroatien", "🇺🇾 Uruguay", "🇸🇳 Senegal"];
// Erfolge und Eigenschaften – jeweils mit vielen möglichen Antworten
const TTT_ACH = ["🏆 Weltmeister", "🇪🇺 Europameister", "⭐ Champions-League-Sieger", "🧤 Torhüter", "©️ Kapitän der Nationalmannschaft", "💯 Über 100 Länderspiele",
  "🇸🇦 Spielte in Saudi-Arabien", "🇺🇸 Spielte in den USA (MLS)", "📋 Wurde später Trainer", "🦶 Linksfuß", "🔟 Trug die Nummer 10", "7️⃣ Trug die Nummer 7",
  "🇩🇪 Spielte in der Bundesliga", "🏴󠁧󠁢󠁥󠁮󠁧󠁿 Spielte in der Premier League", "🇪🇸 Spielte in LaLiga", "🇮🇹 Spielte in der Serie A", "🥇 Torschützenkönig einer Top-Liga", "🎮 Hatte ein EA-FC-Rating über 90"];
const TTT_MODES = [
  { id: "land", e: "🌍", n: "Verein × Land", d: "Klassisch: Spieler, der für den Verein gespielt hat und aus dem Land kommt." },
  { id: "erfolg", e: "🏆", n: "Verein × Erfolg", d: "Z. B. Real Madrid × Weltmeister oder Arsenal × Linksfuß." },
  { id: "verein", e: "🔁", n: "Verein × Verein", d: "Spieler, der für beide Vereine gespielt hat – z. B. Bayern × Real." },
  { id: "land2", e: "🌐", n: "Land × Erfolg", d: "Z. B. Brasilien × Champions-League-Sieger oder Österreich × Bundesliga." },
  { id: "mix", e: "🎲", n: "Wilder Mix", d: "Alles gemischt – jedes Brett ist anders." },
];

// 5-Sekunden-Duell: drei Dinge in fünf Sekunden nennen
const FIVE = [
  "3 Fußballvereine aus Spanien", "3 Länder in Afrika", "3 Automarken", "3 Dinge im Kühlschrank", "3 Tiere mit vier Beinen", "3 Rapper:innen",
  "3 Pokémon", "3 Disney-Filme", "3 Obstsorten", "3 Gemüsesorten", "3 Sportarten mit Ball", "3 Hauptstädte in Europa", "3 Marvel-Helden",
  "3 Dinge in einem Badezimmer", "3 Schulfächer", "3 Videospiele", "3 Apps auf deinem Handy", "3 Fußballer aus Frankreich", "3 Pizzasorten",
  "3 Getränke", "3 Musikinstrumente", "3 Berufe mit Uniform", "3 Dinge, die fliegen können", "3 Farben in einer Flagge", "3 Süßigkeiten",
  "3 Dinge am Strand", "3 Wintersportarten", "3 Länder mit S", "3 Superkräfte", "3 Fast-Food-Ketten", "3 Körperteile mit 4 Buchstaben",
  "3 österreichische Städte", "3 Social-Media-Apps", "3 Tiere im Wasser", "3 Dinge, die rot sind", "3 Fußballer aus Brasilien", "3 Gewürze",
  "3 Kleidungsstücke für den Winter", "3 Haustiere", "3 Wörter, die mit Sch beginnen", "3 Harry-Potter-Figuren", "3 Planeten",
  "3 Dinge in einer Schultasche", "3 Brettspiele", "3 Sänger:innen", "3 Netflix-Serien", "3 Dinge aus Holz", "3 Hunderassen",
  "3 Eissorten", "3 Formel-1-Fahrer", "3 Limo-Marken", "3 Vögel", "3 Insekten", "3 Länder mit Meer",
  "3 Dinge, die man im Kino macht", "3 Emojis, die du oft benutzt", "3 Weihnachtssachen", "3 Fußball-Nationalmannschaften in Gelb", "3 Comicfiguren", "3 Sachen aus Plastik",
];

// Wer kennt mich besser?
const KENN = [
  "Was ist mein Lieblingsessen?", "Welche App benutze ich am meisten?", "Was ist mein Lieblingsfach (oder das am wenigsten schlimme)?", "Wovor habe ich am meisten Angst?",
  "Was würde ich mit 1 Million Euro als Erstes kaufen?", "Welches Tier wäre ich?", "Was ist mein Lieblingsfilm oder meine Lieblingsserie?", "Welcher Song läuft bei mir gerade in Dauerschleife?",
  "Was ist meine Lieblingsfarbe?", "Was ist mein größtes Talent?", "Welchen Superstar würde ich am liebsten treffen?", "Was ist mein Lieblingsfußballverein?",
  "Was mache ich am liebsten am Wochenende?", "Was ist mein Lieblingsgetränk?", "Welche Superkraft hätte ich am liebsten?", "Wo würde ich am liebsten Urlaub machen?",
  "Was ist mein Lieblings-Snack?", "Was nervt mich am meisten?", "Welches Videospiel spiele ich am liebsten?", "Was ist mein Traumberuf?",
  "Wie viele Stunden Bildschirmzeit habe ich ungefähr pro Tag?", "Welches Emoji verwende ich am häufigsten?", "Bin ich eher Frühaufsteher:in oder Nachteule?", "Was ist mein Lieblings-Fast-Food?",
  "Welches Auto hätte ich gern?", "Was ist meine Lieblingsjahreszeit?", "Was ist mein Lieblingseis?", "Was war mein peinlichster Moment, den du kennst?",
  "Welches Haustier hätte ich am liebsten?", "Wen aus der Klasse würde ich auf eine einsame Insel mitnehmen?", "Was ist mein Lieblingssport?", "Pizza oder Burger?",
  "Welche Serie habe ich zuletzt gesuchtet?", "Was ist meine Lieblings-Süßigkeit?", "Was würde ich nie essen?", "Welchen Spitznamen mag ich am meisten?",
];

// Tiki-Taka-Toe ohne Fußball: Zeile × Spalte, man nennt etwas, das zu beidem passt
const TTT_THEMES = [
  { id: "woerter", e: "🔤", n: "Wörter-Mix", d: "Z. B. Tier × K oder Beruf × M – nenn ein passendes Wort.",
    rows: ["🐾 Tier", "🍕 Essen", "🌍 Land", "👷 Beruf", "🧸 Gegenstand", "🏙️ Stadt", "🙋 Vorname", "🏷️ Marke", "⚽ Sportart", "💪 Körperteil"],
    cols: ["A", "B", "D", "F", "G", "H", "K", "L", "M", "P", "R", "S", "T", "W"].map(l => "Beginnt mit " + l) },
  { id: "tiere", e: "🐾", n: "Tiere", d: "Z. B. lebt in Afrika × hat Streifen oder Flecken.",
    rows: ["🌊 Lebt im Wasser", "🦁 Lebt in Afrika", "🐄 Lebt auf dem Bauernhof", "🌲 Lebt im Wald", "🏠 Ist ein Haustier", "🕊️ Kann fliegen", "🦘 Lebt in Australien", "🌴 Lebt im Dschungel"],
    cols: ["🦓 Hat Streifen oder Flecken", "🥩 Frisst Fleisch", "📏 Größer als ein Mensch", "🐭 Kleiner als eine Katze", "🍼 Ist ein Säugetier", "⚠️ Kann gefährlich sein", "🔤 Name hat 4 Buchstaben oder weniger"] },
  { id: "laender", e: "🌍", n: "Länder", d: "Z. B. Afrika × Flagge mit Grün.",
    rows: ["🇪🇺 Liegt in Europa", "🌏 Liegt in Asien", "🌍 Liegt in Afrika", "🌎 Liegt in Amerika"],
    cols: ["🔴 Flagge mit Rot", "🟢 Flagge mit Grün", "⭐ Flagge mit Stern", "🌊 Grenzt ans Meer", "⛰️ Kein Meerzugang", "👥 Über 50 Mio. Einwohner", "⚽ War schon WM-Gastgeber", "🔤 Beginnt mit S", "🔤 Beginnt mit B", "🔤 Name mit 5 Buchstaben oder weniger"] },
  { id: "filme", e: "🎬", n: "Filme", d: "Z. B. Animationsfilm × Titel mit einer Zahl.",
    rows: ["🎨 Animationsfilm", "🦸 Superheldenfilm", "🧙 Fantasyfilm", "😂 Komödie", "💥 Actionfilm", "🚀 Science-Fiction"],
    cols: ["🔢 Titel mit einer Zahl", "📼 Erschienen vor 2005", "🆕 Erschienen ab 2019", "🔁 Hat eine Fortsetzung", "🐶 Ein Tier spielt eine Hauptrolle", "1️⃣ Titel mit nur einem Wort", "🏰 Von Disney oder Pixar", "🇺🇸 Spielt in New York"] },
  { id: "stars", e: "🎤", n: "Stars & Musik", d: "Z. B. Rapper:in × aus Deutschland oder Österreich.",
    rows: ["🎤 Rapper:in", "👩‍🎤 Sängerin", "🧑‍🎤 Sänger", "🎭 Schauspieler:in", "📱 YouTuber:in oder Influencer:in"],
    cols: ["🇺🇸 Aus den USA", "🇩🇪 Aus Deutschland oder Österreich", "🇬🇧 Aus Großbritannien", "🔤 Vorname beginnt mit J", "🎬 War schon in einem Film", "🎂 Über 40 Jahre alt", "🏆 Hat einen Grammy oder Oscar"] },
  { id: "essen", e: "🍕", n: "Essen & Trinken", d: "Z. B. Obst × ist gelb oder Süßigkeit × aus Österreich.",
    rows: ["🍎 Obst", "🥕 Gemüse", "🍫 Süßigkeit", "🍔 Fast Food", "🥤 Getränk", "🥐 Frühstück"],
    cols: ["🔴 Ist rot", "🟡 Ist gelb", "🟢 Ist grün", "🔤 Beginnt mit B", "🔤 Beginnt mit K", "🇮🇹 Kommt aus Italien", "🇦🇹 Typisch österreichisch", "🧊 Isst oder trinkt man kalt"] },
];
