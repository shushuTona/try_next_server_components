import Link from "next/link";

const LinkList = () => {
    return (
        <ul className="flex flex-col gap-5 my-16">
            <Link href="/">Home</Link>
            <Link href="/page1">Page1</Link>
            <Link href="/page2">Page2</Link>
        </ul>
    )
}

export default LinkList;
