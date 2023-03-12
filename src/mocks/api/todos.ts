import { graphql } from 'msw';
import { v4 as uuidv4 } from 'uuid';

import { todoList } from 'mocks/api/data/todos';

const handlers = [
    graphql.query('GetTodos', (req, res, ctx) => {
        return res(ctx.data(todoList));
    }),
    graphql.mutation('CreateTodo', (req, res, ctx) => {
        const { title, description, image } = req.variables.input;
        return res(
            ctx.data({
                todo: {
                    __typename: 'Todo',
                    id: uuidv4(),
                    title,
                    description,
                    image,
                    isCompleted: false,
                    tag: 'GraphQL'
                }
            })
        );
    })
];

export default handlers;
