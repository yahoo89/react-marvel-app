import { useState, useEffect } from 'react'

import MarvelService from '../../services/MarvelServices'
import Button from '../../common-components/Button'
import Spinner from '../Spinner'
import ErrorMessage from '../ErrorMessage/ErrorMessage'

import './randomChar.scss'
import mjolnir from '../../resources/img/mjolnir.png'

const RandomChar = () => {

    const [char, setChar] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const marvelService = new MarvelService()

    useEffect(() => {
        updateChar()
        const timerId = setInterval(updateChar, 60000)

        return () => {
            clearInterval(timerId)
        }
    }, [])

    const onCharLoaded = (char) => {
        setLoading(false)
        setChar(char)
    }
    const onCharLoading = () => {
        setLoading(true)
    }

    const onError = () => {
        setError(true)
        setLoading(false)
    }

    const updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        onCharLoading()
        marvelService
            .getCharacter(id)
            .then(onCharLoaded)
            .catch(onError)
    }

    const errorMessage = error ? <ErrorMessage /> : null
    const spinner = loading ? <Spinner /> : null
    const content = !(loading || error) ? <View char={char} /> : null

    return (
        <div className="randomchar" >
            {errorMessage}
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <Button
                    title="try it"
                    customClass="button__main"
                    func={updateChar}
                />
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
            </div>
        </div>
    )

}

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki } = char
    let imgStyle = { 'objectFit': 'cover' }
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = { 'objectFit': 'contain' }
    }

    return (
        <div className="randomchar__block">
            <img
                src={thumbnail}
                className="randomchar__img"
                style={imgStyle}
                alt="Random character"
            />
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
    )
}

export default RandomChar