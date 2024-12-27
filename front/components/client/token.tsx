"use client";

import { setToken } from "../../state/token";

type props = {
    token: string
}

const Token = (props: props) => {
    setToken(props.token);

    return (
        <>
            <p>TOKEN</p>
        </>
    )
}

export default Token;
