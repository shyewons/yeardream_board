'use client';
import {useState} from "react";
import axios from "axios";

export default function DetailPage({params}) {
    let token = sessionStorage.getItem('token');
    console.log(token);
    /*
    * {params}
    * url에 id 값이 담겨서 왔고, 사용하려면 {params}로 받아오면 된다.
    * 대신 params가 Promise 형태로 전달되는 방식 때문에 then을 이용하여야 한다.
    * 그래서 resolve한 값이 콜백인자로 들어오는 것이다.
    * params.then((data) => {console.log(data);}) 하면 {slug: '6a965d551185a74ff7539cfb'}로 들어옴
    * */

    /*
    * 
    * */

    console.log(params);
    params.then(({slug}) => {
        loadBoard(slug);
    });
    const [board, setBoard] = useState([]);

    const loadBoard = async (slug) => {
        try {
            const {data} = await axios.get(`http://localhost/board/detail/${slug}`
                ,{headers:{"Authorization": token}});
            console.log(data);
            // setBoard(data.data.info);
        } catch(e) {
            console.log(e);
        }
    }
    return (
        <>
            <h1>상세보기</h1>
        </>
    );
}