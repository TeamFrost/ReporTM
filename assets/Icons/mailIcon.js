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
                d="M4.515 8.757a1.5 1.5 0 011.5-1.5H30a1.5 1.5 0 011.5 1.5v16.986a3 3 0 01-3 3h-21a3 3 0 01-3-3v-16.5c0-.071.005-.142.015-.21v-.276zM7.5 12.092v13.651h21v-13.65l-7.318 7.318a4.5 4.5 0 01-6.364 0L7.5 12.092zm2.358-1.884h16.284l-7.081 7.082a1.5 1.5 0 01-2.121 0l-7.082-7.082z"
                clipRule="evenodd"
            />
        </Svg>
    )
}
