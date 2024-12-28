import { cookies } from 'next/headers';

type CheckLogin = {
    ok: boolean
}

const checkLogin = async (): Promise<CheckLogin> => {
    const cookieStore = await cookies()
    const sessionID = cookieStore.get( 'session_id' )
    console.log( 'checkLogin', sessionID );

    if ( !sessionID ) {
        return { ok: false }
    }

    const res = await fetch( 'http://backend:8080/api/checklogin', {
        method: 'GET',
        cache: 'no-store',
        headers: {
            Cookie: `${sessionID.name}=${sessionID.value};`
        }
        // credentials: 'include',
    } )
    return res.json();
}

export { checkLogin }
