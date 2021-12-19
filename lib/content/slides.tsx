import CarouselFiles from "@components/icons/CarouselFiles"
import CarouselGames from "@components/icons/CarouselGames"
import CarouselMerchandise from "@components/icons/CarouselMerchandise"
import CarouselMusic from "@components/icons/CarouselMusic"
import CarouselPayments from "@components/icons/CarouselPayments"
import CarouselStartups from "@components/icons/CarouselStartups"
import CarouselWriters from "@components/icons/CarouselWriters"
import punk6721 from "public/punk6721.png"

const slides = [
  {
    title: "NFTs (Collectibles)",
    imageSrc: punk6721,
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
    isNFT: true,
  },
  {
    title: "Music artists",
    imageContent: (color: string) => CarouselMusic(color),
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
    imageContent: (color: string) => CarouselGames(color),
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
    imageContent: (color: string) => CarouselWriters(color),
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
    imageContent: (color: string) => CarouselFiles(color),
    contentSlicer: (
      <p>
        Used to <b>split payments between owners</b>.
      </p>
    ),
    contentSlice: (
      <p>
        Represent the <b>right to redeem any due ETH</b>.
      </p>
    ),
    contentProduct: (
      <p>
        <b>Digital files of any kind</b>.
      </p>
    ),
  },
  {
    title: "Payments",
    imageContent: (color: string) => CarouselPayments(color),
    contentSlicer: (
      <p>
        Related to a <b>specific project or team</b> and used to{" "}
        <b>split payments between owners</b>.
      </p>
    ),
    contentSlice: (
      <p>
        Represent the <b>right to redeem any due ETH</b>.
      </p>
    ),
    contentProduct: (
      <p>
        Payments can be <b>received directly</b> or by selling{" "}
        <b>products, services or files</b> through the store.
      </p>
    ),
  },
  {
    title: "Startup & DAO",
    imageContent: (color: string) => CarouselStartups(color),
    contentSlicer: (
      <p>
        Represents <b>company/DAO structure</b>, collects and{" "}
        <b>split payments</b>.
      </p>
    ),
    contentSlice: (
      <p>
        Can be given to individuals / community members to involve them in the
        project.
      </p>
    ),
    contentProduct: (
      <p>
        Sells <b>the startup products and services</b>, integrated via Slice API
        (coming soon).
      </p>
    ),
    isFuture: true,
  },
  {
    title: "Merchandise",
    imageContent: (color: string) => CarouselMerchandise(color),
    contentSlicer: <p>Related to an entity, project, collectible or meme.</p>,
    contentSlice: (
      <p>
        Represent the <b>right to redeem any due ETH</b>.
      </p>
    ),
    contentProduct: (
      <p>
        Sells <b>digital and physical objects</b>, by relying on Slice API.
      </p>
    ),
    isFuture: true,
  },
]

export default slides
