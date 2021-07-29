import { darkColorList } from "@utils/colorList"
import { useAppContext } from "@components/ui/context"

const HomeCake = ({ ...props }) => {
  const { color1, color2 } = useAppContext()

  return (
    <svg
      viewBox="0 0 611 595"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${
        props.spin && "animate-spin-slow drop-shadow-random-strong"
      } ${props.className} group nightwind-prevent-block`}
    >
      <mask id="path-1-inside-1" fill="white">
        <path d="M557.934 449.542C530.632 492.748 492.148 528.185 446.349 552.292C400.55 576.399 349.049 588.327 297.024 586.876L305.5 297.895L557.934 449.542Z" />
      </mask>
      <path
        d="M557.934 449.542C530.632 492.748 492.148 528.185 446.349 552.292C400.55 576.399 349.049 588.327 297.024 586.876L305.5 297.895L557.934 449.542Z"
        fill="url(#paint0_linear)"
        stroke="white"
        strokeWidth="10"
        mask="url(#path-1-inside-1)"
      />
      <mask id="path-2-inside-2" fill="white">
        <path d="M297.172 586.88C245.146 585.455 194.421 570.701 150.096 544.103C105.771 517.505 69.4078 479.999 44.6608 435.355L305.5 297.895L297.172 586.88Z" />
      </mask>
      <path
        d="M297.172 586.88C245.146 585.455 194.421 570.701 150.096 544.103C105.771 517.505 69.4078 479.999 44.6608 435.355L305.5 297.895L297.172 586.88Z"
        fill="currentColor"
        stroke="white"
        strokeWidth="10"
        mask="url(#path-2-inside-2)"
        className="text-gray-800 transition-colors duration-150 group-hover:text-blue-900"
      />
      <mask id="path-3-inside-3" fill="white">
        <path d="M44.6613 435.356C19.9141 390.712 7.65527 340.503 9.11695 289.775C10.5786 239.048 25.7093 189.589 52.9882 146.37L305.5 297.895L44.6613 435.356Z" />
      </mask>
      <path
        d="M44.6613 435.356C19.9141 390.712 7.65527 340.503 9.11695 289.775C10.5786 239.048 25.7093 189.589 52.9882 146.37L305.5 297.895L44.6613 435.356Z"
        fill="currentColor"
        stroke="white"
        strokeWidth="10"
        mask="url(#path-3-inside-3)"
        className="text-gray-700 transition-colors duration-150 group-hover:text-blue-800"
      />
      <mask id="path-4-inside-4" fill="white">
        <path d="M53.0774 146.229C80.3817 103.026 118.869 67.5913 164.669 43.4874C210.47 19.3835 261.972 7.45948 313.997 8.91379L305.5 297.895L53.0774 146.229Z" />
      </mask>
      <path
        d="M53.0774 146.229C80.3817 103.026 118.869 67.5913 164.669 43.4874C210.47 19.3835 261.972 7.45948 313.997 8.91379L305.5 297.895L53.0774 146.229Z"
        fill="currentColor"
        stroke="white"
        strokeWidth="10"
        mask="url(#path-4-inside-4)"
        className="text-gray-500 transition-colors duration-150 group-hover:text-blue-700"
      />
      <mask id="path-5-inside-5" fill="white">
        <path d="M313.828 8.90911C365.854 10.3345 416.579 25.0877 460.904 51.6859C505.229 78.2841 541.592 115.79 566.339 160.434L305.5 297.895L313.828 8.90911Z" />
      </mask>
      <path
        d="M313.828 8.90911C365.854 10.3345 416.579 25.0877 460.904 51.6859C505.229 78.2841 541.592 115.79 566.339 160.434L305.5 297.895L313.828 8.90911Z"
        fill="currentColor"
        stroke="white"
        strokeWidth="10"
        mask="url(#path-5-inside-5)"
        className="text-gray-400 transition-colors duration-150 group-hover:text-blue-500"
      />
      <mask id="path-6-inside-6" fill="white">
        <path d="M566.401 160.545C591.128 205.2 603.364 255.414 601.879 306.141C600.395 356.868 585.242 406.32 557.943 449.527L305.5 297.895L566.401 160.545Z" />
      </mask>
      <path
        d="M566.401 160.545C591.128 205.2 603.364 255.414 601.879 306.141C600.395 356.868 585.242 406.32 557.943 449.527L305.5 297.895L566.401 160.545Z"
        fill="currentColor"
        stroke="white"
        strokeWidth="10"
        mask="url(#path-6-inside-6)"
        className="text-gray-300 transition-colors duration-150 group-hover:text-blue-400"
      />
      <path
        d="M584.5 297.895C584.5 447.48 460.007 569.494 305.5 569.494C150.993 569.494 26.5 447.48 26.5 297.895C26.5 148.309 150.993 26.295 305.5 26.295C460.007 26.295 584.5 148.309 584.5 297.895Z"
        stroke="white"
        strokeWidth="35"
      />
      <path
        d="M305.64 297.412C310.559 375.092 311.642 538.251 276.622 569.443"
        stroke="white"
        strokeWidth="35"
      />
      <path
        d="M305.64 297.412C300.729 219.862 299.648 56.9778 334.609 25.838"
        stroke="white"
        strokeWidth="35"
      />
      <path
        d="M305.792 297.613C239.256 340.606 94.8812 423.1 49.6665 409.126"
        stroke="white"
        strokeWidth="35"
      />
      <path
        d="M305.792 297.613C372.216 254.691 516.348 172.336 561.487 186.287"
        stroke="white"
        strokeWidth="35"
      />
      <path
        d="M305.386 297.44C376.841 332.127 522.299 412.791 532.494 457.959"
        stroke="white"
        strokeWidth="35"
      />
      <path
        d="M305.386 297.44C234.051 262.812 88.8374 182.283 78.6597 137.192"
        stroke="white"
        strokeWidth="35"
      />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="320.264"
          y1="323.66"
          x2="491.435"
          y2="425.39"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color1[0]} />
          <stop offset="1" stopColor={color2[0]} />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default HomeCake
