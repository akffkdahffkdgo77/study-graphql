import { BrowserRouter, Routes, Route } from 'react-router-dom';

import BaseLayout from 'layouts/BaseLayout';
import Home from 'pages/Home';

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<BaseLayout />}>
                    <Route index element={<Home />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
