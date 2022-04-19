import { useState } from 'react'

export default function SearchBar(props) {
  const [search, setSearch] = useState('');

  function localChange (e) {
      setSearch(e.target.value)
      props.searchChange(search)
  }

  return (
    <>
      <input type="text" value={search} onChange={localChange} />
    </>
  )
}
