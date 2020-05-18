import React, { useEffect, useReducer } from "react";
import List from "./List";
import { bookApi } from "./api";
import { reducer, initialState } from "./reducer/bookReducer";

const BookOriginal = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    //프로미스를 반환하므로 함수 형태로 준비를 시킨 후
    const bookFunc = async () => {
      try {
        dispatch({ type: "LOADING" });
        let bookData = await bookApi.getBook();
        if (bookData.status === 200) {
          dispatch({ type: "SUCCESS", phone: bookData.data });
        } else {
          dispatch({
            type: "ERROR",
            error: {
              state: true,
              message: bookData.statusText,
            },
          });
        }
        //error를 잡아서 처리. '네트워크 관련된 에러'를 잡아서 처리하는 것.
      } catch (error) {
        dispatch({
          type: "ERROR",
          error: {
            state: true,
            message: error.message,
          },
        });
      }
      // 각 dispatch 에서 로딩 상태도 관리하기 때문에
      // 따로 함수 마지막에서 처리하지 않아도 됩니다.
      // dispatch({ type: "SUCCESS" });
    };
    //하단에서 실행시켜줍니다!
    bookFunc();
  }, []);

  const changeInput = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "CHANGE_INPUT", name: name, value: value });
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
      dispatch({ type: "ADD", newPhone: newPhone });
    } catch (error) {
      dispatch({
        type: "ERROR",
        error: {
          state: true,
          message: error.message,
        },
      });
    }
  };
  const deletePhone = async (id) => {
    try {
      await bookApi.deleteBook(id);
      dispatch({ type: "DELETE", id: id });
    } catch (error) {
      dispatch({
        type: "ERROR",
        error: {
          state: true,
          message: error.message,
        },
      });
    }
  };

  const { loading, error, bookState: book } = state;
  // 컴포넌트에 뿌려주기 전에 분기 처리
  if (loading) return <h3>로딩중 ... ...</h3>;
  if (error.state) return <h3>에러사항:{error.message}</h3>;

  return (
    <div>
      <h1>무한반복 전화번호부 with API</h1>
      이름:
      <input type="text" name="name" value={state.inputState.name} onChange={changeInput} />
      번호:
      <input type="text" name="phone" value={state.inputState.phone} onChange={changeInput} />
      <button onClick={addPhone}>저장</button>
      <div>
        <List book={book} deletePhone={deletePhone} />
      </div>
    </div>
  );
};

export default BookOriginal;
