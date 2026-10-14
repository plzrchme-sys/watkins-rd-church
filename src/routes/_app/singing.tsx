import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/singing")({
  head: () => ({ meta: [{ title: "Singing · Watkins Rd." }] }),
  component: SingingPage,
});

const passages = [
  {
    cite: "Ephesians 5:18–19",
    title: "New Testament command",
    text: "And do not get drunk with wine, for that is debauchery, but be filled with the Spirit, addressing one another in psalms and hymns and spiritual songs, singing and making melody to the Lord with your heart.",
  },
  {
    cite: "Colossians 3:16",
    title: "The heart as the instrument",
    text: "Let the word of Christ dwell in you richly, teaching and admonishing one another in all wisdom, singing psalms and hymns and spiritual songs, with thankfulness in your hearts to God.",
  },
  {
    cite: "Acts 16:25",
    title: "The early church",
    text: "About midnight Paul and Silas were praying and singing hymns to God, and the prisoners were listening to them.",
  },
  {
    cite: "1 Corinthians 14:15",
    title: "Singing with understanding",
    text: "What am I to do? I will pray with my spirit, but I will pray with my mind also; I will sing praise with my spirit, but I will sing with my mind also.",
  },
  {
    cite: "James 5:13",
    title: "The cheerful sing",
    text: "Is anyone cheerful? Let him sing psalms.",
  },
] as const;

const voices = [
  {
    cite: "Clement of Alexandria, about 150–215",
    text: "The one instrument of peace, the Word alone by which we honor God, is what we employ. We no longer employ the ancient psaltery, trumpet, timbrel, and flute.",
  },
  {
    cite: "John Calvin",
    text: "Musical instruments belong to the Jewish ceremonies and agree with the childish state of the Old Testament.",
  },
  {
    cite: "John Wesley",
    text: "I have no objection to instruments of music in our chapels, provided they are neither heard nor seen.",
  },
] as const;

const questions = [
  {
    q: "Isn’t a cappella singing just a tradition or preference?",
    a: "A cappella singing is a longstanding practice in churches of Christ, but it is not merely a preference or a tradition. It follows the consistent New Testament pattern for Christian worship, and the practice of the early church for several centuries. Churches of Christ seek to restore New Testament Christianity in every part of the faith, including worship.",
  },
  {
    q: "The Bible doesn’t explicitly forbid instruments, so why not use them?",
    a: "Biblical authority is established by explicit commands, by approved examples, and by necessary inferences. When God specifies how something is to be done, that specification excludes other methods. The New Testament instructs Christians to sing and make melody in their hearts. That instruction shows what God desires for Christian worship.",
  },
  {
    q: "Doesn’t the Bible mention harps in heaven?",
    a: "Revelation uses symbolic language, and that imagery includes harps. Those passages are apocalyptic. They do not set the pattern for the church’s worship on earth. The instructions given to the church about music consistently specify singing, and they do not mention instruments.",
  },
  {
    q: "Didn’t they use instruments in the Old Testament?",
    a: "Yes. Instruments were used in Old Testament worship, especially in the temple. Christians are under the new covenant, not the law of Moses. The New Testament gives a new pattern for worship. Animal sacrifices and incense were commanded then, and they are not offered in the church now. In the same way, the church follows the New Testament instructions for music, which specify singing.",
  },
] as const;

function SingingPage() {
  return (
    <article className="max-w-2xl">
      <p className="text-sm font-medium text-muted">A cappella</p>
      <h1 className="mt-2 font-display text-4xl">Instrumental music in worship</h1>
      <p className="mt-4 text-base text-ink">
        Churches of Christ practice a cappella singing — vocal music without instrumental
        accompaniment — in worship. The practice follows the New Testament pattern. Every passage
        that mentions music in Christian worship specifies singing.
      </p>

      <h2 className="mt-10 font-display text-2xl">What the New Testament says</h2>
      <ul className="mt-4 flex flex-col gap-6">
        {passages.map((passage) => (
          <li key={passage.cite} className="border-l-2 border-pine pl-4">
            <p className="text-sm text-brass">{passage.cite}</p>
            <p className="mt-1 text-sm font-medium text-ink">{passage.title}</p>
            <p className="mt-2 text-base text-ink">{passage.text}</p>
          </li>
        ))}
      </ul>

      <h2 className="mt-10 font-display text-2xl">Early church practice</h2>
      <p className="mt-3 text-base text-ink">
        Historical evidence indicates that the early church practiced a cappella singing
        exclusively. Instrumental music was not part of Christian worship for several centuries
        after the church was established.
      </p>
      <p className="mt-3 text-base text-ink">
        Many early Christian writers specifically mentioned that Christians used only vocal music,
        distinguishing their practice from both Jewish temple worship and pagan ceremonies which
        used instruments.
      </p>
      <ul className="mt-6 flex flex-col gap-6">
        {voices.map((voice) => (
          <li key={voice.cite}>
            <p className="text-base text-ink">“{voice.text}”</p>
            <p className="mt-1 text-sm text-muted">{voice.cite}</p>
          </li>
        ))}
      </ul>

      <h2 className="mt-10 font-display text-2xl">Introduction of instruments</h2>
      <p className="mt-3 text-base text-ink">
        The introduction of instrumental music into Christian worship came gradually and faced
        significant opposition. The organ was first introduced in Western church worship around
        the 7th century, but was not widely accepted until much later.
      </p>
      <p className="mt-3 text-base text-ink">
        Many religious groups during the Restoration Movement of the 19th century sought to
        return to New Testament patterns of worship, which included a return to a cappella singing
        in worship services.
      </p>

      <h2 className="mt-10 font-display text-2xl">Our commitment to biblical worship</h2>
      <p className="mt-3 text-base text-ink">
        At Watkins Road church of Christ, we are committed to following the New Testament pattern
        for worship. Our practice of a cappella singing is not merely a tradition or preference,
        but a deliberate effort to honor God’s instructions for Christian worship.
      </p>
      <p className="mt-3 text-base text-ink">
        We believe that the beauty of congregational singing allows for the mutual edification
        described in Ephesians 5:19 and Colossians 3:16, where we are instructed to speak to and
        teach one another through our songs. Each member participates in this form of worship,
        making melody in their hearts to the Lord.
      </p>
      <p className="mt-3 text-base text-ink">
        While we recognize that instrumental music is pleasing to many, our aim is to please God
        by adhering to the pattern He has established for His church. We invite you to experience
        the simple beauty and spiritual depth of congregational a cappella singing in our{" "}
        <Link to="/events" className="text-pine underline decoration-line underline-offset-2">
          worship services
        </Link>
        .
      </p>
      <h2 className="mt-10 font-display text-2xl">Questions often asked</h2>
      <ul className="mt-4 flex flex-col gap-6">
        {questions.map((item) => (
          <li key={item.q}>
            <h3 className="font-display text-xl text-ink">{item.q}</h3>
            <p className="mt-2 text-base text-ink">{item.a}</p>
          </li>
        ))}
      </ul>

    </article>
  );
}
