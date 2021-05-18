import React from "react";
import Svg, { Path } from "react-native-svg"

export default (props) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            fill="none"
            viewBox="0 0 36 36"
            {...props}
        >
            <Path
                fill="#171717"
                fillRule="evenodd"
                d="M24 10.5a6 6 0 11-12 0 6 6 0 0112 0zm-3 0a3 3 0 11-6 0 3 3 0 016 0zM24 22.5a1.5 1.5 0 00-1.5-1.5h-9a1.5 1.5 0 00-1.5 1.5v9H9v-9a4.5 4.5 0 014.5-4.5h9a4.5 4.5 0 014.5 4.5v9h-3v-9z"
                clipRule="evenodd"
            />
        </Svg>
    )
}
