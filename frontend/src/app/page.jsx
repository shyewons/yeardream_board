'use client';
import axios from "axios";
import {useState} from "react";

export default function App() {

    let token = '';
    // 로그인
    const [info, setInfo] = useState({
        id:"kimname",
        pass:"testtest"
    })
    const login = async () => {
        const {data} = await axios.post('http://localhost/member/login', info);

        if(data.success) {
            sessionStorage.setItem('id', data.data.id);
            sessionStorage.setItem('token', data.data.token);
            token = sessionStorage.getItem('token');
            // console.log(sessionStorage.getItem('id') , sessionStorage.getItem('token'));
            location.href = '/list/1';
        }
        console.log(data);
    }

    // 게시글 조회
    // const list = async () => {
    //     console.log(token);
    //     const {data} = await axios.get('http://localhost/board/list'
    //         ,{headers:{"Authorization": token}});
    //     console.log(data);
    //     // data.data.info
    // }

    // 게시글 상세보기
    // const detail = async () => {
    //     const {data} = await axios.get('http://localhost/board/detail/6a9523b1be5e93c5df513568'
    //         ,{headers:{"Authorization": token}});
    //     console.log(data);
    // }

    // 게시글 작성
    const write = async () => {
        /*
        * 예시 코드에서는 new FormData()로 객체에 내용을 담아서
        * post('http://localhost/write', formData, {headers: {Authorization:token}});
        * 로 보냈다.
        * */
        let formData = {
            "title" : "프론트 테스트 제목 입니다."
            ,"content" : "프론트 테스트 글 입니다."
            ,"writer" : "프론트엔드"
        }
        const {data} = await axios.post('http://localhost/board/write'
            , formData
            , {headers: {"Authorization": token}});
        console.log(data);
    }

    const boardDelete = async () => {
        const {data} = await axios.delete('http://localhost/board/delete/6a9523b1be5e93c5df513568'
            , {headers: {"Authorization": token}});
        console.log(data);
    }

    return (
        <>
            <button onClick={login}>로그인</button>
            <button onClick={list}>게시글 목록 조회</button>
            <button onClick={detail}>게시글 상세보기</button>
            <button onClick={write}>새 게시글 작성</button>
            <button onClick={boardDelete}>삭제</button>
        </>
    );
}