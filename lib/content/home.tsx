import { DoubleText } from "@components/ui"

export const section1 = (
  <>
    <h1 className="!mb-2">
      Meet the <DoubleText inactive logoText="Slicer" size="text-normal" />
    </h1>
    <p>
      A smart contract designed to <b>distribute any payment it receives</b> to
      its owners, proportionally to their owned{" "}
      <DoubleText logoText="slices 🍰" size="text-normal" inactive />
    </p>
    <p>
      The cool thing about slicers is they can be used to represent any entity
      or project. They collect payments and split them among all their owners.
    </p>
  </>
)

export const section2 = (
  <>
    <h1 className="!mb-2">
      <DoubleText inactive logoText="Split ownership 🍰" size="text-normal" />
    </h1>
    <p>
      {" "}
      Slices are{" "}
      <DoubleText
        inactive
        logoText="Semi-Fungible Tokens"
        size="text-normal"
      />{" "}
      (fractionalized NFTs) that represent ownership of a slicer, including the
      right to redeem any amount due. Think of them as the royalties of a
      slicer.
    </p>
    <p>
      They&apos;re ERC1155 tokens so you&apos;re free to transfer or sell them
      on NFT marketplaces, and the slicer will always give you what you earned.
    </p>
  </>
)

export const section3 = (
  <>
    <h1 className="!mb-2">
      <DoubleText inactive logoText="Decentralized" size="text-normal" /> stores
    </h1>
    <p>
      Slicers are also{" "}
      <b>decentralized product stores that can sell anything</b>.
    </p>
    <p>
      Track inventory, give buyers access to files, and even execute on-chain
      transactions during purchases. <b>Experience the future of commerce.</b>
    </p>
  </>
)

export const section4 = (
  <>
    <h1 className="!mb-2">
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
