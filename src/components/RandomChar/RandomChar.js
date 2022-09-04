import { Component } from 'react'
import './randomChar.scss'
import mjolnir from '../../resources/img/mjolnir.png'
import MarvelService from '../../services/MarvelServices'
import Button from '../../common-components/Button'

class RandomChar extends Component {

    constructor(props) {
        super(props)
        this.updateChar()
    }

    state = {
        char: {}
    }

    marvelService = new MarvelService()

    onCharLoaded = (char) => {
        this.setState({ char })
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded)
    }

    render() {
        const { char: { name, description, thumbnail, homepage, wiki } } = this.state
        return (
            <div className="randomchar" >
                <div className="randomchar__block">
                    <img src={thumbnail} alt="Random character" className="randomchar__img" />
                    <div className="randomchar__info">
                        <p className="randomchar__name">{name}</p>
                        <p className="randomchar__descr">{description}</p>
                        <div className="randomchar__btns">
                            <Button
                                title="Homepage"
                                href={homepage}
                                customClass="button__main"
                            />
                            <Button
                                title="Wiki"
                                href={wiki}
                                customClass="button__secondary"
                            />
                        </div>
                    </div>
                </div>
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br />
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
                </div>
            </div>
        )
    }
}

export default RandomChar