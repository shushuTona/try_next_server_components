"use client";

import { useCallback, useState } from "react";

type props = {
    title: string
}

const Counter = (props: props) => {
    const [count, setCount] = useState(0);

    const clickEvent= useCallback(() => {
        setCount(count + 1)
    }, [count]);

    return (
        <>
            <p>{ props.title }</p>
            <div className="mt-20 p5">
                <button type="button" onClick={clickEvent}>CLICK</button>
                <p className="mt-5">{ count }</p>
            </div>
        </>
    )
}

export default Counter;
