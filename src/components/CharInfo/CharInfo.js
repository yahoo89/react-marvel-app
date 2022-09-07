import './charInfo.scss'
import { Component } from 'react'
import PropTypes from 'prop-types'
import MarvelService from '../../services/MarvelServices'
import ErrorMessage from '../ErrorMessage'
import Spinner from '../Spinner'
import Skeleton from '../Skeleton'
import Button from '../../common-components/Button'

class CharInfo extends Component {

    state = {
        char: null,
        loading: false,
        error: false
    }

    marvelService = new MarvelService()

    componentDidMount() {
        this.updateChar()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar()
        }
    }

    onCharLoaded = (char) => {
        this.setState({ char, loading: false })
    }
    onCharLoading = () => {
        this.setState({ loading: true })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    updateChar = () => {
        const { charId } = this.props
        if (!charId) {
            return
        }

        this.onCharLoading()
        this.marvelService
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    render() {
        const { char, loading, error } = this.state

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