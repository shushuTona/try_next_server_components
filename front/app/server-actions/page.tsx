import LinkList from "@/server/linklist";
import { checkLogin } from "../../auth/login";
import { redirect } from "next/navigation";
import { getTokne } from "../../auth/csrf";

const fServerAction = async (formData: FormData) => {
    'use server';

    console.log(formData);
}

const ServerActions = async () => {
    const res = await checkLogin();
    if ( !res.ok ) {
        redirect( "/" );
    }
    const token = await getTokne();

    return (
        <main className="text-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <h1>ServerActions</h1>
            <form className="flex flex-col gap-5 my-10" action={fServerAction}>
                <input type="hidden" id="CSRF_TOKEN" name="CSRF-TOKEN" value={token.token} />
                <label>email: <input type="text" name="email" /></label>
                <label>password: <input type="password" name="password" /></label>
                <button type="submit">Try Server Actions</button>
            </form>
            <LinkList />
        </main>
    )
}

export default ServerActions;
