import LinkList from "@/server/linklist";
import Login from "@/client/login";
import { checkLogin } from "../auth/login";

const Home = async () => {
    const res = await checkLogin();
    const isLogin = res.ok;

    return (
        <main className="text-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <h1>Home</h1>
            {isLogin ? (
                <>
                    <p className="mt-16">ログインしています。</p>
                    <LinkList />
                </>
            ) : (
                <Login />
            )}
        </main>
    );
}

export default Home;
