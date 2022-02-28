interface IProps {
    color: string;
    width: string;
    height: string;
  }
  
  const AccountWidget = ({color, width, height}: IProps) => {
    return <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
      width={width} height={height} viewBox="0 0 512.000000 512.000000"
      preserveAspectRatio="xMidYMid meet">
      
      <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
       fill={color} stroke="none">
          <path d="M2415 4953 c-488 -61 -895 -385 -1060 -843 -114 -317 -92 -697 56
          -992 85 -169 237 -354 377 -456 52 -39 60 -48 45 -54 -10 -4 -63 -24 -118 -44
          -376 -137 -766 -418 -1019 -734 -331 -414 -527 -945 -530 -1437 -1 -143 4
          -160 68 -207 l27 -21 2299 0 2299 0 27 21 c64 47 69 63 68 212 -5 491 -201
          1021 -531 1432 -256 320 -641 598 -1018 734 -55 20 -108 40 -118 44 -14 6 -7
          15 42 51 88 64 233 217 295 313 74 114 112 193 151 313 170 518 -11 1089 -451
          1423 -85 66 -304 174 -404 202 -151 42 -369 60 -505 43z m376 -342 c175 -45
          317 -127 445 -255 130 -129 209 -269 256 -449 32 -121 32 -339 0 -457 -50
          -185 -123 -310 -257 -445 -177 -177 -375 -266 -621 -282 -405 -25 -793 221
          -943 598 -53 133 -65 199 -65 359 0 153 17 246 66 365 63 149 196 320 322 409
          118 85 273 150 416 175 84 15 292 5 381 -18z m119 -2240 c757 -133 1373 -660
          1620 -1386 44 -128 85 -315 96 -433 l7 -72 -2073 0 -2073 0 7 73 c11 117 52
          304 96 432 258 758 920 1298 1715 1400 154 20 453 13 605 -14z"/>
      </g>
    </svg>
  }
  
  export default AccountWidget;