import { Route, Routes, BrowserRouter } from "react-router-dom"
import { MainPage, ComicsPage, Page404, SingleComicPage } from '../Pages'

import AppHeader from "../AppHeader"

const App = () => {

    return (
        <BrowserRouter>
            <div className="app">
                <AppHeader />
                <main>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="comics" element={<ComicsPage />} />
                        <Route path="/comics/:comicId" element={<SingleComicPage />} />
                        <Route path="*" element={<Page404 />} />
                    </Routes>

                </main>
            </div>
        </BrowserRouter>
    )
}


export default App