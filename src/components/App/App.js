import { lazy, Suspense } from "react"
import { Route, Routes, BrowserRouter } from "react-router-dom"

import AppHeader from "../AppHeader"
import Spinner from "../Spinner"

const Page404 = lazy(() => import('../Pages/404'))
const MainPage = lazy(() => import('../Pages/MainPage'))
const ComicsPage = lazy(() => import('../Pages/ComicsPage'))
const SingleComicPage = lazy(() => import('../Pages/SingleComicPage'))

const App = () => {

    return (
        <BrowserRouter>
            <div className="app">
                <AppHeader />
                <main>
                    <Suspense fallback={<Spinner />}>
                        <Routes>
                            <Route path="/" element={<MainPage />} />
                            <Route path="comics" element={<ComicsPage />} />
                            <Route path="/comics/:comicId" element={<SingleComicPage />} />
                            <Route path="*" element={<Page404 />} />
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </BrowserRouter>
    )
}


export default App