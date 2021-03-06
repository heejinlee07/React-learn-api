import axios from "axios";

//기본 axios 옵션 구성을 합니다.
const api = axios.create({
  //host 부분엔 api 기본 주소 예컨대 뒤에 / 쓰기전의 endpoint를 넣습니다.
  host: "",
  // params엔 api 사용시 꼭 필요한 옵션 인자들이 있다면 사용합니다.
  // params: { api_key: "10923b261b148314a3f", language: "en-US" }
});

//도메인 별로 api를 구성하여 이용할 준비를 합니다.
export const bookApi = {
  //axios 사용방법에 따라 get 방식인지 post 방식인지 구분이 가능하게 정의할 수 있습니다.
  //get,post의 두번째 인자는 응답 옵션입니다.
  getBook: () => api.get("/book", { responseType: "json" }),
  //post의 두번째 인자는 넘겨줄 데이터입니다 === body 데이터
  addBook: (newPhone) => api.post(`/book`, newPhone),
  deleteBook: (id) => api.delete(`/book/${id}`),
  // addBook: (newPhone) =>
  //   api.post(`/book`, newPhone).then((r) => {
  //     return r;
  //   }),
  // deleteBook: (id) =>
  //   api.delete(`/book/${id}`).then((r) => {
  //     return r;
  //   }),
};

/*
  NOTE:
기본사용방법
import axios from 'axios';

데이터를 조회 할 때
axios.get('/users/1');

데이터를 추가/수정/삭제 할 때
axios.post('/users', {
  username: 'blabla',
  name: 'blabla'
});
 */
