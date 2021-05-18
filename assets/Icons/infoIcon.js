import React from "react";
import Svg, { Path } from "react-native-svg"

export default (props) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="none"
            viewBox="0 0 18 18"
            {...props}
        >
            <Path
                fill="#8F92A1"
                fillRule="evenodd"
                d="M8.992 16.5a7.5 7.5 0 11.015-15 7.5 7.5 0 01-.014 15zM3 9.129A6 6 0 103 9v.129zm6.75 3.621h-1.5v-1.5h1.5v1.5zm0-3h-1.5v-4.5h1.5v4.5z"
                clipRule="evenodd"
            />
        </Svg>
    )
}
