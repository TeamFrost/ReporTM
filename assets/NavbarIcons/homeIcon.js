import React from "react";
import Svg, { Path } from "react-native-svg"

export default (props) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="34"
            height="32"
            fill="none"
            viewBox="0 0 34 32"
            {...props}
        >
            <Path
                fill="#593480"
                d="M28.667 31.667H5.333c-.92 0-1.666-.747-1.666-1.667V16.667H.333L15.82 1.178a1.667 1.667 0 012.358 0l15.489 15.489h-3.334V30c0 .92-.746 1.667-1.666 1.667zM13.667 20h6.666v8.333H27v-13.62l-10-10-10 10v13.62h6.667V20z"
                {...props}
            />
        </Svg>
    )
}
