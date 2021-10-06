const CarouselPayments = (color: string) => {
  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 1000 696"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M106.09 213.396C106.09 140.389 165.274 81.2051 238.282 81.2051H867.809C940.816 81.2051 1000 140.389 1000 213.396V563.29C1000 636.297 940.816 695.481 867.809 695.481H238.281C165.274 695.481 106.09 636.297 106.09 563.29V213.396Z"
        fill="currentColor"
        className={color}
      />
      <rect
        x="21"
        y="21"
        width="851.91"
        height="572.276"
        rx="111.191"
        fill="black"
        stroke="white"
        strokeWidth="42"
      />
      <rect
        x="893.91"
        y="204.977"
        width="68.1074"
        height="893.91"
        transform="rotate(90 893.91 204.977)"
        fill="white"
      />
      <rect
        x="762.934"
        y="450.557"
        width="68.1074"
        height="184.676"
        rx="34.0537"
        transform="rotate(90 762.934 450.557)"
        fill="white"
      />
    </svg>
  )
}

export default CarouselPayments
