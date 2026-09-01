import ListComp from "@/app/list/[slug]/ListComp";
import "./list.css";
import Link from "next/link";

export default function ListPage() {
    return (
        <>
            <h1>List</h1>
            <ListComp />
            <Link href="/write">
                <button>글쓰기</button>
            </Link>
        </>
    );
}