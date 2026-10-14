// Content for "Welcome to the Family of God", transcribed word-for-word from the
// congregation's slide deck. Text in [square brackets] is a placeholder still to be filled in.

export type Ref = string;

export type Block =
  | { kind: "lead"; text: string; ref?: Ref }
  | { kind: "scripture"; text: string; ref: Ref; note?: string }
  | { kind: "points"; numbered?: boolean; items: { title?: string; text?: string; ref?: Ref }[] }
  | { kind: "callout"; label: string; text: string; ref?: Ref }
  | {
      kind: "case";
      then: { text: string; ref: Ref };
      now: { text: string };
      lesson: { text: string; ref: Ref };
    }
  | { kind: "definition"; term: string; text: string; note: string; ref: Ref }
  | { kind: "stats"; items: { value: string; label: string }[] }
  | { kind: "columns"; items: { label: string; title?: string; ref?: Ref; lines: string[] }[] }
  | { kind: "table"; title?: string; headers: string[]; rows: string[][] }
  | { kind: "writeIn"; id: string; title: string; count: number };

export type Section = { kicker: string; title?: string; blocks: Block[] };

export type QuizQuestion = { q: string; read: Ref };

export type Lesson = {
  slug: string;
  number: number;
  title: string;
  summary: string;
  outline: string[];
  sections: Section[];
  quiz: QuizQuestion[];
};

export const studyMeta = {
  eyebrow: "A three-lesson study for the newly baptized",
  title: "Welcome to the Family of God",
  subtitle: "What God did for you when you obeyed the gospel, and what He now requires of you",
  byline: "Watkins Road Church of Christ  ·  Columbus, Ohio",
  quizTitle: "Answer from your Bible",
  quizNote: "Write your answers down. Bring any questions to Bro. Sabin Johnson or to Bible class.",
};

export const lessons: Lesson[] = [
  {
    slug: "what-god-did",
    number: 1,
    title: "What God did for you",
    summary: "The new birth, the church you were added to, and the gift you received.",
    outline: [
      "You obeyed the gospel",
      "Your sins are gone",
      "The Lord added you to His church",
      "What the church is and why it matters",
      "You are a new creation",
      "The gift of the Holy Spirit",
    ],
    sections: [
      {
        kicker: "Lesson 1 · What happened yesterday",
        title: "You obeyed the gospel",
        blocks: [
          {
            kind: "lead",
            text: "You did not invent a path to God. You obeyed the one He revealed, the same pattern every convert in Acts obeyed.",
            ref: "Acts 2:37–41; 8:35–39; 16:30–34",
          },
          {
            kind: "points",
            numbered: true,
            items: [
              {
                title: "Heard",
                text: "Faith comes by hearing the Word of God",
                ref: "Romans 10:17",
              },
              { title: "Believed", text: "Jesus is the Christ, the Son of God", ref: "John 8:24" },
              { title: "Repented", text: "Turned from sin to serve God", ref: "Acts 17:30" },
              { title: "Confessed", text: "Jesus as Lord with your mouth", ref: "Romans 10:9–10" },
              { title: "Baptized", text: "Immersed for the remission of sins", ref: "Acts 2:38" },
            ],
          },
        ],
      },
      {
        kicker: "Lesson 1 · Case study",
        title: "Obedience that would not wait",
        blocks: [
          {
            kind: "case",
            then: {
              text: "A busy royal treasurer read Isaiah on a long trip. Philip preached Jesus to him. He saw water, asked what hindered him, and was baptized on the spot.",
              ref: "Acts 8:26–39",
            },
            now: {
              text: "A nurse reads the Bible on her phone after night shifts. A coworker studies with her. She asks, “What keeps me from being baptized?” That night, she obeys.",
            },
            lesson: {
              text: "When the truth is clear, obedience is urgent. Neither one waited for a convenient day.",
              ref: "2 Corinthians 6:2",
            },
          },
        ],
      },
      {
        kicker: "Lesson 1 · Your sins are gone",
        title: "Washed away",
        blocks: [
          {
            kind: "scripture",
            text: "“Arise, and be baptized, and wash away thy sins, calling on the name of the Lord.”",
            ref: "Acts 22:16",
          },
          {
            kind: "points",
            items: [
              {
                title: "Buried and raised with Christ",
                text: "You were baptized into His death and raised to walk in newness of life.",
                ref: "Romans 6:3–4",
              },
              {
                title: "Saved by His blood",
                text: "Baptism now saves you, not by washing the body but by the answer of a good conscience.",
                ref: "1 Peter 3:21",
              },
            ],
          },
          {
            kind: "callout",
            label: "Today",
            text: "When a debt is paid in full, the statement reads $0. Not paused, not reduced. Gone.",
          },
        ],
      },
      {
        kicker: "Lesson 1 · You are in His church",
        title: "The Lord added you",
        blocks: [
          {
            kind: "lead",
            text: "You did not join a denomination or vote yourself in. The moment you were saved, Christ added you to the one body He purchased with His own blood.",
          },
          {
            kind: "points",
            items: [
              {
                ref: "Acts 2:47",
                text: "The Lord added to the church daily such as should be saved.",
              },
              {
                ref: "1 Corinthians 12:13",
                text: "By one Spirit we are all baptized into one body.",
              },
              {
                ref: "Ephesians 4:4–5 · Acts 20:28",
                text: "One body, one Lord, one faith, one baptism, bought with His blood.",
              },
            ],
          },
          {
            kind: "callout",
            label: "Today",
            text: "No baby applies to join a family. Birth makes them a member. Your new birth did the same.",
            ref: "John 3:5",
          },
        ],
      },
      {
        kicker: "Lesson 1 · Definition",
        title: "What is the church?",
        blocks: [
          {
            kind: "definition",
            term: "ekklēsia",
            text: "“The called out.” The church is the people God has called out of sin by the gospel and gathered to Christ: the body of the saved.",
            note: "Not a building, a denomination or a club. People who belong to Christ.",
            ref: "2 Thess. 2:14; 1 Peter 2:9",
          },
          {
            kind: "points",
            items: [
              {
                title: "Built by Christ",
                ref: "Matthew 16:18",
                text: "“Upon this rock I will build my church.”",
              },
              {
                title: "Bought by His blood",
                ref: "Acts 20:28",
                text: "He purchased it at the price of His own life.",
              },
              {
                title: "Headed by Christ",
                ref: "Colossians 1:18",
                text: "He is the head of the body; His Word governs it.",
              },
              {
                title: "One body",
                ref: "Ephesians 4:4; 1:22–23",
                text: "One church, seen in local congregations of saints.",
              },
            ],
          },
        ],
      },
      {
        kicker: "Lesson 1 · Bible names for Bible things",
        title: "What Scripture calls the church",
        blocks: [
          {
            kind: "points",
            items: [
              {
                title: "Church of Christ",
                text: "It belongs to Christ and wears His name.",
                ref: "Romans 16:16",
              },
              {
                title: "Church of God",
                text: "God is its owner and its builder.",
                ref: "1 Corinthians 1:2",
              },
              {
                title: "The body",
                text: "Christ is the head; members serve together.",
                ref: "Ephesians 1:22–23",
              },
              {
                title: "The kingdom",
                text: "Christ reigns as King over His people.",
                ref: "Colossians 1:13",
              },
              {
                title: "House of God",
                text: "A family of brothers and sisters in Christ.",
                ref: "1 Timothy 3:15",
              },
              {
                title: "The bride",
                text: "Loved by Christ and kept pure for Him.",
                ref: "Ephesians 5:25–27",
              },
            ],
          },
          {
            kind: "callout",
            label: "Its members",
            text: "are called disciples, Christians, saints and brethren.",
            ref: "Acts 11:26; 1 Peter 4:16; Colossians 1:2",
          },
        ],
      },
      {
        kicker: "Lesson 1 · Case study",
        title: "Following men instead of Christ",
        blocks: [
          {
            kind: "case",
            then: {
              text: "Corinth split into camps: “I am of Paul,” “I of Apollos,” “I of Cephas.” Paul answered, “Is Christ divided? Was Paul crucified for you?”",
              ref: "1 Corinthians 1:10–13",
            },
            now: {
              text: "People choose a church by a favorite preacher, a music style or an online personality, and wear names that Scripture never gave.",
            },
            lesson: {
              text: "Christ alone was crucified for you. Follow Him, wear His name and stay united in His Word.",
              ref: "1 Corinthians 3:4–7",
            },
          },
        ],
      },
      {
        kicker: "Lesson 1 · Its importance",
        title: "Why the church matters",
        blocks: [
          {
            kind: "points",
            items: [
              { ref: "Ephesians 5:25", text: "Christ loved the church and gave Himself for it." },
              { ref: "Ephesians 5:23", text: "He is the Savior of the body. The saved are in it." },
              { ref: "Ephesians 2:16", text: "We are reconciled to God in one body by the cross." },
              {
                ref: "Ephesians 3:10–11",
                text: "It was in God’s eternal purpose, not an afterthought.",
              },
              { ref: "1 Timothy 3:15", text: "It is the pillar and ground of the truth." },
              { ref: "Ephesians 3:21", text: "God is glorified in the church by Christ Jesus." },
            ],
          },
          {
            kind: "callout",
            label: "Think about it",
            text: "Saying “I love Jesus, but not the church” is like telling a man you love him but despise his bride.",
          },
        ],
      },
      {
        kicker: "Lesson 1 · You are a new creation",
        blocks: [
          {
            kind: "scripture",
            text: "“If any man be in Christ, he is a new creature: old things are passed away; behold, all things are become new.”",
            ref: "2 Corinthians 5:17",
          },
          {
            kind: "lead",
            text: "The old life was buried in the water. The life you live now, you live by faith in the Son of God.",
            ref: "Galatians 2:20",
          },
        ],
      },
      {
        kicker: "Lesson 1 · The Holy Spirit",
        title: "The gift you received",
        blocks: [
          {
            kind: "points",
            items: [
              {
                title: "Promised at baptism",
                text: "The gift of the Holy Spirit is for all who repent and are baptized.",
                ref: "Acts 2:38–39; 5:32",
              },
              {
                title: "He dwells in you",
                text: "Your body is now His temple. Honor God with it.",
                ref: "1 Cor. 6:19–20; Romans 8:9",
              },
              {
                title: "He leads through the Word",
                text: "The sword of the Spirit is the Word of God, not a feeling.",
                ref: "Ephesians 6:17; John 16:13",
              },
              {
                title: "Miracles confirmed the Word",
                text: "Signs confirmed the message until it was complete.",
                ref: "Mark 16:20; Heb. 2:3–4; 1 Cor. 13:8–10",
              },
            ],
          },
          {
            kind: "callout",
            label: "Today",
            text: "Feelings rise and fall with sleep and circumstance. Test everything by the Word.",
            ref: "1 John 4:1",
          },
        ],
      },
    ],
    quiz: [
      { q: "What did baptism do with your sins?", read: "Acts 22:16" },
      { q: "Who added you to the church?", read: "Acts 2:47" },
      {
        q: "Why does the church wear Christ’s name and no man’s?",
        read: "Romans 16:16; 1 Corinthians 1:13",
      },
      { q: "How does the Holy Spirit lead you today?", read: "Ephesians 6:17" },
    ],
  },
  {
    slug: "now-you-must-grow",
    number: 2,
    title: "Now you must grow",
    summary: "God has given three means of growth: His Word, prayer and the assembly.",
    outline: [
      "Grow like a newborn",
      "How we got the Bible",
      "How God kept His Word",
      "How we know what God approves",
      "Open your Bible every day",
      "Prayer and worship",
    ],
    sections: [
      {
        kicker: "Lesson 2 · Now you must grow",
        title: "Grow like a newborn",
        blocks: [
          {
            kind: "scripture",
            text: "“As newborn babes, desire the sincere milk of the word, that ye may grow thereby.”",
            ref: "1 Peter 2:2",
            note: "A baby who never eats does not stay a baby; it dies.",
          },
          {
            kind: "points",
            numbered: true,
            items: [
              { title: "The Word", text: "God speaks to you", ref: "2 Timothy 3:16–17" },
              { title: "Prayer", text: "You speak to God", ref: "Philippians 4:6" },
              {
                title: "The assembly",
                text: "You worship with the saints",
                ref: "Hebrews 10:24–25",
              },
            ],
          },
        ],
      },
      {
        kicker: "Lesson 2 · The Word of God",
        title: "How we got the Bible",
        blocks: [
          {
            kind: "points",
            numbered: true,
            items: [
              {
                title: "God breathed it",
                text: "All Scripture is given by inspiration of God.",
                ref: "2 Tim. 3:16–17",
              },
              {
                title: "Spirit-led men wrote it",
                text: "Holy men spoke as moved by the Holy Spirit.",
                ref: "2 Pet. 1:20–21",
              },
              {
                title: "Churches received it",
                text: "Read, copied and shared as the Word of God.",
                ref: "Col. 4:16; 1 Thess. 2:13",
              },
              {
                title: "It reached you",
                text: "Translated so every nation can hear and obey.",
                ref: "Rom. 16:25–26",
              },
            ],
          },
          {
            kind: "stats",
            items: [
              { value: "66", label: "books" },
              { value: "About 40", label: "writers, one Author" },
              { value: "1,500 years", label: "roughly, from Moses to John" },
              { value: "3", label: "languages: Hebrew, Aramaic, Greek" },
            ],
          },
        ],
      },
      {
        kicker: "Lesson 2 · The books of the Bible",
        title: "How the books were recognized",
        blocks: [
          {
            kind: "columns",
            items: [
              {
                label: "Old Testament",
                title: "Jesus confirmed it",
                lines: [
                  "He named its three parts: the Law, the Prophets and the Psalms. — Luke 24:44",
                  "He spoke of it from Abel to Zechariah, first book to last. — Luke 11:51",
                ],
              },
              {
                label: "New Testament",
                title: "The apostles gave it",
                lines: [
                  "Their writings carried the Lord’s own authority. — 1 Cor. 14:37; Ephesians 2:20",
                  "They called one another’s writings Scripture. — 2 Peter 3:15–16; 1 Tim. 5:18",
                ],
              },
            ],
          },
          {
            kind: "callout",
            label: "Remember",
            text: "God gave the books. His people received them. No council made them Scripture.",
          },
        ],
      },
      {
        kicker: "Lesson 2 · Its preservation",
        title: "God kept His Word",
        blocks: [
          {
            kind: "scripture",
            text: "“The grass withereth, the flower fadeth: but the word of our God shall stand for ever.”",
            ref: "Isaiah 40:8 · 1 Peter 1:23–25 · Matthew 24:35",
          },
          {
            kind: "lead",
            text: "God promised to preserve His Word, and He has. The Bible in your hands is the message the apostles delivered.",
          },
          {
            kind: "callout",
            label: "Today",
            text: "Like a file saved on thousands of devices: if one copy has a typo, the others expose it.",
          },
          {
            kind: "stats",
            items: [
              {
                value: "5,000+",
                label:
                  "Greek manuscripts of the New Testament, far more than any other ancient book",
              },
              {
                value: "1947",
                label:
                  "Dead Sea Scrolls found: Isaiah copied a thousand years earlier reads the same",
              },
              {
                value: "Complete",
                label:
                  "The faith was delivered once for all. Nothing to add or take away. Jude 3; Rev. 22:18–19",
              },
            ],
          },
        ],
      },
      {
        kicker: "Lesson 2 · Bible authority",
        title: "How we know what God approves",
        blocks: [
          {
            kind: "lead",
            text: "Whatever we do in word or deed must be done in the name of the Lord Jesus, by His authority.",
            ref: "Colossians 3:17; 1 Peter 4:11",
          },
          {
            kind: "points",
            numbered: true,
            items: [
              { title: "Command", text: "“Repent, and be baptized.”", ref: "Acts 2:38" },
              {
                title: "Approved example",
                text: "Disciples met on the first day to break bread.",
                ref: "Acts 20:7",
              },
              {
                title: "Necessary conclusion",
                text: "Preaching Jesus included teaching baptism.",
                ref: "Acts 8:35–36",
              },
              {
                title: "God’s silence",
                text: "“Gopher wood” ruled out every other wood.",
                ref: "Gen. 6:14; Heb. 7:14",
              },
            ],
          },
          {
            kind: "callout",
            label: "Today",
            text: "A prescription for one medicine does not let the pharmacist add others. God’s silence is not permission.",
          },
        ],
      },
      {
        kicker: "Lesson 2 · Case study",
        title: "Adding to what God said",
        blocks: [
          {
            kind: "case",
            then: {
              text: "Teachers told Gentile Christians they must also be circumcised. Paul said adding to the gospel perverts it, and those who bound it were severed from Christ.",
              ref: "Galatians 1:6–9; 5:4",
            },
            now: {
              text: "A church adds whatever draws a crowd, reasoning, “The Bible doesn’t say not to.” God’s silence is treated as permission.",
            },
            lesson: {
              text: "God’s Word is complete. Adding to it is as serious as taking from it.",
              ref: "Revelation 22:18–19; 2 John 9",
            },
          },
        ],
      },
      {
        kicker: "Lesson 2 · The Word",
        title: "Open your Bible every day",
        blocks: [
          {
            kind: "scripture",
            text: "“Study to shew thyself approved unto God, a workman that needeth not to be ashamed, rightly dividing the word of truth.”",
            ref: "2 Timothy 2:15",
          },
          {
            kind: "lead",
            text: "Be like the Bereans: receive the Word eagerly and search the Scriptures daily to see whether things are so.",
            ref: "Acts 17:11",
          },
          {
            kind: "callout",
            label: "Today",
            text: "Most of us check our phones before we get out of bed. Open God’s Word first.",
          },
          {
            kind: "table",
            title: "A first reading plan",
            headers: ["Weeks", "Read"],
            rows: [
              ["1–3", "John: who Jesus is"],
              ["4–6", "Acts: how the church began"],
              ["7–8", "Romans 1–8"],
              ["9–10", "Ephesians and Philippians"],
              ["11–12", "James and 1 Peter"],
            ],
          },
          { kind: "lead", text: "Bring your questions to Bible class. No question is too small." },
        ],
      },
      {
        kicker: "Lesson 2 · Prayer",
        title: "Speak to your Father",
        blocks: [
          {
            kind: "points",
            items: [
              {
                title: "Pray without ceasing",
                text: "Make prayer the habit of every day, not an emergency measure.",
                ref: "1 Thessalonians 5:17",
              },
              {
                title: "Bring every care",
                text: "With thanksgiving, make your requests known, and His peace will guard you.",
                ref: "Philippians 4:6–7",
              },
              {
                title: "Pray in Jesus’ name",
                text: "Christ is the one mediator between God and men.",
                ref: "John 14:13–14; 1 Timothy 2:5",
              },
              {
                title: "Pray for others",
                text: "The fervent prayer of a righteous man avails much.",
                ref: "James 5:16",
              },
            ],
          },
          {
            kind: "callout",
            label: "Today",
            text: "Prayer is not a 911 call for emergencies. It is the daily conversation of a child with his Father.",
          },
        ],
      },
      {
        kicker: "Lesson 2 · The assembly",
        title: "Worship with the saints",
        blocks: [
          {
            kind: "scripture",
            text: "“Not forsaking the assembling of ourselves together, as the manner of some is.”",
            ref: "Hebrews 10:25",
          },
          {
            kind: "lead",
            text: "Every first day of the week, the church worships as the New Testament directs, not as men prefer.",
          },
          {
            kind: "table",
            headers: ["Act of worship", "What it is", "Scripture"],
            rows: [
              [
                "Lord’s Supper",
                "Remembering His death every first day",
                "Acts 20:7; 1 Cor. 11:23–26",
              ],
              [
                "Singing",
                "With the voice, making melody in the heart",
                "Ephesians 5:19; Col. 3:16",
              ],
              ["Prayer", "Praying together as one body", "Acts 2:42"],
              ["Preaching", "Hearing the Word proclaimed", "Acts 20:7; 2 Tim. 4:2"],
              ["Giving", "Laying by in store as prospered", "1 Cor. 16:1–2; 2 Cor. 9:7"],
            ],
          },
        ],
      },
    ],
    quiz: [
      { q: "Where did the Bible come from: men or God?", read: "2 Peter 1:20–21" },
      { q: "What does God’s silence teach us?", read: "Hebrews 7:14" },
      {
        q: "What does the church do every first day of the week?",
        read: "Acts 20:7; Ephesians 5:19",
      },
      { q: "When will you read and pray each day? Write your plan.", read: "Psalm 55:17" },
    ],
  },
  {
    slug: "a-new-way-of-life",
    number: 3,
    title: "A new way of life",
    summary: "Living holy, standing firm, serving the body and sharing the good news.",
    outline: [
      "Put off the old, put on the new",
      "When temptation comes",
      "Assurance and faithfulness",
      "Answer opposition with love",
      "Use what God gave you",
      "Tell someone what the Lord did",
    ],
    sections: [
      {
        kicker: "Lesson 3 · A new way of life",
        title: "Put off the old, put on the new",
        blocks: [
          {
            kind: "columns",
            items: [
              {
                label: "Put off",
                ref: "Colossians 3:5–9",
                lines: [
                  "Sexual sin of every kind (1 Thess. 4:3)",
                  "Anger, rage and filthy talk (Col. 3:8)",
                  "Lying, even small lies (Eph. 4:25)",
                  "Stealing and cheating (Eph. 4:28)",
                  "Drunkenness and getting high (1 Pet. 4:3)",
                ],
              },
              {
                label: "Put on",
                ref: "Colossians 3:12–17",
                lines: [
                  "Compassion and kindness (Col. 3:12)",
                  "Forgiving as Christ forgave (Col. 3:13)",
                  "Honest, hard work (Eph. 4:28)",
                  "Speech that builds up (Eph. 4:29)",
                  "Thankfulness in everything (Col. 3:15)",
                ],
              },
            ],
          },
          {
            kind: "callout",
            label: "Today",
            text: "This includes what you watch, scroll, post and text. Ask: would I do this with Christ beside me?",
            ref: "Philippians 4:8",
          },
        ],
      },
      {
        kicker: "Lesson 3 · Case study",
        title: "A costly clean break",
        blocks: [
          {
            kind: "case",
            then: {
              text: "New Christians in Ephesus confessed their deeds and publicly burned their books of magic, worth fifty thousand pieces of silver.",
              ref: "Acts 19:18–20",
            },
            now: {
              text: "A new Christian deletes apps, cancels subscriptions, blocks old contacts and ends a sinful relationship, even when it costs money and friends.",
            },
            lesson: {
              text: "Christ is worth more than anything you give up. Make a clean break, not a slow goodbye.",
              ref: "Philippians 3:7–8",
            },
          },
        ],
      },
      {
        kicker: "Lesson 3 · The fight is real",
        title: "When temptation comes",
        blocks: [
          {
            kind: "lead",
            text: "Baptism did not end your battle with sin. It enlisted you in the Lord’s army. Satan will press harder now, but God has not left you defenseless.",
          },
          {
            kind: "points",
            items: [
              {
                title: "Resist",
                text: "God will not let you be tempted beyond what you can bear; He makes a way of escape. Resist the devil and he will flee.",
                ref: "1 Cor. 10:13; James 4:7; Eph. 6:10–11",
              },
              {
                title: "When you stumble",
                text: "You are not baptized again. Repent, confess your sin to God, and pray. As you walk in the light, the blood keeps cleansing you.",
                ref: "1 John 1:7–9; Acts 8:22; James 5:16",
              },
            ],
          },
          {
            kind: "callout",
            label: "Today",
            text: "Delete the app, leave the group chat, change the route home. Flee temptation; do not flirt with it.",
            ref: "2 Timothy 2:22",
          },
        ],
      },
      {
        kicker: "Lesson 3 · Assurance",
        title: "You can know you are saved",
        blocks: [
          {
            kind: "scripture",
            text: "“These things have I written unto you that believe on the name of the Son of God; that ye may know that ye have eternal life.”",
            ref: "1 John 5:13",
          },
          {
            kind: "points",
            items: [
              {
                title: "Built on God’s promise",
                text: "Not on how you feel today. God cannot lie.",
                ref: "Mark 16:16; Titus 1:2",
              },
              {
                title: "Kept in the light",
                text: "As you walk with Him, the blood keeps cleansing.",
                ref: "1 John 1:7",
              },
              {
                title: "No condemnation",
                text: "Those in Christ are not under God’s sentence.",
                ref: "Romans 8:1",
              },
            ],
          },
          {
            kind: "callout",
            label: "Today",
            text: "A child does not wake up wondering if he is still in the family. Live as God’s child: confident and faithful.",
          },
        ],
      },
      {
        kicker: "Lesson 3 · Finish what you started",
        blocks: [
          {
            kind: "scripture",
            text: "“Be thou faithful unto death, and I will give thee a crown of life.”",
            ref: "Revelation 2:10",
          },
          {
            kind: "lead",
            text: "A Christian can fall away. Scripture warns saved people to take heed lest an evil heart of unbelief turn them from the living God. Salvation is kept by continuing in the faith.",
            ref: "Hebrews 3:12–14; Galatians 5:4; 2 Peter 2:20–22; Matthew 24:13",
          },
          {
            kind: "callout",
            label: "Today",
            text: "The marathon medal goes to the runner who crosses the finish line, not the one who started fast.",
            ref: "Hebrews 12:1",
          },
        ],
      },
      {
        kicker: "Lesson 3 · Case study",
        title: "One drifted, one came back",
        blocks: [
          {
            kind: "case",
            then: {
              text: "Demas served beside Paul, then forsook him, loving this present world. John Mark once left the work too, but returned and became useful.",
              ref: "2 Timothy 4:10–11; Acts 13:13",
            },
            now: {
              text: "A young man’s new job takes his Sundays. He drifts for months. A brother keeps calling, and he comes home to the Lord and the church.",
            },
            lesson: {
              text: "Drifting happens slowly. If you drift, come back. If a brother drifts, go after him.",
              ref: "James 5:19–20",
            },
          },
        ],
      },
      {
        kicker: "Lesson 3 · When others object",
        title: "Answer opposition with love",
        blocks: [
          {
            kind: "points",
            items: [
              {
                title: "Expect it",
                text: "Jesus said even family may oppose those who follow Him.",
                ref: "Matthew 10:34–37; 2 Tim. 3:12",
              },
              {
                title: "Answer gently",
                text: "Be ready to give a reason for your hope, with meekness.",
                ref: "1 Peter 3:15",
              },
              {
                title: "Let your life speak",
                text: "Godly conduct can win people without a word.",
                ref: "1 Peter 3:1–2; Matthew 5:16",
              },
              {
                title: "Do not turn back",
                text: "Seek to please Christ, not to win approval.",
                ref: "Luke 9:62; Galatians 1:10",
              },
            ],
          },
          {
            kind: "callout",
            label: "Today",
            text: "Someone may say, “I was already baptized as a baby.” Don’t argue. Open the Bible together and study.",
          },
        ],
      },
      {
        kicker: "Lesson 3 · Your work in the body",
        title: "Use what God gave you",
        blocks: [
          {
            kind: "lead",
            text: "Every member has a function. No one is a spectator.",
            ref: "Romans 12:4–8; 1 Peter 4:10",
          },
          {
            kind: "points",
            items: [
              { text: "Welcome visitors and new members", ref: "Romans 15:7" },
              { text: "Visit the sick, widows and shut-ins", ref: "James 1:27" },
              { text: "Learn now so you can teach later", ref: "2 Timothy 2:2" },
              { text: "Give cheerfully each Lord’s Day", ref: "2 Corinthians 9:7" },
              { text: "Help with practical needs", ref: "Galatians 6:10" },
              { text: "Pray for the members by name", ref: "Ephesians 6:18" },
            ],
          },
          {
            kind: "callout",
            label: "Today",
            text: "A team loses when players sit on the bench. Ask Bro. Sabin Johnson where you can start serving this month.",
          },
        ],
      },
      {
        kicker: "Lesson 3 · Share the good news",
        title: "Tell someone what the Lord did",
        blocks: [
          {
            kind: "points",
            items: [
              {
                ref: "John 1:41",
                text: "Andrew first found his own brother Simon and brought him to Jesus.",
              },
              { ref: "Acts 8:4", text: "Ordinary Christians went everywhere preaching the Word." },
              {
                ref: "Matthew 28:19–20",
                text: "Go, teach, baptize, and teach them to observe all He commanded.",
              },
            ],
          },
          {
            kind: "callout",
            label: "Today",
            text: "If you found the cure for a disease killing your family, you would not keep it quiet. The gospel is that cure.",
          },
          {
            kind: "writeIn",
            id: "invite",
            title: "Three people I will invite to study or worship",
            count: 3,
          },
        ],
      },
    ],
    quiz: [
      { q: "What one thing must you put off this week?", read: "Colossians 3:5–9" },
      { q: "What should a Christian do when he sins?", read: "1 John 1:7–9" },
      { q: "How should you answer someone who objects?", read: "1 Peter 3:15" },
      { q: "Who will you tell about Christ this month?", read: "John 1:41" },
    ],
  },
];

export const firstSteps = {
  kicker: "This week",
  title: "Your first steps",
  items: [
    { text: "Read John chapters 1–3", ref: "John 20:31" },
    { text: "Memorize Acts 2:38 and 1 John 1:7", ref: "Psalm 119:11" },
    { text: "Pray every morning and every night", ref: "Psalm 55:17; Daniel 6:10" },
    { text: "Sunday class 9:00 AM and worship 10:00 AM", ref: "Acts 20:7" },
    { text: "Wednesday Bible study 7:00 PM", ref: "Acts 2:42" },
    { text: "Study with Bro. Sabin Johnson on Sunday or Wednesday", ref: "2 Timothy 2:2" },
  ],
};

export const closing: Section[] = [
  {
    kicker: "Your charge",
    blocks: [
      {
        kind: "scripture",
        text: "“Choose you this day whom ye will serve… as for me and my house, we will serve the LORD.”",
        ref: "Joshua 24:15",
      },
      {
        kind: "points",
        numbered: true,
        items: [
          { title: "Read daily" },
          { title: "Pray always" },
          { title: "Assemble faithfully" },
          { title: "Live holy" },
          { title: "Tell others" },
        ],
      },
      {
        kind: "lead",
        text: "Fight the good fight, finish the course, keep the faith. A crown of righteousness waits for all who love His appearing.",
        ref: "2 Timothy 4:7–8",
      },
    ],
  },
  {
    kicker: "The hope ahead",
    blocks: [
      {
        kind: "scripture",
        text: "“I will come again, and receive you unto myself; that where I am, there ye may be also.”",
        ref: "John 14:3",
      },
      {
        kind: "lead",
        text: "The Lord Himself will descend from heaven, the dead in Christ will rise, and we will be with Him forever.",
        ref: "1 Thessalonians 4:16–18",
      },
      {
        kind: "callout",
        label: "Today",
        text: "Like a family counting the days until a soldier comes home, live ready for His return.",
        ref: "2 Peter 3:11–14",
      },
    ],
  },
  {
    kicker: "Welcome home",
    blocks: [
      {
        kind: "scripture",
        text: "“Ye are all the children of God by faith in Christ Jesus. For as many of you as have been baptized into Christ have put on Christ.”",
        ref: "Galatians 3:26–27",
      },
      {
        kind: "lead",
        text: "You have brothers and sisters here who will pray for you, study with you and walk beside you. Call on us.",
      },
      {
        kind: "lead",
        text: "Watkins Road Church of Christ  ·  Alethia001@gmail.com  ·  (614) 491-7518",
      },
    ],
  },
];

/** Where "Send answers" emails go (the church address printed on the deck's last slide). */
export const studyEmail = "Alethia001@gmail.com";
export const studyMentor = "Bro. Johnson";

export function answersMailto(lesson: Lesson, answers: Record<string, string>, name: string) {
  const who = name.trim();
  const subject = `Lesson ${lesson.number} answers – ${who || "New Christian"}`;
  const lines = [
    `${studyMeta.title}`,
    `Lesson ${lesson.number}: ${lesson.title}`,
    who ? `From: ${who}` : "",
    "",
    ...lesson.quiz.flatMap((item, i) => [
      `${i + 1}. ${item.q}`,
      `Read: ${item.read}`,
      `Answer: ${answers[`${lesson.slug}-q${i}`]?.trim() || "(no answer yet)"}`,
      "",
    ]),
  ];
  return `mailto:${studyEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}

export function getLesson(slug: string) {
  return lessons.find((lesson) => lesson.slug === slug);
}
