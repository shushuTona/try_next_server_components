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
                <p>ログインしています。</p>
            ) : (
                <Login />
            )}
            <LinkList />
        </main>
    );
}

export default Home;
