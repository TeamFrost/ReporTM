import * as React from "react"
import Svg, { Path } from "react-native-svg"

export default (props) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="17"
            fill="none"
            viewBox="0 0 15 17"
        >
            <Path
                d="M7.36 2l.4 2H13v6H9.64l-.4-2H2V2h5.36zM9 0H0v17h2v-7h5.6l.4 2h7V2H9.4L9 0z"
                fill="#323232"
                {...props}
            />
        </Svg>
    )
}
