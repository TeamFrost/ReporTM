import * as React from "react"
import Svg, { Mask, Circle, G, Path } from "react-native-svg"

export default (props) => {
    return (
        <Svg
            width={90}
            height={90}
            viewBox="0 0 90 90"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Mask
                id="prefix__a"
                maskUnits="userSpaceOnUse"
                x={0}
                y={0}
                width={90}
                height={90}
            >
                <Circle cx={45} cy={45} r={45} fill="#BB6BD9" />
            </Mask>
            <G mask="url(#prefix__a)">
                <Path fill="#FFD018" d="M0 0h90v90H0z" />
                <Path fill="#41479B" d="M0 0h30v90H0z" />
                <Path fill="#DC251C" d="M60 0h30v90H60z" />
            </G>
        </Svg>
    )
}

