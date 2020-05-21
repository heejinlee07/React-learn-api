import React, { useState, useEffect } from "react";
import List from "./List";
import { bookApi } from "./api";

const initialState = {
  inputState: {
    name: "",
    phone: "",
  },
  bookState: [
    {
      _id: 0,
      name: "김건희",
      phone: "01080775647",
    },
  ],
};

const Book = () => {
  const [state, setState] = useState(initialState);
  // 외부 요청에 대한 상태관리
  //loading에 대한 상태관리
  const [loading, setLoading] = useState(false);
  //error에 대한 상태관리.
  //에러가 발생하면 state는 false가 됨
  const [error, setError] = useState({
    state: false,
    message: null,
  });
  useEffect(() => {
    //프로미스를 반환하므로 함수 형태로 준비를 시킨 후
    const bookFunc = async () => {
      try {
        setLoading(true);
        setState(initialState);
        let bookData = await bookApi.getBook();
        console.log(bookData);
        if (bookData.status === 200) {
          setState({
            inputState: state.inputState,
            bookState: bookData.data,
          });
        }
      } catch (error) {
        setError({
          state: true,
          message: error.message,
        });
      }
      setLoading(false);
    };
    //하단에서 실행시켜줍니다!
    bookFunc();
  }, []);

  const changeInput = (e) => {
    const { name, value } = e.target;
    setState({
      inputState: {
        ...state.inputState,
        [name]: value,
      },
      bookState: state.bookState,
    });
  };
  const addPhone = async () => {
    const date = new Date();
    const newPhone = {
      id: date.getTime(),
      name: state.inputState.name,
      phone: state.inputState.phone,
    };
    try {
      await bookApi.addBook(newPhone);
      setState({
        inputState: state.inputState,
        bookState: state.bookState.concat(newPhone),
      });
    } catch (error) {
      setError({
        state: true,
        message: error.message,
      });
    }
  };
  const deletePhone = async (id) => {
    try {
      await bookApi.deleteBook(id);
      setState({
        inputState: state.inputState,
        bookState: state.bookState.filter((b) => b.id !== id),
      });
    } catch (error) {
      setError({
        state: true,
        message: error.message,
      });
    }
  };

  const book = state.bookState;

  //loading이 true면 로딩중 화면을 띄우고, 초기 데이터를 가져온다.
  if (loading) return <h3>로딩중</h3>;
  //error의 state가 true면 에러가 발생한 상황이기 떄문에
  //에러 메세지를 띄운다.
  if (error.state === true) return <h3>{error.message}</h3>;

  return (
    <div>
      <h1>무한반복 전화번호부 with API</h1>
      이름:
      <input type="text" name="name" onChange={changeInput} />
      번호:
      <input type="text" name="phone" onChange={changeInput} />
      <button onClick={addPhone}>저장</button>
      <div>
        <List book={book} deletePhone={deletePhone} />
      </div>
    </div>
  );
};

export default Book;
