import * as React from "react"
import Svg, { Path } from "react-native-svg"

export default (props) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="20"
            fill="none"
            viewBox="0 0 24 20"
            {...props}
        >
            <Path
                d="M19.77 2.83l1.4 1.4L8.43 16.97l-5.6-5.6 1.4-1.4 4.2 4.2L19.77 2.83zm0-2.83L8.43 11.34l-4.2-4.2L0 11.37l8.43 8.43L24 4.23 19.77 0z"
                fill="#323232"
            />
        </Svg>
    )
}
