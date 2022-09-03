class MarvelService {

  _apiBase = 'https://gateway.marvel.com:443/v1/public/'
  _apiKey = 'apikey=4f05a8abecdff647b362096bc05000d9'
  _baseOffset = 210

  getResource = async (url) => {
    let res = await fetch(url)

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`)
    }

    return await res.json()
  }

  // getAllCharacters = async (offset = this._baseOffset) => {
  //   const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`)
  //   return res.data.results.map(this._transformCharacter)
  // }
  getAllCharacters = () => {
    return this.getResource(`${this._apiBase}characters?${this._apiKey}`)
  }
}

export default MarvelService