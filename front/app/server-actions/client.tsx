'use client';

import { create } from "./actions";
import { ChangeEvent, useCallback, useState } from "react";

const ClientComponent = () => {
    const [name, setName] = useState("");

    const changeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }, []);

    const clickHandler= useCallback(() => {
        create(name);
    }, [name])

    return (
        <>
            <label>NAME : <input onChange={changeHandler} /></label>
            <p>{ name }</p>
            <button type="button" onClick={clickHandler}>call server actions</button>
        </>
    )
}

export { ClientComponent }
