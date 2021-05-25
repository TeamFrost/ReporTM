import * as React from "react"
import Svg, { Path } from "react-native-svg"

export default (props) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="42"
            height="42"
            fill="none"
            viewBox="0 0 42 42"
            {...props}
        >
            <Path
                fill="#ffffff"
                d="M32 38H4V10h18V6H4c-2.2 0-4 1.8-4 4v28c0 2.2 1.8 4 4 4h28c2.2 0 4-1.8 4-4V20h-4v18zm-15.58-6.34l-3.92-4.72L7 34h22l-7.08-9.42-5.5 7.08zM36 6V0h-4v6h-6c.02.02 0 4 0 4h6v5.98c.02.02 4 0 4 0V10h6V6h-6z"
            />
        </Svg>
    )
}
