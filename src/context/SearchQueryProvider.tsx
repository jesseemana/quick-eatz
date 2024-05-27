import { createContext, useContext, useState } from 'react';

export type SearchState = {
  searchQuery: string,
  page: number,
  selectedCuisines: string[],
  sortOption: string,
};

type SearchQueryProviderState = {
  searchState: SearchState,
  setSearchState: React.Dispatch<React.SetStateAction<SearchState>>,
};

const initialState: SearchQueryProviderState = {
  searchState: {
    searchQuery: '',
    page: 1,
    selectedCuisines: [],
    sortOption: 'bestMatch',
  },
  setSearchState: () => null,
};

const SearchQueryProviderContext = createContext<SearchQueryProviderState>(initialState);

export const SearchStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: '',
    page: 1,
    selectedCuisines: [],
    sortOption: 'bestMatch'
  });

  return (
    <SearchQueryProviderContext.Provider value={{ searchState, setSearchState }}>
      {children}
    </SearchQueryProviderContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSearchState = () => {
  const context = useContext(SearchQueryProviderContext);
  return context;
}
