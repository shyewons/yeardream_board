'use client';
import {useEffect, useState} from "react";
import axios from "axios";

export default function DetailPage({params}) {
    /*
    * {params}
    * url에 id 값이 담겨서 왔고, 사용하려면 {params}로 받아오면 된다.
    * 대신 params가 Promise 형태로 전달되는 방식 때문에 then을 이용하여야 한다.
    * 그래서 resolve한 값이 콜백인자로 들어오는 것이다.
    * params.then((data) => {console.log(data);}) 하면 {slug: '6a965d551185a74ff7539cfb'}로 들어옴
    * */

    /*
    * 여기서도 useEffect를 사용해야 한다.
    * loadBoard 안에서 setBoard를 하게 되면 재렌더링이 되고, params.then를 다시 받게 되고 반복이 되기 때문에
    * params의 변화를 감지한 후 렌더링 되도록 useEffect를 사용해야한다.
    * */

    /*
    * useEffect(..., [params])를 넣은 이유
    * ? board를 넣어야하는 것이 아닌가
    * → board는 useEffect를 이용해서 변화하는 값이지 effect를 실행시키는 기준이 아니다.
    * loadBoard는 params 값이 있어야 작동할 수 있기 때문에 params를 넣고, useEffect를 쓰는 것이다.
    * */
    const [board, setBoard] = useState([]);

    useEffect(() => {
        console.log(params);
        params.then(({slug}) => {
            loadBoard(slug);
        });
    }, [params]);

    const loadBoard = async (slug) => {
        let token = sessionStorage.getItem('token');
        console.log(token);

        try {
            const {data} = await axios.get(`http://localhost/board/detail/${slug}`
                ,{headers:{"Authorization": token}});
            console.log(data);
            setBoard(data.data.info);
        } catch(e) {
            console.log(e);
        }
    }
    return (
        <>
            <h1>상세보기</h1>
            <div className="top">
                <h2>{board.title}</h2>
                <p>{board.writer}</p>
            </div>
            <p>
                {board.content}
            </p>
            {/*<button onClick={deleteFn}>삭제</button>*/}
        </>
    );
}