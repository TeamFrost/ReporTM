import * as React from "react"
import Svg, { Path } from "react-native-svg"

export default (props) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="18"
            fill="none"
            viewBox="0 0 22 18"
            {...props}
        >
            <Path
                d="M13.444 0v4.8C4.89 6 1.222 12 0 18c3.056-4.2 7.333-6.12 13.444-6.12v4.92L22 8.4 13.444 0zm2.445 5.796L18.54 8.4l-2.652 2.604V9.48h-2.445c-2.53 0-4.803.456-6.917 1.14 1.71-1.668 3.91-2.976 7.26-3.42l2.102-.324v-1.08z"
                fill="#323232"
                {...props}
            />
        </Svg>
    )
}
