import * as React from 'react';
import { Searchbar } from 'react-native-paper';

const Search = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  return (
    <Searchbar
      placeholder="Search for a login"
      onChangeText={onChangeSearch}
      value={searchQuery}
      style={{  width: '90%', alignSelf:"center"}}
    />
  );
};

export default Search;