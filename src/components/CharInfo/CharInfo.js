import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import MarvelService from '../../services/MarvelServices'
import ErrorMessage from '../ErrorMessage'
import Spinner from '../Spinner'
import Skeleton from '../Skeleton'
import Button from '../../common-components/Button'

import './charInfo.scss'

const CharInfo = (props) => {

    const [char, setChar] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const marvelService = new MarvelService()

    useEffect(() => {
        updateChar()
    }, [props.charId])

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
        const { charId } = props
        if (!charId) {
            return
        }

        onCharLoading()
        marvelService
            .getCharacter(charId)
            .then(onCharLoaded)
            .catch(onError)
    }

    const skeleton = char || loading || error ? null : <Skeleton />
    const errorMessage = error ? <ErrorMessage /> : null
    const spinner = loading ? <Spinner /> : null
    const content = !(loading || error || !char) ? <View char={char} /> : null

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = char
    let imgStyle = { 'objectFit': 'cover' }
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = { 'objectFit': 'contain' }
    }
    return (
        <>
            <div className="char__basics">
                <img
                    style={imgStyle}
                    src={thumbnail}
                    alt={`${name}`}
                />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <Button
                            title="homepage"
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
            <div className="char__descr">
                {description}
            </div>
            {
                comics.length > 0 ?
                    <>
                        <div className="char__comics">Comics:</div>
                        <ul className="char__comics-list">
                            {
                                comics.map(({ name }, i) => {
                                    if (i > 9) {
                                        return
                                    }
                                    return (
                                        <li key={i} className="char__comics-item" >
                                            {name}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </>
                    : <h2>This hero does not have comics</h2>
            }
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo