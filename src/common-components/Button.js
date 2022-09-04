

const Button = ({ title, href, customClass, func }) => {
  return (
    <>
      {
        href ?
          <a
            href={href}
            className={`button ${customClass}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="inner">{title}</div>
          </a >
          : (
            <button
              className={`button ${customClass}`}
              onClick={func}
            >
              <div className="inner">{title}</div>
            </ button>
          )
      }

    </>
  )
}

export default Button