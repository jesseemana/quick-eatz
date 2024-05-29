import { SearchForm } from '@/schemas/search';
import { createContext, useContext, useState } from 'react';

export type SearchState = {
  searchQuery: string,
  page: number,
  selectedCuisines: string[],
  sortOption: string,
};

type SearchQueryProviderState = {
  searchState: SearchState,
  handleSearch: (data: SearchForm) => void,
  setPage: (page: number) => void,
  setSelectedCuisines: (selectedCuisines: string[]) => void,
  setSortOption: (sortOption: string) => void,
  setSearchState: React.Dispatch<React.SetStateAction<SearchState>>,
};

const initialState: SearchQueryProviderState = {
  searchState: {
    searchQuery: '',
    page: 1,
    selectedCuisines: [],
    sortOption: 'bestMatch',
  },
  handleSearch: () => null,
  setPage: () => null,
  setSelectedCuisines: () => null,
  setSortOption: () => null,
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

  const setPage = (page: number) => {
    setSearchState(prev => ({
      ...prev,
      page,
    }))
  }

  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState(prev => ({
      ...prev,
      selectedCuisines,
      page: 1
    }))
  }

  const setSortOption = (sortOption: string) => {
    setSearchState(prev => ({
      ...prev,
      sortOption,
      page: 1,
    }))
  }

  const handleSearch = (data: SearchForm) => {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: data.searchQuery,
      page: 1
    }));
  }

  const values = { 
    searchState, 
    setSearchState,
    handleSearch, 
    setPage,
    setSortOption,
    setSelectedCuisines,
  }

  return (
    <SearchQueryProviderContext.Provider value={values}>
      {children}
    </SearchQueryProviderContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSearchState = () => {
  const context = useContext(SearchQueryProviderContext);
  return context;
}
