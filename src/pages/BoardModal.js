import React, { useState } from 'react';
import Modal from 'react-modal';
import '../pages_css/BoardModal.css';
import axios from 'axios';

const BoardModal = ( data ) => {
    const [inputs, setInputs] =useState({
        title: '',
        content: '',
        writer: '',
    });

    // insert 값 검증
    const insertBoardValueCheck = () => {
        if ( inputs.title === '') {
            alert('Please input title');
            return false;
        }
        if ( inputs.content === '') {
            alert('Please input content');
            return false;
        }
        if ( inputs.writer === '') {
            alert('Please input writer');
            return false;
        }
        return true;
    };

    //게시글 등록
    const insertBoard = async () => {
        console.log('insertBoard');
        if (!insertBoardValueCheck()) return;

        const headers = {
            'Content-type': 'application/json; charset=utf-8;',
            Accept: 'application/json',
        };

        const datas = {
            board_title: inputs.title,
            board_content: inputs.content,
            board_writer: inputs.writer,
        };

        axios
        .post('http://127.0.0.1:8000/insertBoard/', datas, {
            headers,
        })
        .then((response) => {
            if ( response.data.response_code) {
                modalClose();
            } else {
                alert(response.data.message);
            }
        })
        .catch((response) => {
            alert(response.data.message);
        });
    };

    // 모달 닫기
    const modalClose = () => {
        resetInput();
        data.modalSuccessAndClosing(false);
    };
    
    // 값 리셋
    const resetInput = () => {
        setInputs({
            title: '',
            content: '',
            writer: '',
        });
    };


    return (
        <Modal className="modal" isOpen={data.modal_is_open} ariaHideApp={false}>
            <div style={{ height: '100%' }}>
                <div style={{ paddingTop: '4%', paddingLeft: '4%', paddingRight: '4%' }}>
                    <h1 style={{ fontSize: 28, fontWeight: 'bold' }}>제목</h1>
                    <input className="inputs" value={inputs.title} onChange={(e) => setInputs({...inputs, title: e.target.value})}/>
                    <h1 style={{ fontSize: 28, fontWeight: 'bold' }}>내용</h1>
                    <textarea
                        rows={5}
                        className="inputs"
                        value={inputs.content}
                        onChange={(e) => setInputs({ ...inputs, content: e.target.value})}
                        style={{ resize: 'none' }}
                    />
                    <div className="buttonDiv">
                        <input
                            placeholder="작성자"
                            onChange={(e) => setInputs({ ...inputs, writer: e.target.value})}
                            style={{
                                padding: 6,
                                width: 200,
                                fontSize: 20,
                                resize: 'none',
                                marginRight: 20,
                                borderRadius: 4,
                            }}
                        />
                        <button className="goodButton" onClick={() => insertBoard()}>
                            저장
                        </button>
                        <button className="badButton" onClick={() => data.setModalIsOpen(false)}>
                            닫기
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );






};

export default BoardModal;
