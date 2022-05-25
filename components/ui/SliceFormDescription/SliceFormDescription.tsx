import DoubleText from "../DoubleText"
import FAQsItem from "../FAQsItem"

const SliceFormDescription = () => {
  return (
    <>
      <div className="py-6 mx-auto space-y-4 sm:px-6 max-w-screen-xs md:text-left">
        <div className="pb-4 prose">
          <p>
            <b>
              Slicers can be used as a decentralized store and/or to split
              payments dynamically to its owners.
            </b>
          </p>
          <p>
            Ownership over a slicer is based on{" "}
            <DoubleText inactive logoText="Slices 🍰" size="text-normal" />,
            ERC1155 tokens that can be traded on any nft marketplace.{" "}
            <b>
              The more slices you hold, the more slicer earnings you receive.
            </b>
          </p>
          <p>It all starts by creating a slicer.</p>
        </div>
        <ul className="prose">
          <FAQsItem
            id="store"
            question="How to set up a d-store"
            answer={
              <>
                <p>
                  The slicer itself will be the decentralized store, so first of
                  all you need to create one.
                </p>
                <p>
                  Then on your slicer page you&apos;ll find a button that says{" "}
                  <b>Add product</b>. That&apos;s where you can set up your
                  product on sale, and once the process is completed it will
                  appear on your slicer page among its products.
                </p>
                <p className="font-bold">
                  <span className="text-yellow-600">Note:</span> Only
                  superowners can put products on sale, so if you plan to sell
                  make sure to have enough slices to be one (see superowner
                  slices).
                </p>
              </>
            }
          />
          <FAQsItem
            id="products"
            question="What can be sold from slicers"
            answer={
              <>
                <p className="font-bold">Anything.</p>
                <p>
                  With Slice products everything is efficiently stored on the
                  blockchain (price, purchases, available units, etc). This
                  enables <b>on-chain inventory management</b>.
                </p>
                <p>
                  Purchases are linked to the buyers&apos; addresses, while
                  sellers can track purchases by interacting with our{" "}
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
                  By changing a few parameters, you can sell any physical or
                  digital item. Let&apos;s look at some examples:
                </p>
                <ul>
                  <li>
                    <b>Event Tickets:</b> The ticket is the product itself. Upon
                    entering the venue someone checks the purchase against the
                    address provided (interacting with the subgraph) and
                    validates it.
                  </li>
                  <li>
                    <b>Digital services, subscriptions, apps:</b> In this case
                    it&apos;s the service provider that validates the purchase
                    before providing the service. This could happen
                    automatically or manually.
                  </li>
                  <li>
                    <b>Physical items:</b> In order for the seller to handle
                    fulfillment, a link should be added in the instructions to
                    redeem the product (only visible to buyers). After
                    collecting required info, the items can be delivered.
                  </li>
                  <li>
                    <b>NFTs:</b> It is possible to execute{" "}
                    <b>any on-chain logic</b> during product purchase (requires
                    setting up a custom smart contract). You could use it to
                    mint an NFT, use merkle proof verification for allowlists,
                    or interact with other protocols.
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
            }
          />
          <FAQsItem
            id="single"
            question="Creating a slicer for one person"
            answer={
              <>
                <p>
                  Slicers are collaborative tools but you can also create a
                  slicer just for yourself, or someone else. There are some
                  cases where it might be useful to do so:
                </p>
                <ul>
                  <li>
                    You may want to sell products from a d-store without sharing
                    ownership with others.
                  </li>
                  <li>
                    You may not know the other owners in advance, so you could
                    mint the slices to yourself and transfer them later.
                  </li>
                </ul>
              </>
            }
          />
          <FAQsItem
            id="total"
            question="How to decide number of slices"
            answer={
              <>
                <p>
                  The total number of slices defines the{" "}
                  <b>minimum subdivisible unit of ownership</b>. If a slicer has
                  100 slices, each slice entitles to 1% ownership. If it&apos;s
                  1M slices, each slice gives 0,0001%.
                </p>
                <p>
                  There is no right or wrong amount, the only effect is to
                  increase/decrease partial ownership that slicer owners may
                  trade in the open market (nft marketplaces).
                </p>
              </>
            }
          />
          <FAQsItem
            id="dynamic"
            question="What is dynamic payment splitting"
            answer={
              <>
                <p>
                  One of the distinctive characteristics of the Slice protocol
                  is that <b>slices are freely tradable</b>.
                </p>
                <p>
                  Dynamic payments splitting means that{" "}
                  <b>
                    the slicer splits any payment received based on its current
                    owners
                  </b>
                  .
                </p>
                <p>
                  Let&apos;s say you own 20 out of 100 slices of a certain
                  slicer, granting you 20% over its earnings. If you
                  transferred/sold 5 slices, from that moment on you&apos;d get
                  15% of any payment to the slicer. At the same time the new
                  owner would receive the remaining 5%.
                </p>
              </>
            }
          />
          <FAQsItem
            id="metadata"
            question="What are the slicer metadata"
            answer={
              <>
                <p>
                  The slicer metadata are the name, description, image, tags and
                  all other info related to it.
                </p>
                <p>
                  To customize them create a slicer first, then go to its page
                  and click on the pencil near its title (you need to be a
                  superowner to see it). From there you&apos;ll be able to
                  change all information related to it, influencing how it
                  appears online and on nft marketplaces.
                </p>
                <p>
                  Note that slicer metadata is stored on Slice servers, not on
                  IPFS. This is because some of the data displayed on nft
                  marketplaces is dynamic (ie ETH received by slicer), and also
                  because slicers generally serve a different purpose than
                  typical NFTs.
                </p>
              </>
            }
          />
        </ul>
        <div className="text-right">
          <a
            className="text-sm opacity-80 highlight hover:opacity-100"
            href="/#faq"
            target="_blank"
            rel="noreferrer"
          >
            See full FAQs
          </a>
        </div>
      </div>
    </>
  )
}

export default SliceFormDescription
