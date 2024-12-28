"use client";

import { FormEvent, useCallback } from "react";

const Login = () => {
    const handleSubmit = useCallback( ( e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        if ( form ) {
            const formData = new FormData( form );
            const csrfTokenInput = document.getElementById( 'CSRF_TOKEN' );
            let csrfToken = '';
            if ( csrfTokenInput ) {
                csrfToken = ( csrfTokenInput as HTMLInputElement ).value
            }
            const headers = {
                "CSRF-TOKEN": csrfToken,
            }
            fetch( '/api/login', { method: form.method, headers: headers, body: formData } )
                .then( res => res.status )
                .then( status => console.log( status ) )
            const formJson = Object.fromEntries( formData.entries() );
            console.log( 'formJson', formJson );
        }
    }, [] );

    return (
        <form className="flex flex-col gap-5 my-10" method="post" onSubmit={handleSubmit}>
            <label>email: <input type="text" name="email" /></label>
            <label>password: <input type="password" name="password" /></label>
            <button type="submit">Login</button>
        </form>
    )
}

export default Login;
