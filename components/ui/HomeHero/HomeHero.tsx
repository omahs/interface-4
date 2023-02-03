import { Button } from "@components/ui"
import Link from "next/link"

export default function HomeHero() {
  return (
    <div className="isolate">
      <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-x-hidden blur-3xl sm:top-[-20rem]">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fillOpacity=".3"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="var(--color2)" />
              <stop offset={1} stopColor="var(--color1)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <main>
        <div className="relative">
          <div className="max-w-4xl pt-48 pb-32 mx-auto">
            {/* <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <div className="relative px-3 py-1 text-sm leading-6 text-gray-600 rounded-full ring-1 ring-gray-900 ring-opacity-10 hover:ring-opacity-20">
                Announcing our next round of funding.{" "}
                <a href="#" className="font-semibold text-indigo-600">
                  <span className="absolute inset-0" aria-hidden="true" />
                  Read more <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div> */}
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-3xl font-black tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                Buy and sell anything fully on-chain
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Sell items, mint NFTs, split payments and more from your
                decentralized store, and allow buyers to purchase in ETH or any
                token directly from their wallet.
              </p>
              <div className="flex items-center justify-center mt-10 gap-x-6">
                <Button label="Create slicer" href="/slice" double={false} />
                <Link href="/slicer">
                  <a className="text-base font-semibold leading-7 text-gray-900 group">
                    Explore{" "}
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-100 translate-x-2"
                    >
                      →
                    </span>
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-x-hidden blur-3xl sm:top-[calc(100%-30rem)]">
            <svg
              className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
              viewBox="0 0 1155 678"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
                fillOpacity=".3"
                d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
              />
              <defs>
                <linearGradient
                  id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
                  x1="1155.49"
                  x2="-78.208"
                  y1=".177"
                  y2="474.645"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="var(--color1)" />
                  <stop offset={1} stopColor="var(--color2)" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </main>
    </div>
  )
}
