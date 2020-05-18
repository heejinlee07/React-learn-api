// App.js를 진입점으로 활용, 환경설정
// Book 컴포넌트는 화면을 그리는 역할.
import React from "react";
import { BookProvider } from "./Context/BookContext";
import Book from "./Book";

const App = () => {
  return (
    <BookProvider>
      <Book />
    </BookProvider>
  );
};

export default App;
