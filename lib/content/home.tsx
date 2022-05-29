import Arrow from "@components/icons/Arrow"
import { DoubleText } from "@components/ui"
import Link from "next/link"

export const section1 = (
  <>
    <h1>
      <DoubleText inactive logoText="Meet the Slicer" size="text-normal" />
    </h1>
    <p>
      A smart contract that{" "}
      <b>distributes any payment it receives to its owners</b>, proportionally
      to their owned{" "}
      <DoubleText logoText="slices 🍰" size="text-normal" inactive />
    </p>
    <p>
      At the same time each slicer is also a{" "}
      <b>decentralized store from where owners can sell anything.</b>
    </p>
    <p>They enable trustless commerce at the blockchain layer.</p>
  </>
)

export const section2 = (
  <>
    <h1>
      <DoubleText inactive logoText="Dynamic splitting" size="text-normal" />
    </h1>
    <p>
      Slices are ERC1155{" "}
      <DoubleText inactive logoText="Semi-Fungible Tokens" size="text-normal" />{" "}
      (fractionalized NFTs) that represent ownership over a slicer and its
      earnings.
    </p>
    <p>
      <b>Owners can transfer/sell slices anytime</b> (also on NFT marketplaces)
      and the slicer will always split payments based on current ownership
      distribution.
    </p>
  </>
)

export const section3 = (
  <>
    <h1>
      <DoubleText inactive logoText="Sell anything on" size="text-normal" />{" "}
      <DoubleText inactive logoText="d-stores" size="text-normal" />
    </h1>
    <p>
      Each Slicer comes with its own{" "}
      <b>decentralized store that can sell anything and accept any currency</b>.
    </p>
    <p>
      Tickets for events, physical items, merch, digital files, professional
      services, NFTs, even interact with other contracts. The best part?{" "}
      <b>It&apos;s all on-chain.</b>
    </p>
    <Link href="/slice">
      <a className="inline-flex items-center group highlight">
        <span>Start selling now</span>
        <div className="w-5 h-5 ml-1 transition-transform duration-150 group-hover:translate-x-1">
          <Arrow />
        </div>
      </a>
    </Link>
  </>
)

export const section4 = (
  <>
    <h1>
      Hold slices, <DoubleText inactive logoText="earn Ξ" size="text-normal" />
    </h1>
    <p>
      Payments are split by slicers transparently, which makes slices{" "}
      <b>the first tradable tokens with an objective value</b>.
    </p>
    <p>
      This opens up to many exciting use cases, with slicers acting as an{" "}
      <b>independent, decentralized payments infrastructure</b> and counterpart
      to real-world applications.
    </p>
  </>
)
