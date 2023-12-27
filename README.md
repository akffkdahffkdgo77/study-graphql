<img src="https://capsule-render.vercel.app/api?section=header&type=waving&height=300&text=Study%20GraphQL&color=timeGradient&fontSize=90" alt="" />

## 프로젝트 실행
**node** 18.17.1

```
yarn install
yarn start
```

## 프로젝트 데모

<img width="500" alt="데모 - 리스트" src="https://github.com/akffkdahffkdgo77/study-graphql/assets/52883505/788359d1-1edc-4845-ae33-5b31114116f7">
<img width="500" alt="데모 - 등록" src="https://github.com/akffkdahffkdgo77/study-graphql/assets/52883505/c66c74db-f5db-45a6-8dde-23e765c21470">

## 비고
- 업무에서는 사용하지 않을 cache 등을 테스트 해봄
- type을 다 지정해주었지만 업무에서는 codegen을 사용

## TIL

## Set up

[참고](https://www.apollographql.com/docs/react/get-started)

### useQuery

[참고](https://www.apollographql.com/docs/react/data/queries#executing-a-query)

```ts
import { gql, useQuery } from '@apollo/client';

export const GET_TODOS = gql`
    query GetTodos() {
        todoList() {
            data {
                id
                title
                description
                image
                tag
            }
            totalCount
        }
    }
`;

export type TodoItemType = {
    id: string;
    title: string;
    description: string;
    image: string;
    isCompleted: boolean;
    tag: string;
};

export type DataType = {
    todoList: {
        data: TodoItemType[];
        totalCount: number;
    };
};

const useGetTodos = () => {
    return useQuery<DataType>(GET_TODOS);
};

export default useGetTodos;

```

### useMutation

[참고](https://www.apollographql.com/docs/react/data/mutations#executing-a-mutation)

```ts
import { gql, useMutation } from '@apollo/client';

const CREATE_TODO = gql`
    mutation CreateTodo($input: TodoInput) {
        todo(input: $input) {
            id
            title
            description
            image
            isCompleted
            tag
        }
    }
`;

type DataType = {
    todo: {
        id: string;
        title: string;
        description: string;
        image: string;
        isCompleted: boolean;
        tag: string;
    };
};

type VariablesType = {
    input: {
        title: string;
        description: string;
        image: string;
        tag: string;
    };
};

const useCreateTodo = () => {
    const result = useMutation<DataType, VariablesType>(CREATE_TODO, {
        update(cache, { data }) {
            cache.modify({
                fields: {
                    todoList(existingTodos = []) {
                        const newTodoRef = cache.writeFragment({
                            data: data?.todo,
                            fragment: gql`
                                fragment NewTodo on Todo {
                                    id
                                    title
                                    description
                                    image
                                    isCompleted
                                    tag
                                }
                            `
                        });

                        return {
                            ...existingTodos,
                            ...{
                                data: [...existingTodos.data, newTodoRef]
                            }
                        };
                    }
                }
            });
        }
    });

    return result;
};

export default useCreateTodo;

```

### Authentication

[참고](https://able.bio/AnasT/apollo-graphql-async-access-token-refresh--470t1c8)

## Resources

-   Images from [undraw.co](https://undraw.co/illustrations)
-   Photo by <a href="https://unsplash.com/@smpicturez?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Satyabratasm</a> on <a href="https://unsplash.com/photos/u_kMWN-BWyU?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
