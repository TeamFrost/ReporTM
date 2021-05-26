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
                <Path d="M-15 0h120v90H-15V0z" fill="#41479B" />
                <Path
                    d="M105 78.281l-44.375-33.28L105 11.718V0H89.375L45 33.281.625 0H-15v11.719L29.375 45-15 78.281V90H.625L45 56.719 89.375 90H105V78.281z"
                    fill="#fff"
                />
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1.416 17L38.75 45l-56 42 4.5 6L45 49.687 102.75 93l4.5-6-56-42 56-42-4.5-6L45 40.313l-40-30V17H1.416zM-8.75 0L1 7.313V12h-6.25L-15 4.688V0h6.25zM.083 16l.917.688V16H.083z"
                    fill="#DC251C"
                />
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M30 32.5V0h30v32.5h45v25H60V90H30V57.5h-45v-25h45z"
                    fill="#fff"
                />
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M37.5 40V0h15v40H105v10H52.5v40h-15V50H-15V40h52.5z"
                    fill="#DC251C"
                />
            </G>
        </Svg>
    )
}

