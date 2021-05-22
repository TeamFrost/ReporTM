import * as React from "react"
import Svg, { Path } from "react-native-svg"

export default (props) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 20 20"
            {...props}
        >
            <Path
                d="M20 18.67l-5.752-5.752-2.537-2.536-7.647-7.647-1.33-1.33L1.33 0 0 1.33l2.178 2.187v12.419c0 1.037.849 1.886 1.886 1.886h12.419L18.66 20 20 18.67zM4.064 15.936V5.403l6.45 6.45-.792.99-1.886-2.565-2.829 3.772h7.704l1.886 1.886H4.064zM6.733 2.735L4.847.849h12.418c1.038 0 1.886.848 1.886 1.886v12.418l-1.886-1.886V2.735H6.733z"
                fill="#323232"
            />
        </Svg>
    )
}
