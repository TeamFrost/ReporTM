import * as React from "react"
import Svg, { Path } from "react-native-svg"

export default (props) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="19"
            fill="none"
            viewBox="0 0 20 19"
            {...props}
        >
            <Path
                d="M6 14L2.45 9l1.63-2.29-1.43-1.43L0 9l4.37 6.16c.36.51.96.84 1.63.84l7.37-.01-2-1.99H6zm14 2.97l-1.58-1.58c.36-.35.58-.85.58-1.39V4c0-1.1-.9-1.99-2-1.99L6 2c-.28 0-.55.07-.79.18L3.03 0 1.62 1.41l16.97 16.97L20 16.97zM7.03 4H17v9.97L7.03 4z"
                fill="#323232"
            />
        </Svg>
    )
}
