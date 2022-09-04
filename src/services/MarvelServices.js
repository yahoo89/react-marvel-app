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

  getAllCharacters = async () => {
    const result = await this.getResource(`${this._apiBase}characters?limit=9&offset=${this._baseOffset}&${this._apiKey}`)
    return result.data.results.map(this._transformCharacter)
  }

  getCharacter = async (id) => {
    const result = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`)
    return this._transformCharacter(result.data.results[0])
  }

  _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items
    }
  }
}

export default MarvelService