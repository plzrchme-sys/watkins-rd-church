export const church = {
  name: "Watkins Rd. church of Christ",
  formalName: "Watkins Road church of Christ",
  motto: "No Key...No Crown",
  mottoNote:
    "Faithful obedience to the gospel is the key to the kingdom, and the road to the crown.",
  city: "Columbus, Ohio",
  address: "1614 Watkins Road",
  locality: "Columbus, OH 43207",
  phone: "(614) 491-7518",
  phoneHref: "tel:+16144917518",
  mapsUrl:
    "https://maps.google.com/?q=1614+Watkins+Road,+Columbus,+OH+43207",
  /** Published site. Online giving continues there; this app does not take payment. */
  givingUrl: "http://www.cocwr.org",
  podcastUrl:
    "https://www.podbean.com/podcast-detail/v52jg-17284e/Watkins-Rd-COC-Podcast-2",
  channelUrl: "https://www.youtube.com/channel/UCdBcIWdyWYnEXjNc5TDLAyQ",
  crownUrl: "https://ivy.fm/podcast/on-the-road-to-the-crown-399198",
} as const;

export type Gathering = {
  id: string;
  title: string;
  detail: string;
  weekday: number;
  hour: number;
  minute: number;
  label: string;
};

/** Times published by the congregation (Sunday and Wednesday assemblies). */
export const gatherings: Gathering[] = [
  {
    id: "sun-class",
    title: "Sunday Bible class",
    detail: "Bible class before morning worship.",
    weekday: 0,
    hour: 9,
    minute: 0,
    label: "9:00 AM",
  },
  {
    id: "sun-am",
    title: "Sunday morning worship",
    detail: "Prayer, preaching, singing, the Lord’s supper, and giving.",
    weekday: 0,
    hour: 10,
    minute: 0,
    label: "10:00 AM",
  },
  {
    id: "sun-pm",
    title: "Sunday evening worship",
    detail: "A second assembly for preaching and prayer.",
    weekday: 0,
    hour: 17,
    minute: 0,
    label: "5:00 PM",
  },
  {
    id: "wed-pm",
    title: "Wednesday evening Bible study",
    detail: "Midweek study for the congregation.",
    weekday: 3,
    hour: 19,
    minute: 0,
    label: "7:00 PM",
  },
];

export type DatedGathering = Gathering & { when: Date };

export function upcomingGatherings(from: Date, count = 8): DatedGathering[] {
  const results: DatedGathering[] = [];
  const start = new Date(from);
  start.setHours(0, 0, 0, 0);
  for (let dayOffset = 0; dayOffset < 28 && results.length < count; dayOffset += 1) {
    const day = new Date(start);
    day.setDate(start.getDate() + dayOffset);
    for (const gathering of gatherings) {
      if (day.getDay() !== gathering.weekday) continue;
      const when = new Date(day);
      when.setHours(gathering.hour, gathering.minute, 0, 0);
      if (when.getTime() <= from.getTime()) continue;
      results.push({ ...gathering, when });
      if (results.length >= count) break;
    }
  }
  return results;
}

export const worshipParts = [
  { name: "Prayers", ref: "Acts 2:42" },
  { name: "Preaching", ref: "Acts 20:7" },
  { name: "Singing", ref: "Ephesians 5:19" },
  { name: "Giving", ref: "1 Corinthians 16:1–2" },
  { name: "The Lord’s supper", ref: "1 Corinthians 11:23–24" },
] as const;

export type Sermon = {
  id: string;
  title: string;
  scripture: string;
  book: string;
  speaker: string;
  date: string;
  series: string;
  summary: string;
  listenUrl: string;
};

export const sermons: Sermon[] = [
  {
    id: "discipline-3",
    title: "Discipline, part 3",
    scripture: "1 Corinthians 5",
    book: "1 Corinthians",
    speaker: "Brother Sabin Johnson",
    date: "2018-04-27",
    series: "Discipline",
    summary:
      "Spoken sermon from the Watkins Rd. archive, the third lesson in a series on 1 Corinthians 5.",
    listenUrl: church.podcastUrl,
  },
  {
    id: "discipline-2",
    title: "Discipline, part 2",
    scripture: "1 Corinthians 5",
    book: "1 Corinthians",
    speaker: "Brother Sabin Johnson",
    date: "2018-04-27",
    series: "Discipline",
    summary:
      "Spoken sermon from the Watkins Rd. archive, continuing the congregation’s study of 1 Corinthians 5.",
    listenUrl: church.podcastUrl,
  },
  {
    id: "discipline-1",
    title: "Discipline, part 1",
    scripture: "1 Corinthians 5",
    book: "1 Corinthians",
    speaker: "Brother Sabin Johnson",
    date: "2018-04-27",
    series: "Discipline",
    summary:
      "Spoken sermon from the Watkins Rd. archive, opening a series on church discipline in 1 Corinthians 5.",
    listenUrl: church.podcastUrl,
  },
  {
    id: "judges-6",
    title: "Bad things, good people",
    scripture: "Judges 6",
    book: "Judges",
    speaker: "Watkins Rd. archive",
    date: "2018-04-27",
    series: "Archive",
    summary:
      "Published as sermon podcast 16: Judges 6, “Bad Things… Good People.”",
    listenUrl: church.podcastUrl,
  },
  {
    id: "broken-hearted",
    title: "What becomes of the brokenhearted?",
    scripture: "James 1:2–4",
    book: "James",
    speaker: "Sister Regina & Sister Rasheeda Monique",
    date: "2017-05-30",
    series: "On the Road to the Crown",
    summary:
      "A lesson from James 1:2–4 on the On the Road to the Crown recordings from Watkins Rd.",
    listenUrl: church.crownUrl,
  },
  {
    id: "empowered-living",
    title: "Empowered living through Christ",
    scripture: "John 17:17; Romans 12:1–2",
    book: "John",
    speaker: "Sister Regina & Sister Monique",
    date: "2017-04-25",
    series: "On the Road to the Crown",
    summary:
      "A lesson on the word, a transformed mind, and being made in God’s image. Scriptures cited include John 17:17, Romans 12:1–2, Psalm 139, and Genesis 1:26.",
    listenUrl: church.crownUrl,
  },
];

export function sermonById(id: string) {
  return sermons.find((sermon) => sermon.id === id);
}

export const groups = [
  {
    id: "sunday-class",
    title: "Sunday Bible class",
    when: "Sundays, 9:00 AM",
    who: "The whole congregation",
    detail:
      "Class meets at the building before morning worship. Come early and sit in on the text for the day.",
  },
  {
    id: "wednesday-evening",
    title: "Wednesday evening Bible study",
    when: "Wednesdays, 7:00 PM",
    who: "The whole congregation",
    detail:
      "The midweek assembly. A quieter hour in the same simple pattern: open the Bible and stay with the text.",
  },
  {
    id: "children",
    title: "Children’s ministry",
    when: "During the Sunday assemblies",
    who: "Children and their families",
    detail:
      "The congregation’s public listing includes a children’s ministry. Ask at the building which class your child should join.",
  },
  {
    id: "community",
    title: "Community service",
    when: "As announced in the assembly",
    who: "Members and neighbors",
    detail:
      "The congregation is known for community service alongside worship in hymns, both older and newer.",
  },
] as const;
