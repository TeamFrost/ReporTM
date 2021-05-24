import React from "react";
import Svg, { Path } from "react-native-svg"

export default (props) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="23"
            fill="none"
            viewBox="0 0 35 23"
            {...props}
        >
            <Path
                fill="#593480"
                d="M34.375 22.75H.625V19h33.75v3.75zm0-9.375H.625v-3.75h33.75v3.75zm0-9.375H.625V.25h33.75V4z"
                {...props}
            />
        </Svg>
    )
}
