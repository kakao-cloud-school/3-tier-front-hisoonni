import React, { useEffect, useState } from 'react';
import '../pages_css/Home.css';
import BoardModal from './BoardModal';
import Paging from '../utils/Paging';
import axios from 'axios';

const Home = () => {

    // Modal
    const [modal_is_open, setModalIsOpen] = useState(false);

    // Choice modal Content
    const [board_seq, setBoardSeq] = useState(0);

    // modal이 성공하거나 닫혔을때는 list 요청
    const modalSuccessAndClosing = (value) => {
        setModalIsOpen(false);
        !value && seletcBoardList();
    };

    // Board list Data
    const [board_list, setBoardList] = useState([]);

    // PagingNation
    const [paging, setPaging] = useState(Paging);

    // 요청 시 값 검증
    const seletcBoardListCheck = () => {
        if (paging.page < 1) {
            alert('page 값 부정확');
            return false;
        }
        if (paging.page_size < 1) {
            alert('page_size 값 부정확');
            return false;
        }
        return true;
    };

    // 게시글 다건 조회
    const seletcBoardList = async () => {
        console.log('selectBoardList');
        try {
            paging.loading = true;
            if(!seletcBoardListCheck()) return;
            const header = {
                'Content-type': 'application/json; charset=utf-8;',
                Accept: 'application/json',
            };
            const data = {
                page: paging.page,
                page_size: paging.page_size,
            };

            axios
            .post('http://127.0.0.1:8000/selectBoardList/', data, {header,})
            .then((response) => {
                const res = response.data;
                if (res.response_code) {
                    const resData = res.response_data;
                    setPaging({ ...paging, total_count: resData.total_count});
                    setBoardList(resData.tb_board_list);
                } else {
                    alert(res.message);
                }
            })
            .catch((response) => {
                alert(response);
            });
        } catch(e) {
            alert('요청 비정상');
        } finally {
            paging.loading = false;
        }
    };
    
    
    // pass 선택
    const onSetPage = (value) => {
        setPaging({ ...paging, page: value});
    };

    // page_size 선택
    const onSetPageSize = (value) => {
        setPaging({ ...paging, page: 1, page_size: Number(value)});
    };

    const choiceContent = (value) => {
        // 추후 개발 : board_seq never used 때문에 출력만 / 비동기식이라 값이 같지는 않음
        console.log('choice board_seq: ', value);
        console.log('board_seq: ', board_seq);
        setBoardSeq(value);
    };


    // mount 시점의 실행
    useEffect( () =>  {
        console.log('useEffect');
        seletcBoardList(); // 요청
    }, [paging.page, paging.page_size]);


    return (
        <div className="parentDiv">
            <h1 className="sectionTitle">Home</h1>
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>작성 일시</th>
                    </tr>
                </thead>
                {paging.loading && (
                    <tbody>
                        <tr>
                            <td style={{height: 400}} rowSpan={paging.page_size} colSpan={4}>Loading ...</td>
                        </tr>
                    </tbody>
                )}
                {paging.loading === false && board_list.length < 1 ? (
                    <tbody>
                        <tr>
                            <td style={{height: 400}} colSpan={4} >No Data</td>
                        </tr>
                    </tbody>
                ) : (
                    <tbody>
                        {board_list.map((index, i) => (
                            <tr key={index.board_seq} onClick={() => choiceContent(index.board_seq)}>
                                <td>
                                    {paging.total_count - (paging.page - 1) * paging.page_size - i}
                                </td>
                                <td>{index.board_title}</td>
                                <td>{index.board_writer}</td>
                                <td>{index.create_date}</td>
                            </tr>
                        ))}
                    </tbody>
                )}
            </table>
            <ul style={{ textAlign: 'center', paddingTop: 12 }}>
                {Array.from (
                    {length: paging.total_count / paging.page_size + 1 },
                    (_, idx) => (
                        <li 
                        key={idx+1} 
                        style={{
                            padding:8, 
                            margin: 4, 
                            borderRadius: 4, 
                            border: '2px solid rebeccapurple', 
                            width: 10, 
                            height: 10, 
                            display: 'inline-block',
                        }}
                        onClick={() => onSetPage(idx + 1)}
                        >
                        {idx + 1}
                        </li>
                    ),
                )}
            </ul>
            <div style={{ textAlign: 'right'}}>
                <select style={{ border: '2px solid rebeccapurple', borderRadius: 4, padding: 4, width: 60,}}
                onChange={(e) => onSetPageSize(e.target.value)}
                value={paging.page_size}>
                    {paging.page_size_options.map((index) => (
                        <option key={index} value={index}>{index}</option>
                    ))}
                </select>
            </div>
            <div className="buttonDiv">
                <button className="goodButton" onClick={() => setModalIsOpen(true)}>New</button>
            </div>
            <BoardModal modal_is_open = {modal_is_open} modalSuccessAndClosing = {modalSuccessAndClosing}/>
        </div>
    );
};
export default Home;