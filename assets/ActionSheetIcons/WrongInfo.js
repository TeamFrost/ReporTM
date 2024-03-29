import * as React from "react"
import Svg, { Path } from "react-native-svg"

export default (props) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="20"
            fill="none"
            viewBox="0 0 18 20"
            {...props}
        >
            <Path
                d="M8 14h2v2H8v-2zm0-8h2v6H8V6zm8-4h-4.18C11.4.84 10.3 0 9 0 7.7 0 6.6.84 6.18 2H2c-.14 0-.27.01-.4.04A2.008 2.008 0 00.16 3.23C.06 3.46 0 3.72 0 4v14c0 .27.06.54.16.78s.25.45.43.64c.27.27.62.47 1.01.55.13.02.26.03.4.03h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7-.25c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75zM16 18H2V4h14v14z"
                fill="#323232"
            />
        </Svg>
    )
}
