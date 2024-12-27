import Counter from "@/client/counter";
import Token from "@/client/token";
import Link from "next/link";

const getTokne = async () => {
    const res = await fetch('http://server:8001/gettoken', {cache: 'no-store'})
    return res.json();
}

type GetToken = {
    token: string
}

const Home = async ()=> {
    const gettoken: GetToken = await getTokne();
    console.log(gettoken.token);

    return (
        <main className="text-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <h1>Home</h1>
            <Token token={gettoken.token} />
            <Counter title="カウンター" />
            <Link href="/other">Other</Link>
        </main>
    );
}

export default Home;
