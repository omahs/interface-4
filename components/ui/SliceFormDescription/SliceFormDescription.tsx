import DoubleText from "../DoubleText"
import FAQsItem from "../FAQsItem"

const SliceFormDescription = () => {
  return (
    <>
      <div className="py-6 mx-auto space-y-4 sm:px-6 max-w-screen-xs md:text-left">
        <div className="prose">
          <p>
            <b>Slicers split any payment received to their owners</b>{" "}
            proportionally to number of slices held.
          </p>
          <p>
            They can earn by either{" "}
            <b>selling products on their own decentralized store</b> or by
            directly receiving payments.
          </p>
          <p>
            Slices 🍰 are{" "}
            <DoubleText
              inactive
              logoText="tradable, fractionalized NFTs"
              size="text-normal"
            />{" "}
            (ERC1155 tokens) that represent ownership over a slicer and its
            earnings.
          </p>
        </div>
        <ul className="prose">
          <FAQsItem
            id="single"
            anchor="single"
            question="Creating a slicer for myself"
            answer={
              <>
                <p>
                  You can also create a slicer just for yourself, or someone
                  else.
                </p>
                <ul>
                  <li>
                    For example, you could sell stuff from a d-store without
                    sharing ownership with others.
                  </li>
                  <li>
                    Or you may not know all the owners in advance, so you could
                    create the slicer first and transfer slices later.
                  </li>
                </ul>
              </>
            }
          />
          <FAQsItem
            id="info"
            anchor="info"
            question="What are slicer metadata"
            answer={
              <>
                <p>
                  You can also create a slicer just for yourself, or someone
                  else.
                </p>
                <ul>
                  <li>
                    For example, you could sell stuff from a d-store without
                    sharing ownership with others.
                  </li>
                  <li>
                    Or you may not know all the owners in advance, so you could
                    create the slicer first and transfer slices later.
                  </li>
                </ul>
              </>
            }
          />
          <FAQsItem
            id="store"
            anchor="store"
            question="How to set up a d-store"
            answer={
              <>
                <p>
                  You can also create a slicer just for yourself, or someone
                  else.
                </p>
                <ul>
                  <li>
                    For example, you could sell stuff from a d-store without
                    sharing ownership with others.
                  </li>
                  <li>
                    Or you may not know all the owners in advance, so you could
                    create the slicer first and transfer slices later.
                  </li>
                </ul>
              </>
            }
          />
          <FAQsItem
            id="products"
            anchor="products"
            question="What products can be sold from slicers"
            answer={
              <>
                <p>
                  You can also create a slicer just for yourself, or someone
                  else.
                </p>
                <ul>
                  <li>
                    For example, you could sell stuff from a d-store without
                    sharing ownership with others.
                  </li>
                  <li>
                    Or you may not know all the owners in advance, so you could
                    create the slicer first and transfer slices later.
                  </li>
                </ul>
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
