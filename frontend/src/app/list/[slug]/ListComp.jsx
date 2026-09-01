'use client';
import axios from "axios";
import {useEffect, useState} from "react";
import Link from "next/link";

export default function ListComp() {
    let token = sessionStorage.getItem('token');
    const [list, setList] = useState([]);

    const loadList = async () => {
        try {
            const {data} = await axios.get('http://localhost/board/list'
                ,{headers:{"Authorization": token}});
            console.log(data);
            setList(data.data.info);
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        loadList();
    }, []);

    const listItems = list.map((item) => (
        <li key={item._id}>
            <Link href={`/detail/${item._id}`}>
                <p>{item.title}</p>
            </Link>
            <p>{item.writer}</p>
        </li>
    ));

    return (
        <>
            <ul className="list_ul">
                {listItems}
            </ul>
        </>
    );
}