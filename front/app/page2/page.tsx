import LinkList from "@/server/linklist";
import { checkLogin } from "../../auth/login";
import { redirect } from "next/navigation";

const Page2 = async () => {
    const res = await checkLogin();
    if ( !res.ok ) {
        redirect( "/" );
    }

    return (
        <main className="text-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <h1>Page2</h1>
            <LinkList />
        </main>
    )
}

export default Page2;
