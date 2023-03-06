import useGetTodos from 'models/todos/useGetTodos';

export default function Home() {
    const { loading, error, data } = useGetTodos();

    if (loading)
        return (
            <div className="font-mono min-h-screen max-w-full flex items-center justify-center">
                <p>Loading...</p>
            </div>
        );

    if (error)
        return (
            <div className="font-mono min-h-screen max-w-full flex items-center justify-center">
                <p>Error : {error.message}</p>
            </div>
        );

    return (
        <div className="font-mono min-h-screen max-w-full flex items-center justify-center flex-col">
            <header className="h-40 text-center">
                <h1 className="font-bold text-4xl [line-height:160px]">React-GraphQL</h1>
            </header>
            <main>
                <ul className="list-none">
                    {data?.todos?.data?.map((d: any) => (
                        <li key={d?.id} className="text-lg border border-black rounded-md p-5 mb-2.5">
                            {d?.id}.<span className="font-semibold">{d?.title}</span>
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    );
}
