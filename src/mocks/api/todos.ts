import { graphql } from 'msw';

import { todoList } from 'mocks/api/data/todos';

const handlers = [
    graphql.query('GetTodos', (req, res, ctx) => {
        return res(ctx.data(todoList));
    })
];

export default handlers;
