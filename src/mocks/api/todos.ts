import { graphql } from 'msw';

import { todoList } from 'mocks/api/data/todos';

const handlers = [
    graphql.query('GetTodos', (req, res, ctx) => {
        return res(ctx.data(todoList));
    }),
    graphql.mutation('CreateTodo', (req, res, ctx) => {
        const { todo, image } = req.variables.input;
        const currentList = JSON.parse(localStorage.getItem('todo') || '[]');

        return res(ctx.data({ id: currentList.length + 1, todo, image }));
    })
];

export default handlers;
