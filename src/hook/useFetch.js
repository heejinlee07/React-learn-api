import { useReducer, useEffect } from "react";
import { initialState, reducer } from "../reducer/bookReducer";
import { bookApi } from "../api";

// 즉, Book.js에서 우리가 커스텀훅을 선언할 때, false를 커스텀 훅에 넘겨줌으로써 처음부터 바로 불러오지 않고,
// 특정 시점에 fetchData 함수를 실행 시켰을 때 데이터를 불러올 수 있게 할 수 있습니다.
const useFetch = (wait = true) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const fetchData = async () => {
    dispatch({ type: "LOADING" });
    try {
      const bookData = await bookApi.getBook();
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
  const addPhone = async () => {
    try {
      const date = new Date();
      const newPhone = {
        id: date.getTime(),
        name: state.inputState.name,
        phone: state.inputState.phone,
      };
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

  const changeInput = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "CHANGE_INPUT", name: name, value: value });
  };
  //전체 데이터를 건드리지 않고 필요한 부분만 렌더링 하고 싶을 때 사용
  //커스텀훅을 선언할 때, false를 커스텀 훅에 넘겨줌으로써 처음부터 바로 불러오지 않고,
  //wait일 때 불러온다.
  useEffect(() => {
    if (wait) return;
    fetchData();
  }, []);
  return [state, fetchData, addPhone, deletePhone, changeInput];
};

export default useFetch;
