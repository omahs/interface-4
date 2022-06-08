import Link from "next/link"

export const faqsMain = [
  {
    question: "What's the difference between slicers and slices",
    answer: (
      <>
        <p>
          <b>Slicers</b> are:
          <ol>
            <li>
              Smart contracts which split any payment they receive to their
              owners
            </li>
            <li>
              Decentralized stores (d-stores) from which it&apos;s possible to
              sell anything, directly on-chain.
            </li>
          </ol>
        </p>
        <p>
          <b>Slices</b> are ERC1155 tokens which represent{" "}
          <b>the ownership over a slicer</b>. By owning 10% of the slices of a
          slicer, you get 10% of ownership of the slicer and its earnings.
        </p>
      </>
    ),
    id: "difference"
  },
  {
    question: "What can slicers be used for",
    answer: (
      <>
        <p>
          Slicers can be used to split payments dynamically between multiple
          owners, or to sell anything in a decentralized manner.
        </p>
        <p>Generally you may want to either:</p>
        <ul>
          <li>
            Create a slicer for your own entity, project or asset – and
            eventually create products to sell
          </li>
          <li>Buy slices of a slicer you like or support</li>
          <li>
            Buy enough slices of a slicer in order to become a{" "}
            <Link href="/#superowner">
              <a>superowner</a>
            </Link>{" "}
            to do add new products
          </li>
        </ul>
      </>
    ),
    id: "usefulness"
  },
  {
    question: "What is a superowner",
    answer: (
      <>
        <p>
          Anyone holding at least the amount of superowner slices (specified
          during the creation of the slicer).
        </p>
        <p>Superowners have privileged access to a slicer, allowing them to:</p>
        <ul>
          <li>
            Edit the name, description, image and other metadata that defines
            how the slicer appears online
          </li>
          <li>Add new products on the d-store</li>
        </ul>
        <p>
          It is up to the slicer creator to decide how many can eventually
          become superowners, by setting the <i>superowner slices</i> amount.
          The lower it is, the higher the number of potential superowners.
        </p>
      </>
    ),
    id: "superowner"
  },
  {
    question: "What can be sold from slicers",
    answer: (
      <>
        <p className="font-bold">Anything.</p>
        <p>
          With Slice products everything is efficiently stored on the blockchain
          (price, purchases, available units, etc). This enables{" "}
          <b>on-chain inventory management</b>.
        </p>
        <p>
          Purchases are linked to the buyers&apos; addresses, while sellers can
          track purchases by interacting with our{" "}
          <a
            href="https://thegraph.com/explorer/subgraph?id=3Q6UgaBfLwnTtaXtWMpzaXv4PmbfrP8L9N64dmXeo2gb&view=Overview"
            target="_blank"
            rel="noreferrer"
          >
            subgraph
          </a>{" "}
          or directly with the Slice contracts.
        </p>
        <p>
          By changing a few parameters, you can sell any physical or digital
          item. Let&apos;s look at some examples:
        </p>
        <ul>
          <li>
            <b>Event Tickets:</b> The ticket is the product itself. Upon
            entering the venue someone checks the purchase against the address
            provided (interacting with the subgraph) and validates it.
          </li>
          <li>
            <b>Digital services, subscriptions, apps:</b> In this case it&apos;s
            the service provider that validates the purchase before providing
            the service. This could happen automatically or manually.
          </li>
          <li>
            <b>Physical items:</b> In order for the seller to handle
            fulfillment, a link should be added in the instructions to redeem
            the product (only visible to buyers). After collecting required
            info, the items can be delivered.
          </li>
          <li>
            <b>NFTs:</b> It is possible to execute <b>any on-chain logic</b>{" "}
            during product purchase (requires setting up a custom smart
            contract). You could use it to mint an NFT, use merkle proof
            verification for allowlists, or interact with other protocols.
          </li>
          <li>
            <b>A combination of the above:</b> The limit is truly your
            imagination.
          </li>
        </ul>
        <p>
          You can get a feeling of how products look by checking out{" "}
          <a href="/slicer/1" target="_blank" rel="noreferrer">
            this slicer
          </a>
          .
        </p>
      </>
    ),
    id: "sold"
  },
  {
    question: "How to redeem a product I bought",
    answer: (
      <>
        <p>
          Once you buy a product, you can <i>redeem a purchase</i> to receive
          the contents of a product or see any additional instruction.
        </p>
        <p>
          You can redeem a purchase from{" "}
          <Link href="/purchases">
            <a>Your purchases</a>
          </Link>{" "}
          and clicking on the <b>Redeem</b> button of a specific product.
          Alternatively, you can also do so directly from a slicer page by
          clicking on the blue button with the shopping bag icon.
        </p>
      </>
    ),
    id: "redeem"
  },
  {
    question: "How to release ETH from my slicer",
    answer: (
      <>
        <p>
          <i>Triggering a release</i> means receiving any ETH due from your
          slicers. You can trigger a release by going to{" "}
          <Link href="/profile">
            <a>Your slicers</a>
          </Link>{" "}
          and triggering a release with the apposite button.
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
    question: "How to transfer or sell slices",
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
          see it refresh the page or wait some seconds).
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
    question: "How do slicers earn money",
    answer: (
      <>
        <p>There are two main ways for a slicer to earn ETH or other tokens:</p>
        <ul>
          <li>Direct payments</li>
          <li>Selling products on d-stores</li>
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
    question: "What are products",
    answer: (
      <>
        <p>
          Each slicers comes with a <b>decentralized store</b> from where you
          can sell anything. All payments end up to the slicer by default, which
          are then split among its owners.
        </p>
        <p>
          First of all, products are not NFTs themselves. They are a new
          primitive that is used to handle on-chain inventory and store
          non-transferable purchases.
        </p>
        <p>
          Products can be used to represent anything — tickets, physical items,
          files, services, NFTs or a combination of those — it&apos;s the seller
          that decides what each product is related to.
        </p>
      </>
    ),
    id: "products"
  },
  {
    question: "How are texts and files encrypted in products",
    answer: (
      <>
        <p>
          Sellers have the option to give private texts and files to buyers.
          Their content is automatically encrypted and saved immutably on IPFS
          using Filecoin (via{" "}
          <a href="https://web3.storage/" target="_blank" rel="noreferrer">
            Web3 Storage
          </a>
          ).
        </p>
        <p>
          The data can only be decrypted via Slice by redeeming the product,
          using a symmetric key generated only to those who have purchased it.
        </p>
      </>
    ),
    id: "encryption"
  },
  {
    id: "metadata",
    question: "What's in the slicer metadata",
    answer: (
      <>
        <p>
          The slicer metadata are the name, description, image, tags and all
          other info related to it.
        </p>
        <p>
          To customize them create a slicer first, then go to its page and click
          on the pencil near its title (you need to be a superowner to see it).
          From there you&apos;ll be able to change all information related to
          it, influencing how it appears online and on nft marketplaces.
        </p>
        <p>
          Note that slicer metadata is stored on Slice servers, not on IPFS.
          This is because some of the data displayed on nft marketplaces is
          dynamic (ie ETH received by slicer), and also because slicers
          generally serve a different purpose than typical NFTs.
        </p>
      </>
    )
  },
  {
    question: "What are sponsorships",
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
          Note: Sponsorships are an experimental part of Slice and may be
          handled differently in the future.
        </p>
      </>
    ),
    id: "sponsorships"
  },
  {
    question: "How to redeem physical items or tickets from product purchases",
    answer: (
      <>
        <p>
          Tickets (and purchases in general) are linked to the buyer’s address
          and are not transferable. Anyone can always verify if an address has
          purchased a product by interacting with Slice subgraph or contracts.
        </p>
        <p>
          Redeeming physical items generally requires{" "}
          <b>verifying ownership of the buyer&apos;s address</b> by following
          instructions provided by the seller. You can find them by redeeming
          the related product in{" "}
          <Link href="/purchases">
            <a className="highlight">Your purchases</a>
          </Link>
          .
        </p>
        <p>
          This step tipically requires to sign a message to verify wallet
          ownership either upon entering the venue or anytime earlier on a third
          party website, such as the seller&apos;s.
        </p>
      </>
    ),
    id: "redeem"
  },
  {
    question: "How much does Slice cost",
    answer: (
      <>
        <p>
          The Slice protocol is <b>free to use</b>, users only have to pay the
          transaction fees to interact with the blockchain. This website is just
          an interface to the Slice&apos;s smart contracts.
        </p>
        <p>
          Whenever a slicer owner withdraws earnings from slicers, a{" "}
          <b>2.5% membership fee</b> is given to the Slice DAO which helps
          funding the development and maintainment of the protocol. In exchange,{" "}
          <b>you receive a corresponding amount of SLX governance tokens</b>{" "}
          which effectively represent your stake of ownership in the DAO and
          your right to vote on future protocol developments.
        </p>
        <p>
          In the future, this will result in Slice being{" "}
          <b>owned and governed by its own users</b>.
        </p>
      </>
    ),
    id: "pricing"
  }

  // { id:'nice',question: "Can slicers be upgraded", answer: "Nice" },
]

// export const faqsNfts = [
// {
//   question: "Can I use Slice to mint NFTs (collectibles)",
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
//   {
//     question: "Can I create fractionalized NFTs",
//     answer: (
//       <>
//         <p>
//           Yes. Slices are ERC1155, semi-fungible tokens. By specifying 2 or more
//           slices while creating a slicer, you are fractionalizing it.
//         </p>
//       </>
//     ),
//     id: "fractionalized"
//   },
//   {
//     question: "Can I use Slice with existing NFTs",
//     answer: (
//       <>
//         <p>
//           Very soon. If you want to get posted on upcoming features, consider{" "}
//           <a
//             className="text-white highlight"
//             href={accounts.discord}
//             target="_blank"
//             rel="noreferrer"
//           >
//             hanging out in our Discord
//           </a>
//           .
//         </p>
//       </>
//     ),
//     id: "nft-existing"
//   }
// ]

// export const faqsGeneral = [
//   {
//     question: "What's the point of Slice",
//     answer: (
//       <>
//         <p>
//           Originally, the aim of this project was to conceive a special kind of
//           NFTs whose value could be estimated using objective, public data. This
//           would allow their use in many real-world applications, where a
//           parallel to their actual value is required.
//         </p>
//         <p>
//           With slicers, this objective value is the income they generate. By
//           knowing how much ETH a slicer has generated, it is possible to
//           establish a base value for its slices.
//         </p>
//         <p>
//           The idea then gradually evolved into its current form, where slicers
//           can also act as decentralized stores. Products are what will
//           ultimately enable the use of slicers in several different ways.
//         </p>
//       </>
//     ),
//     id: "mission"
//   }
//   // { id:'nice',question: "Where can I see the smart contract", answer: "Slice's smart contract are currently private but will become open source in the next weeks. If you're a developer and are interested in contributing to the project, please reach out.' " },
// ]
