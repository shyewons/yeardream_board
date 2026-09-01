'use client';
import {useState} from "react";
import axios from "axios";

export default function WritePage() {
    const [post, setPost] = useState({
        "title":'',
        "content":''
    });
    const onChange = (e) => {
        setPost({
           ...post,
           [e.target.name]: e.target.value
        });
    }

    const save = async (e) => {
        e.preventDefault();

        let token = sessionStorage.getItem('token');
        let id = sessionStorage.getItem('id');

        let formData = new FormData();
        formData.append("title", post.title);
        formData.append("content", post.content);
        formData.append("user_name", id);
        for (const [key, value] of formData.entries()) {
            console.log(key, value);
        }

        try {
            const {data} = await axios.post('http://localhost/board/write'
                , formData
                , {headers: {"Authorization": token}});
            console.log(data);

            location.href= `/detail/${data._id}`;
        } catch(e) {
            console.log(e);
        }

    }


    return (
        <>
            <label htmlFor="title_input">제목 : <input type="text" name="title" id="title_input" value={post.title} onChange={onChange}/></label>
            <label htmlFor="content_input">내용</label>
            <textarea name="content" id="content_input" cols="30" rows="10" value={post.content} onChange={onChange}></textarea>
            <button onClick={save}>완료</button>
        </>
    );
}