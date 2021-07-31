import { darkColorList } from "@utils/colorList"
import { useAppContext } from "@components/ui/context"

const HomeDecentralized = ({ ...props }) => {
  const { color1, color2 } = useAppContext()

  return (
    <div className="relative flex items-center justify-center w-64 h-64 sm:w-72 sm:h-72">
      <svg
        viewBox="0 0 1256 1232"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`absolute w-full h-full ${props.className} group  drop-shadow-random-strong`}
      >
        <path
          d="M212.5 1014L54 1186L293 1116.5M212.5 1014L499.5 953.5M212.5 1014L293 1116.5M212.5 1014L54 814.5M212.5 1014L258 834M499.5 953.5L425.5 692.5M499.5 953.5L258 834M499.5 953.5L738.5 973M499.5 953.5L293 1116.5M499.5 953.5L677.5 834M425.5 692.5L627.5 647M425.5 692.5L484 508M627.5 647L799.5 534M627.5 647L390.5 214.5M627.5 647L677.5 834M627.5 647L484 508M799.5 534L538.5 275M799.5 534L788.5 295M799.5 534L897 692.5M538.5 275L677.5 192.5M538.5 275L512.5 48.5M677.5 192.5L788.5 295M677.5 192.5L512.5 48.5M364.5 416.5L258 834M364.5 416.5L484 508M364.5 416.5L390.5 214.5M364.5 416.5L150 515.5M258 834L240.5 586.5M258 834L54 814.5M738.5 973L897 692.5M738.5 973L677.5 834M897 692.5L1073 758L1206 814.5M897 692.5L677.5 834M897 692.5L1023 475M1206 592.5L1023 475M1206 592.5V814.5M1206 592.5V275H1188.5L1023 475M1023 475L1206 814.5M1023 475L1015 337M788.5 295L1015 337M788.5 295L897 118.5L1015 337M390.5 214.5L512.5 48.5M54 814.5V655.5M240.5 586.5L54 647V655.5M240.5 586.5L150 515.5M150 515.5L54 655.5"
          stroke="url(#paint8_linear)"
          strokeWidth="8"
          className="animate-pulse-slow"
        />

        <path
          d="M1197.86 276.607L57.5582 647.457M881.469 113.77C1040.78 160.863 1155.07 238.244 1191.56 264.985C1199.55 270.842 1204 280.182 1204 290.091V806.554C1204 813.931 1199.25 820.469 1192.24 822.75L72.2973 1186.94C61.2927 1190.52 50 1182.31 50 1170.74V655.679C50 651.793 51.2816 648.016 53.6462 644.933L504.545 56.9611C507.895 52.5931 513.081 50.1147 518.578 50.4154C556.353 52.4823 711.96 63.6642 881.469 113.77Z"
          stroke="url(#paint8_linear)"
          strokeWidth="48"
          className="absolute w-full h-full transition-opacity duration-200 opacity-0 group-hover:opacity-100"
        />
        <circle cx="50" cy="643" r="50" fill="white" />
        <circle cx="1206" cy="262" r="50" fill="white" />
        <circle cx="1206" cy="813" r="50" fill="white" />
        <circle cx="50" cy="1182" r="50" fill="white" />
        <circle cx="517" cy="50" r="50" fill="white" />
        <circle cx="627" cy="643" r="50" fill="white" />
        <circle cx="677" cy="192" r="30" fill="white" />
        <circle cx="787" cy="292" r="30" fill="white" />
        <circle cx="538" cy="274" r="20" fill="white" />
        <circle cx="426" cy="693" r="30" fill="white" />
        <circle cx="210" cy="1013" r="30" fill="white" />
        <circle cx="289" cy="1117" r="30" fill="white" />
        <circle cx="893" cy="693" r="30" fill="white" />
        <circle cx="677" cy="833" r="30" fill="white" />
        <circle cx="798" cy="533" r="20" fill="white" />
        <circle cx="257" cy="833" r="20" fill="white" />
        <circle cx="738" cy="971" r="30" fill="white" />
        <circle cx="497" cy="953" r="30" fill="white" />
        <circle cx="1022" cy="477" r="30" fill="white" />
        <circle cx="1064" cy="754" r="20" fill="white" />
        <circle cx="1206" cy="585" r="30" fill="white" />
        <circle cx="240" cy="586" r="30" fill="white" />
        <circle cx="483" cy="507" r="30" fill="white" />
        <circle cx="1016" cy="334" r="30" fill="white" />
        <circle cx="893" cy="117" r="30" fill="white" />
        <circle cx="49" cy="813" r="30" fill="white" />
        <circle cx="363" cy="417" r="30" fill="white" />
        <circle cx="151" cy="515" r="30" fill="white" />
        <circle cx="388" cy="212" r="30" fill="white" />

        <linearGradient
          id="paint8_linear"
          x1="784.5"
          y1="79"
          x2="695.71"
          y2="1009.91"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color1[0]} />
          <stop offset="1" stopColor={color2[0]} />
        </linearGradient>
      </svg>
    </div>
  )
}

export default HomeDecentralized
