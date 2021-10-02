import Link from "next/link"
import { DoubleText } from "@components/ui"

export const faqsGeneral = [
  {
    question: "What's the difference between slicers and slices?",
    answer: (
      <>
        <p>
          <b>
            Slicers are smart contracts which represent a specific entity,
            project or asset
          </b>{" "}
          (anything really). They are made up of one or more slices, and their
          main purpose is to <b>split any ETH they receive</b> to the owner of
          those slices.
        </p>
        <p>
          <b>Slices</b> are digital tokens (ERC1155) used to{" "}
          <b>subdivide the ownership of a slicer</b>. Their total amount is
          defined when a slicer is created and cannot be changed later. Owners
          can{" "}
          <Link href="/#transfer">
            <a>transfer them like any other ERC1155 token</a>
          </Link>
          , or even sell them on opensea.
        </p>
      </>
    ),
    id: "difference",
  },
  {
    question: "What can slicers be used for?",
    answer: (
      <>
        <p>
          Slicers are ideal to split an income between multiple owners, or to
          represent anything that needs to have an objective value. Each slicer
          also comes with a{" "}
          <Link href="/#products">
            <a>decentralized product store</a>
          </Link>{" "}
          that opens up limitless possibilities.
        </p>
        <p>Generally you may want to either:</p>
        <ul>
          <li>
            Create a slicer for your own entity, project or asset, and
            eventually create products to sell
          </li>
          <li>
            Buy slices of a slicer you like or support and earn income from it
          </li>
          <li>
            Buy enough slices of a project in order to become a{" "}
            <Link href="/#superowner">
              <a>superowner</a>
            </Link>{" "}
            and be able to do things like adding new products
          </li>
          <li>
            Transfer some of your slices to investors in your project, or sell
            them to allow others to earn income from your slicer
          </li>
        </ul>
        <p>
          <Link href="/">
            <a>Here are some inspirations</a>
          </Link>
          , but don&apos;t be afraid to experiment.
        </p>
      </>
    ),
    id: "usefulness",
  },
  {
    question: "What is a superowner?",
    answer: "Superowners have a",
    id: "superowner",
  },
  {
    question: "How to release ETH from my slicer?",
    answer: "Nice",
    id: "nice",
  },
  { question: "How to redeem a product I bought?", answer: "Nice", id: "nice" },
  {
    question: "How to transfer or sell slices?",
    answer: "Nice",
    id: "transfer",
  },
  {
    question: "How do slicers make ETH?",
    answer: (
      <>
        <p>There are two main ways for a slicer to earn ETH:</p>
        <ul>
          <li>Selling products</li>
          <li>Sponsorships (direct payments)</li>
        </ul>
        {/* todo: finish */}
        <p>
          Note: You can check the amount of ETH earned by a slicer on opensea,
          in the apposite properties section
        </p>
      </>
    ),
    id: "slicer-earn",
  },
  { question: "What are products?", answer: "Nice", id: "nice" },
  { question: "How are product files encrypted?", answer: "Nice", id: "nice" },
  { question: "What are sponsorships?", answer: "Nice", id: "nice" },

  // { id:'nice',question: "Can slicers be upgraded?", answer: "Nice" },
]

export const faqsNfts = [
  { question: "Can I use Slice to mint NFTs?", answer: "Nice", id: "nice" },
  { question: "Can I create fractional NFTs?", answer: "Nice", id: "nice" },
  {
    question: "Can I use Slice with existing NFTs?",
    answer: "Nice",
    id: "nice",
  },
]

export const faqsOther = [
  {
    question: "What's the point of Slice?",
    answer: (
      <>
        <p>
          Originally, the objective of this project was to conceive a special
          kind of NFTs whose value could be estimated using objective, public
          data. In fact, while NFTs most cases NFT value is defined by market
          value or
        </p>
        <p>
          With slicers, this objective value is the income they generate. have
          an objective income, so each slice can
        </p>
        <p>This is slowly evolving to</p>
      </>
    ),
    id: "nice",
  },
  {
    question: "How much does it cost?",
    answer: (
      <>
        <p>
          Slice is and will remain entirely <b>free to use</b>, you only have to
          pay the blockchain transaction fee to interact with slicers. This
          website is essentially a way to interact with Slice&apos;s smart
          contracts.
        </p>
        <p>
          Whenever a slicer receives a payment (either selling a product or
          directly receiving ETH) it automatically gives a 2.5% protocol fee to
          Slice. This fee is used to improve the services surrounding slicers
          and keep adding new features to the ecosystem.
        </p>
      </>
    ),
    id: "nice",
  },
  // { id:'nice',question: "Where can I see the smart contract?", answer: "Slice's smart contract are currently private but will become open source in the next weeks. If you're a developer and are interested in contributing to the project, please reach out.' " },
  {
    question: "What are SLCs and what's their purpose?",
    answer: "Nice",
    id: "nice",
  },
]

// Todo: Check all links on finish
