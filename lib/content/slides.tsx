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
    title: "NFTs",
    imageSrc: punk6721,
    contentSlicer: (
      <p>
        Represents the <b>NFT project and its ecosystem</b>, initially owned by
        its creators.
      </p>
    ),
    contentStore: (
      <>
        <li>Handle NFT mints, free claims and allowlists</li>
        <li>
          Sell or token-gate tickets to events, merch or anything related to the
          project
        </li>
        <li>Accept payments in ETH or ERC20 (including your own)</li>
      </>
    ),
    contentExamples: (
      <li>
        <a href="https://slice.so/slicer/1" target="_blank" rel="noreferrer">
          Slice Genesis slicer
        </a>
      </li>
    ),
    isNFT: true
  },
  {
    title: "Music",
    imageContent: (color: string) => CarouselMusic(color),
    contentSlicer: (
      <p>
        Related to a <b>song, album or music NFT project</b>, initally owned by
        those involved in its production and eventually shared with fans and
        community members.
      </p>
    ),
    contentStore: (
      <>
        <li>Handle NFT mints, free claims and allowlists</li>
        <li>
          Sell songs, albums, concert tickets, merch or anything related to the
          project
        </li>
        <li>Accept payments in ETH or ERC20 (including your own)</li>
      </>
    ),
    contentExamples: (
      <li>
        <a
          href="https://slicedao.notion.site/Songwriters-collaboration-Slicer-example-47d6e642113c498ea381c37fb81cbba1"
          target="_blank"
          rel="noreferrer"
        >
          Songwriters collaboration
        </a>
      </li>
    )
  },
  {
    title: "Games",
    imageContent: (color: string) => CarouselGames(color),
    contentSlicer: (
      <p>
        Related to a <b>game and the universe surrounding it</b>, initially
        owned by its creators.
      </p>
    ),
    contentStore: (
      <>
        <li>Sell game either as a one-time purchase or monthly subscription</li>
        <li>
          Sell add-ons, skins, exclusive content, merch and NFTs related to the
          game
        </li>
        <li>
          Allow anyone to create custom skins to be used in-game, while taking a
          fee out of each purchase
        </li>
        <li>Accept payments in ETH or ERC20 (including your own)</li>
      </>
    )
  },
  {
    title: "Writers",
    imageContent: (color: string) => CarouselWriters(color),
    contentSlicer: (
      <p>
        Related to a <b>book, series or project</b>, initially owned by the
        author.
      </p>
    ),
    contentStore: (
      <>
        <li>
          Sell books, ebooks or articles either as one-time purchases or monthly
          subscription
        </li>
        <li>Give access to exclusive content related to the project</li>
        <li>Accept payments in ETH or ERC20 (including your own)</li>
      </>
    ),
    contentExamples: (
      <li>
        <a
          href="https://slicedao.notion.site/Authors-collaborating-on-books-Slicer-example-27e735a8f44c487c9c6469e222fb8c14"
          target="_blank"
          rel="noreferrer"
        >
          Authors collaborating on a book
        </a>
      </li>
    )
  },
  {
    title: "Events",
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
    contentStore: (
      <p>
        <b>Digital files of any kind</b>.
      </p>
    )
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
    contentStore: (
      <p>
        Payments can be <b>received directly</b> or by selling{" "}
        <b>products, services or files</b> through the store.
      </p>
    )
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
    contentStore: (
      <p>
        Sells <b>the startup products and services</b>.
      </p>
    )
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
    contentStore: (
      <p>
        Sells <b>digital and physical objects</b>.
      </p>
    )
  }
]

export default slides
