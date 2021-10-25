const CarouselMusic = (color: string) => {
  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 992 1000"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="542.394"
        cy="550.707"
        r="449.293"
        fill="currentColor"
        className={color}
      />
      <circle
        cx="449.293"
        cy="449.293"
        r="428.293"
        fill="black"
        stroke="white"
        strokeWidth="42"
      />
      <circle cx="449.293" cy="449.294" r="141.078" fill="white" />
      <circle
        cx="449.293"
        cy="449.294"
        r="18.1272"
        stroke="black"
        strokeWidth="19.458"
      />
      <path
        d="M741.479 153.034C741.479 149.315 744.494 146.301 748.213 146.301V146.301C769.285 146.301 786.367 163.383 786.367 184.455V429.903C786.367 434.873 782.338 438.903 777.367 438.903H750.479C745.509 438.903 741.479 434.873 741.479 429.903V153.034Z"
        fill="white"
      />
      <rect
        x="748.002"
        y="409.182"
        width="44.8878"
        height="297.729"
        rx="9"
        transform="rotate(25 748.002 409.182)"
        fill="white"
      />
      <rect
        x="664.002"
        y="559.418"
        width="70.161"
        height="126.069"
        rx="9"
        transform="rotate(25 664.002 559.418)"
        fill="white"
      />
      <rect
        x="635.166"
        y="675.51"
        width="23.5118"
        height="60.196"
        rx="9"
        transform="rotate(25 635.166 675.51)"
        fill="white"
      />
    </svg>
  )
}

export default CarouselMusic
