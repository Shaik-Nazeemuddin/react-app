import React from 'react';
import { use } from 'react';

function Comments({ fetchTodos }) {
    const todos = use(fetchTodos);
    return (
        <>
            <div className="custom-component">
                <h2>Use (Hook) - React 19</h2>

                {todos && todos.map((todo, index) => {
                    return (
                        <div key={index} style={{ textAlign: 'left', marginLeft: '50px' }}>
                            {index < 10 && (
                                <div>
                                    <p>{todo.id}, ( userId - {todo.userId} ) : {todo.title}</p>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </>
    )
}
export default Comments;
