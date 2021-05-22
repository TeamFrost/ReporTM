import * as React from "react"
import Svg, { Path } from "react-native-svg"

export default (props) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="23"
            fill="none"
            viewBox="0 0 17 23"
            {...props}
        >
            <Path
                fill="#D32F2F"
                d="M11.074 9.63L8.5 12.221 5.914 9.63 4.2 11.353l2.587 2.591-2.574 2.592 1.712 1.723L8.5 15.668l2.574 2.59 1.712-1.722-2.574-2.592 2.574-2.59-1.712-1.724zm1.676-7.908L11.536.5H5.464L4.25 1.722H0v2.445h17V1.722h-4.25zM1.214 20.056c0 1.344 1.093 2.444 2.429 2.444h9.714c1.336 0 2.429-1.1 2.429-2.444V5.389H1.214v14.667zM3.643 7.833h9.714v12.223H3.643V7.833z"
            />
        </Svg>
    )
}
