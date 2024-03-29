import * as React from "react"
import Svg, { Path } from "react-native-svg"

export default (props) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="47"
            height="47"
            fill="none"
            viewBox="0 0 47 47"
            {...props}
        >
            <Path
                fill="#ffffff"
                d="M41.125 11.75h-6.208l-3.584-3.917h-11.75v3.917H29.61l3.584 3.917h7.931v23.5H9.792V21.542H5.875v17.625a3.928 3.928 0 003.917 3.916h31.333a3.928 3.928 0 003.917-3.916v-23.5a3.928 3.928 0 00-3.917-3.917zM15.667 27.417c0 5.405 4.386 9.791 9.791 9.791s9.792-4.386 9.792-9.791-4.387-9.792-9.792-9.792-9.791 4.387-9.791 9.792zm9.791-5.875c3.232 0 5.875 2.643 5.875 5.875 0 3.23-2.643 5.875-5.875 5.875-3.23 0-5.875-2.644-5.875-5.875 0-3.232 2.644-5.875 5.875-5.875zM9.792 11.75h5.875V7.833H9.792V1.958H5.875v5.875H0v3.917h5.875v5.875h3.917V11.75z"
            />
        </Svg>
    )
}
