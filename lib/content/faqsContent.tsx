import Link from "next/link"
import { DoubleText } from "@components/ui"
import { accounts } from "@components/ui/Social/Social"

export const faqsMain = [
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
          <b>Slices</b> are ERC1155 tokens used to{" "}
          <b>subdivide the ownership of a slicer</b>, which can also be seen as
          the slicer&apos;s royalties. Their total amount is defined when a
          slicer is created and cannot be changed later. Owners can{" "}
          <Link href="/#transfer">
            <a>transfer them like any other ERC1155 token</a>
          </Link>
          , or even sell them on a NFT marketplace like{" "}
          <a
            href="https://opensea.io/collection/slice-so"
            target="_blank"
            rel="noreferrer"
          >
            Opensea
          </a>
          .
        </p>
      </>
    ),
    id: "difference"
  },
  {
    question: "What can slicers be used for?",
    answer: (
      <>
        <p>
          Slicers are ideal to split payments between multiple owners, or to
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
            Create a slicer for your own entity, project or asset – and
            eventually create products to sell
          </li>
          <li>
            Buy slices of a slicer you like or support to earn income from it
          </li>
          <li>
            Buy enough slices of a slicer in order to become a{" "}
            <Link href="/#superowner">
              <a>superowner</a>
            </Link>{" "}
            and be able to do add new products
          </li>
        </ul>
        {/* <p>
          <Link href="/">
            <a>Here are some inspirations</a>
          </Link>
          , but don&apos;t be afraid to experiment.
        </p> */}
      </>
    ),
    id: "usefulness"
  },
  {
    question: "What is a superowner?",
    answer: (
      <>
        <p>
          Anyone holding at least the minimum amount of slices (specified during
          the creation of the slicer) is a superowner.
        </p>
        <p>Superowners have privileged access to a slicer, allowing them to:</p>
        <ul>
          <li>Edit the name, description, image (and other metadata)</li>
          <li>Add new products</li>
        </ul>
        <p>
          It is up to the slicer creator to decide how many can eventually
          become superowners, by setting the <i>minimum slices</i> amount. The
          lower it is, the higher the number of potential superowners.
        </p>
      </>
    ),
    id: "superowner"
  },
  {
    question: "How to release ETH from my slicer?",
    answer: (
      <>
        <p>
          <i>Triggering a release</i> means receiving any ETH due from your
          slicers. You can trigger a release by going to{" "}
          <Link href="/profile">
            <a>Your slicers</a>
          </Link>{" "}
          section and triggering a release with the apposite button.
        </p>
        <p>
          You will also trigger an automatic release whenever you perform a
          slice transfer, which guarantees that you always receive what you own
          no matter what.
        </p>
      </>
    ),
    id: "release"
  },
  {
    question: "How to redeem a product I bought?",
    answer: (
      <>
        <p>
          Once you buy a product, you can <i>redeem a purchase</i> to receive
          the contents of a product.
        </p>
        <p>
          You can redeem a purchase from the{" "}
          <Link href="/purchases">
            <a>Purchases</a>
          </Link>{" "}
          section and clicking on the <b>Redeem</b> button of a specific
          product. Alternatively, you can also do so directly from a slicer page
          by clicking on the blue button with the shopping bag icon.
        </p>
      </>
    ),
    id: "redeem"
  },
  {
    question: "How to transfer or sell slices?",
    answer: (
      <>
        <p>
          Go to{" "}
          <Link href="/profile">
            <a>Your slicers</a>
          </Link>{" "}
          and click on <b>transfer</b> for a specified slicer. From there
          you&apos;ll be able to transfer any amount of slices to an address you
          specify.
        </p>
        <p>
          If you wish to sell your slices, you can use{" "}
          <a
            href="https://opensea.io/collection/slice-so"
            target="_blank"
            rel="noreferrer"
          >
            Opensea
          </a>
          .
        </p>
      </>
    ),
    id: "transfer"
  },
  {
    question: "My slicer doesn't appear in the Explore section",
    answer: (
      <>
        <p>
          Slicers only appear in the explore section after you visit their page
          or see them at least once. To solve this, simply go to{" "}
          <Link href="/profile">
            <a>Your slicers</a>
          </Link>
          . The slicer should now be in the Explore section (if you don&apos;t
          see it refresh the page a couple of times).
        </p>
        <p>
          Note that if you pick the <b>Private</b> tag for a slicer, it will be
          hidden from the Explore section.
        </p>
      </>
    ),
    id: "transfer"
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
        <p>
          Note: You can check the total amount of ETH earned by a slicer on
          Opensea, in the <i>Stats</i> section. Check out an example{" "}
          <a
            href="https://opensea.io/assets/0x0fd0d9aa44a05ee158ddf6f01d7dcf503388781d/0"
            target="_blank"
            rel="noreferrer"
          >
            here
          </a>
        </p>
      </>
    ),
    id: "slicer-earn"
  },
  {
    question: "What are products?",
    answer: (
      <>
        <p>
          Each slicers comes with a <b>decentralized store</b> from where you
          can sell products. All ETH earned end up to the slicer, which can then
          be claimed by its owners.
        </p>
        <p>Products are:</p>
        <ul>
          <li>
            <b>Immutable</b>: their content is saved on the public IPFS network
            using Filecoin, through{" "}
            <a href="https://web3.storage/" target="_blank" rel="noreferrer">
              Web3 Storage
            </a>
            .
          </li>
          <li>
            <b>Encrypted</b>: Only buyers can decrypt them (not even Slice can).
          </li>
        </ul>
        <p>
          Initially products can include{" "}
          <b>instructions, notes and files of any kind</b>. In the future more
          options will become available.
        </p>
      </>
    ),
    id: "products"
  },
  {
    question: "What are sponsorships?",
    answer: (
      <>
        <p>
          Whenever someone sends ETH to a slicer without buying a product, it
          counts as a sponsorship. The 10 top sponsors will appear on the slicer
          page and are able to <b>customize their space by adding a link</b> to
          redirect users that click on their address/ENSname.
        </p>
        <p>
          You can send ETH for a sponsorship through a standard ETH transaction
          to the slicer address, or by using the apposite form in the{" "}
          <i>sponsorships</i> section of its page.
        </p>
        <p>
          Note: Sponsorships may be handled differently in the future and may
          give access to more advantages over time.
        </p>
      </>
    ),
    id: "sponsorships"
  }

  // { id:'nice',question: "Can slicers be upgraded?", answer: "Nice" },
]

export const faqsNfts = [
  // {
  //   question: "Can I use Slice to mint NFTs (collectibles)?",
  //   answer: (
  //     <>
  //       <p>
  //         Yes. You can create a slicer with immutable metadata by{" "}
  //         <Link href="/slice">
  //           <a target="_blank" rel="noreferrer">
  //             creating a new slicer
  //           </a>
  //         </Link>{" "}
  //         and <b>enabling the immutable metadata switch</b>: this makes it
  //         possible to edit its information <b>only once</b> after its creation
  //       </p>
  //       <p>
  //         Note: If you wish to <b>disable fractionalization</b> and simulate the
  //         behaviour of a NFT (ERC721), <b>set the total slices amount to 1</b>{" "}
  //         (the resulting slice will still be an ERC1155 token)
  //       </p>
  //       {/* <p>
  //         Note: Due to how Slice works, slicers&apos; metadata are not stored on
  //         IPFS. If you want your collectibles to be truly immutable, check out{" "}
  //         <Link href="/#nft-existing">
  //           <a>how to use Slice with existing NFTs</a>
  //         </Link>
  //         .
  //       </p> */}
  //     </>
  //   ),
  //   id: "nft-mint"
  // },
  {
    question: "Can I create fractionalized NFTs?",
    answer: (
      <>
        <p>
          Yes. Slices are ERC1155, semi-fungible tokens. By specifying 2 or more
          slices while creating a slicer, you are fractionalizing it.
        </p>
      </>
    ),
    id: "fractionalized"
  },
  {
    question: "Can I use Slice with existing NFTs?",
    answer: (
      <>
        <p>
          Very soon. If you want to get posted on upcoming features, consider{" "}
          <a
            className="text-white highlight"
            href={accounts.discord}
            target="_blank"
            rel="noreferrer"
          >
            hanging out in our Discord
          </a>
          .
        </p>
      </>
    ),
    id: "nft-existing"
  }
]

export const faqsGeneral = [
  {
    question: "What's the point of Slice?",
    answer: (
      <>
        <p>
          Originally, the aim of this project was to conceive a special kind of
          NFTs whose value could be estimated using objective, public data. This
          would allow their use in many real-world applications, where a
          parallel to their actual value is required.
        </p>
        <p>
          With slicers, this objective value is the income they generate. By
          knowing how much ETH a slicer has generated, it is possible to
          establish a base value for its slices.
        </p>
        <p>
          The idea then gradually evolved into its current form, where slicers
          can also act as decentralized stores. Products are what will
          ultimately enable the use of slicers in several different ways.
        </p>
      </>
    ),
    id: "mission"
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
          through sponsorships) it automatically gives a 2.5% protocol fee to
          Slice. This fee is used to improve the services surrounding slicers
          and keep adding new features to the ecosystem.
        </p>
      </>
    ),
    id: "pricing"
  }
  // { id:'nice',question: "Where can I see the smart contract?", answer: "Slice's smart contract are currently private but will become open source in the next weeks. If you're a developer and are interested in contributing to the project, please reach out.' " },
]
