import './charList.scss'
import abyss from '../../resources/img/abyss.jpg'
import Button from '../../common-components/Button'

const CharList = () => {
    return (
        <div className="char__list">
            <ul className="char__grid">
                <li className="char__item">
                    <img src={abyss} alt="abyss" />
                    <div className="char__name">Abyss</div>
                </li>
                <li className="char__item char__item_selected">
                    <img src={abyss} alt="abyss" />
                    <div className="char__name">Abyss</div>
                </li>
                <li className="char__item">
                    <img src={abyss} alt="abyss" />
                    <div className="char__name">Abyss</div>
                </li>
                <li className="char__item">
                    <img src={abyss} alt="abyss" />
                    <div className="char__name">Abyss</div>
                </li>
                <li className="char__item">
                    <img src={abyss} alt="abyss" />
                    <div className="char__name">Abyss</div>
                </li>
                <li className="char__item">
                    <img src={abyss} alt="abyss" />
                    <div className="char__name">Abyss</div>
                </li>
                <li className="char__item">
                    <img src={abyss} alt="abyss" />
                    <div className="char__name">Abyss</div>
                </li>
                <li className="char__item">
                    <img src={abyss} alt="abyss" />
                    <div className="char__name">Abyss</div>
                </li>
                <li className="char__item">
                    <img src={abyss} alt="abyss" />
                    <div className="char__name">Abyss</div>
                </li>
            </ul>
            <Button
                title="load more"
                customClass="button__main button__long"
            />
        </div>
    )
}

export default CharList