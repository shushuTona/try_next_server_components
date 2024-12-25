import Counter from "@/client/counter";
import Link from "next/link";

const getPosts = async ()=> {
    const url1 = 'https://jsonplaceholder.typicode.com/posts'
    const res = await fetch(url1, {cache: 'no-store'})
    return res.json();
}

type Post = {
    userId: number
    id: number
    title: string
    body: string
}

const Home = async ()=> {
    const posts = await getPosts();
    console.log('in posts')

    return (
        <main className="text-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <h1>Home</h1>
            <Counter title="カウンター" />
            <Link href="/other">Other</Link>

            <ul> {
                posts.map((p: Post) => {
                    return (
                        <li key={p.id}>
                            <h3>記事ID {p.id} : {p.title}</h3>
                            <p>{p.body}</p>
                        </li>
                    )
                })
            } </ul>
        </main>
    );
}

export default Home;
