import Link from "next/link"
import colors from "tailwindcss/colors"

const Logo = ({ ...props }) => {
  const logoColors = [colors.blue[400]]
  const logoColorsDark = [
    // colors.cyan[600],
    colors.gray[800],
    // colors.purple[600],
    // colors.indigo[600],
    // colors.yellow[600],
    // colors.red[600],
    // colors.pink[600],
    // colors.blue[600],
  ]

  // const logoColor =
  //   logoColorsDark[Math.floor(Math.random() * logoColorsDark.length)]
  // const logoColor2 = logoColors[Math.floor(Math.random() * logoColors.length)]
  const size = props.size || "w-8 md:w-10"
  const margin = props.margin || "mt-1.5 ml-1.5 md:mt-2 md:ml-2"

  return (
    <div className={`relative ${size}`}>
      <svg
        viewBox="0 0 496 490"
        fill={logoColorsDark[0]}
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10"
      >
        <path
          d="M13 257.5L198.619 15.4524C199.799 13.9136 201.631 13.0406 203.568 13.1436C218.091 13.9165 282.151 18.3528 352 39C431.5 62.5 483.5 104.5 483.5 104.5V322.142C483.5 324.741 481.827 327.044 479.355 327.848L20.8555 476.945C16.9785 478.206 13 475.316 13 471.24V257.5Z"
          fill="black"
        />
        <path
          d="M13 257.5L483.5 104.5M13 257.5L198.619 15.4524C199.799 13.9136 201.631 13.0406 203.568 13.1436C218.091 13.9165 282.151 18.3528 352 39C431.5 62.5 483.5 104.5 483.5 104.5M13 257.5V471.24C13 475.316 16.9785 478.206 20.8555 476.946L479.355 327.848C481.827 327.044 483.5 324.741 483.5 322.142V104.5"
          stroke="white"
          strokeWidth="32"
        />
      </svg>
      <svg
        viewBox="0 0 496 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`absolute top-0 left-0 ${size} ${margin}`}
      >
        <path
          d="M14.2388 255.622L198.418 15.4524C199.598 13.9136 201.431 13.0406 203.367 13.1437C217.882 13.9162 281.868 18.3488 351.637 38.9721C421.415 59.5984 469.985 94.4921 480.745 102.657C482.189 103.752 482.996 105.456 482.996 107.268V311.806C482.996 314.405 481.323 316.708 478.851 317.512L20.8555 466.445C16.9785 467.706 13 464.816 13 460.74V259.274C13 257.953 13.4354 256.67 14.2388 255.622Z"
          fill={logoColors[0]}
          stroke="white"
          strokeWidth="32"
        />
      </svg>
    </div>
  )
}

export default Logo
