import { graphql } from 'msw';
import { v4 as uuidv4 } from 'uuid';

import { todoList } from 'mocks/api/data/todos';

const handlers = [
    graphql.mutation('RefreshToken', (req, res, ctx) => {
        return res(
            ctx.data({
                refreshToken: {
                    refreshToken: uuidv4(),
                    accessToken: uuidv4()
                }
            })
        );
    }),
    graphql.query('GetTodos', (req, res, ctx) => {
        // Token이 없다면
        if (!req.headers.get('authorization')) {
            return res(ctx.errors([{ extensions: { code: 'UNAUTHENTICATED' }, message: 'Unauthorized' }]));
        }
        return res(ctx.data(todoList));
    }),
    graphql.mutation('CreateTodo', (req, res, ctx) => {
        // Token이 없다면
        if (!req.headers.get('authorization')) {
            return res(ctx.errors([{ extensions: { code: 'UNAUTHENTICATED' }, message: 'Unauthorized' }]));
        }

        const { title, description, image, tag } = req.variables.input;
        return res(
            ctx.data({
                todo: {
                    __typename: 'Todo',
                    id: uuidv4(),
                    title,
                    description,
                    image,
                    isCompleted: false,
                    tag
                }
            })
        );
    })
];

export default handlers;
