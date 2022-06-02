import CarouselFiles from "@components/icons/CarouselFiles"
import CarouselEvents from "@components/icons/CarouselEvents"
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
          href="https://slicedao.notion.site/Music-project-IRL-NFT-Slicer-example-c5548f68f7e44783bf5a9624d6bf6858"
          target="_blank"
          rel="noreferrer"
        >
          Music project (IRL + NFT)
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
    ),
    contentExamples: (
      <li>
        <a
          href="https://slicedao.notion.site/Game-project-with-NFTs-Slicer-example-701d7d67130645f58285fae12132e754"
          target="_blank"
          rel="noreferrer"
        >
          Game project with NFTs
        </a>
      </li>
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
          Sell books on-chain and split ownership between authors
        </a>
      </li>
    )
  },
  {
    title: "Events",
    imageContent: (color: string) => CarouselEvents(color),
    contentSlicer: (
      <p>
        Related to an <b>IRL event like a conference, party or concert</b>,
        initially owned by the organizers.
      </p>
    ),
    contentStore: (
      <>
        <li>
          Sell tiered tickets, pass to special events, merch, food and drinks to
          be consumed at the venue
        </li>
        <li>
          Manage entrance by interacting with the Slice subgraph or contracts
        </li>
        <li>Accept payments in ETH or ERC20 (including your own)</li>
      </>
    )
  },
  {
    title: "Merchandise",
    imageContent: (color: string) => CarouselMerchandise(color),
    contentSlicer: (
      <p>
        Related to a <b>project that sells physical items on the d-store</b>,
        initially owned by the store manager.
      </p>
    ),
    contentStore: (
      <>
        <li>Sell t-shirts, hoodies and other physical items on the d-store</li>
        <li>
          Couple sales with complimentary NFTs that can be automatically minted
          to the buyer
        </li>
        <li>Collect delivery info and handle order fulfilment in any way</li>
        <li>Accept payments in ETH or ERC20 (including your own)</li>
      </>
    )
  },
  {
    title: "Services",
    imageContent: (color: string) => CarouselPayments(color),
    contentSlicer: (
      <p>
        Related to <b>professional services offered by a group of people</b>,
        mainly used to split payments between owners.
      </p>
    ),
    contentStore: (
      <>
        <li>
          Sell access to digital applications or service packages on the d-store
        </li>
        <li>Payments for custom services can be sent directly to the slicer</li>
        <li>Accept payments in ETH or ERC20 (including your own)</li>
      </>
    )
  },
  {
    title: "Startups & DAOs",
    imageContent: (color: string) => CarouselStartups(color),
    contentSlicer: (
      <p>
        Represents <b>company/DAO that offers services or products</b>,
        initially owned by project treasury.
      </p>
    ),
    contentStore: (
      <>
        <li>Use slices to handle payout distribution</li>
        <li>Sell digital products and services on the d-store.</li>
        <li>Accept payments in ETH or ERC20 (including your own)</li>
      </>
    )
  }
]

export default slides
