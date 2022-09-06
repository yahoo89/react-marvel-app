import { Component } from "react"

import AppHeader from "../AppHeader"
import RandomChar from "../RandomChar"
import CharList from "../CharList"
import CharInfo from "../CharInfo"

import decoration from '../../resources/img/vision.png'
import ErrorBoundary from "../ErrorBoundary"

class App extends Component {

    state = {
        selectedChar: null
    }

    onCharSelected = (id) => {
        this.setState({
            selectedChar: id
        })
    }

    render() {
        return (
            <div className="app">
                <AppHeader />
                <main>
                    <RandomChar />
                    <div className="char__content">
                        <CharList onCharSelected={this.onCharSelected} />
                        <ErrorBoundary>
                            <CharInfo charId={this.state.selectedChar} />
                        </ErrorBoundary>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision" />
                </main>
            </div>
        )
    }
}

export default App