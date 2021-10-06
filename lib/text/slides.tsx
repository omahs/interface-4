const slides = [
  {
    title: "NFTs (Collectibles)",
    image: "",
    contentSlicer: (
      <p>
        The slicer <b>represents one or more collectible assets</b>, by owning
        them or being itself a collectible.
      </p>
    ),
    contentSlice: (
      <p>
        Represent the <b>ownership</b> over those assets.
      </p>
    ),
    contentProduct: (
      <p>
        Sells <b>any file or merchandise</b> related to the collectibles.
      </p>
    ),
  },
  {
    title: "Music artists",
    image: "",
    contentSlicer: (
      <p>
        Related to a <b>song, album or project</b>. Owned by the band or group
        of people that made it.
      </p>
    ),
    contentSlice: (
      <p>
        Represent <b>royalties</b>.
      </p>
    ),
    contentProduct: (
      <p>
        Sells <b>audio files</b> (songs or albums), <b>concert tickets</b> and
        merchandise.
      </p>
    ),
  },
  {
    title: "Games",
    image: "",
    contentSlicer: (
      <p>
        Related to the <b>games and the universe surrounding them</b>.
      </p>
    ),
    contentSlice: <p>Represent ownership over the games.</p>,
    contentProduct: (
      <p>
        Sells <b>games and add-ons</b> as files or coupons, as well as
        merchandise.
      </p>
    ),
  },
  {
    title: "Writers",
    image: "",
    contentSlicer: (
      <p>
        Related to a <b>book, series or project</b>.
      </p>
    ),
    contentSlice: <p>Represent ownership over the content.</p>,
    contentProduct: (
      <p>
        Sells <b>ebooks, PDF files or access to exclusive content</b>.
      </p>
    ),
  },
  {
    title: "Files",
    image: "",
    contentSlicer: (
      <p>
        Used as a plain <b>profit-sharing mechanism</b>.
      </p>
    ),
    contentSlice: (
      <p>
        Represent the <b>right to redeem part of the profits</b>.
      </p>
    ),
    contentProduct: (
      <p>
        <b>Digital files of any kind</b>.
      </p>
    ),
  },
  {
    title: "Startups",
    image: "",
    contentSlicer: (
      <p>
        Represents <b>company structure</b>, collects and{" "}
        <b>distributes profits</b>.
      </p>
    ),
    contentSlice: (
      <p>
        Analogous to <b>equity shares</b>. Can be sold to investors to{" "}
        <b>raise capital</b> or as a <b>crowdfunding mechanism</b>.
      </p>
    ),
    contentProduct: (
      <p>
        Sells <b>the startup products</b> and can be integrated via Slice API
        (coming soon).
      </p>
    ),
    isFuture: true,
  },
  {
    title: "Merchandise",
    image: "",
    contentSlicer: <p>Related to an entity, project, collectible or meme.</p>,
    contentSlice: (
      <p>
        Represent the <b>right to redeem part of the profits</b>.
      </p>
    ),
    contentProduct: (
      <p>
        Sells <b>digital and physical objects</b>, by relying on Slice API.
      </p>
    ),
    isFuture: true,
  },
  {
    title: "Projects",
    image: "",
    contentSlicer: <p>...</p>,
    contentSlice: <p>...</p>,
    contentProduct: (
      <p>
        Sells <b></b>.
      </p>
    ),
  },
]

export default slides
