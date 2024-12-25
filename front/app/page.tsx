"use client";

import Counter from "@/client/counter";
import Link from "next/link";

const Home = ()=> {
    return (
        <main className="text-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <h1>Home</h1>
            <Counter title="カウンター" />
            <Link href="/other">Other</Link>
        </main>
    );
}

export default Home;
