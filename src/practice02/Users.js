import React, { useState, useEffect } from "react";
import axios from "axios";

const Users = () => {
  const [todos, setTodos] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setTodos(null);
        setError(null);
        setLoading(true);
        const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
        setTodos(response.data);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    fetchTodos();
  }, []);

  if (loading)
    return (
      <div className="ui segment">
        <div className="ui active dimmer">
          <div className="ui massive text loader">Loading</div>
        </div>
        <p></p>
        <p></p>
        <p></p>
      </div>
    );
  if (error) return <div>에러가 발생했습니다.</div>;
  if (!todos) return null;

  return (
    <>
      <h2>todo list api practice</h2>
      <ul className="ui list">
        {todos.map((todo) => (
          <div key={todo.id} className="item">
            {todo.id} : {todo.title}
          </div>
        ))}
      </ul>
    </>
  );
};
export default Users;
