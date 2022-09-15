import { useHttp } from '../hooks/http.hook'


const useMarvelService = () => {
  const { loading, request, error, clearError } = useHttp()

  const _apiBase = 'https://gateway.marvel.com:443/v1/public/'
  const _apiKey = 'apikey=4f05a8abecdff647b362096bc05000d9'
  const _baseOffset = 210

  const getAllCharacters = async (offset = _baseOffset) => {
    const result = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`)
    return result.data.results.map(_transformCharacter)
  }

  const getCharacter = async (id) => {
    const result = await request(`${_apiBase}characters/${id}?${_apiKey}`)
    return _transformCharacter(result.data.results[0])
  }

  const _transformCharacter = (char) => {
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

  return { loading, error, clearError, getAllCharacters, getCharacter }
}

export default useMarvelService