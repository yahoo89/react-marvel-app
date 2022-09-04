

const Button = ({ title, href, customClass }) => {
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
            <button className={`button ${customClass}`}            >
              <div className="inner">{title}</div>
            </ button>
          )
      }

    </>
  )
}

export default Button