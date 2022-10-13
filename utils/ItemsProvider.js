import {View, Text} from 'react-native';
import React, {createContext, useContext, useState} from 'react';

const ItemContext = createContext();

export default function ItemsProvider({children, ...props}) {
  const [data, setData] = useState({
    items: [],
    drafts: [],
  });

  return (
    <ItemContext.Provider value={[data, setData]} {...props}>
      {children}
    </ItemContext.Provider>
  );
}

export function useItem() {
  const theme = useContext(ItemContext);
  if (theme === undefined) throw new Error('must be within ItemContext');
  return theme;
}
