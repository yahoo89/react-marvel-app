import { useState } from "react"

import AppHeader from "../AppHeader"
import RandomChar from "../RandomChar"
import CharList from "../CharList"
import CharInfo from "../CharInfo"

import decoration from '../../resources/img/vision.png'
import ErrorBoundary from "../ErrorBoundary"

const App = () => {

    const [selectedChar, setChar] = useState(null)

    const onCharSelected = (id) => {
        setChar(id)
    }

    return (
        <div className="app">
            <AppHeader />
            <main>
                <RandomChar />
                <div className="char__content">
                    <CharList onCharSelected={onCharSelected} />
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar} />
                    </ErrorBoundary>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision" />
            </main>
        </div>
    )
}


export default App