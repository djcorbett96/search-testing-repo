import {
  AppliedFilters,
  ApplyFiltersButton,
  Facets,
  FilterSearch,
  Geolocation,
  OnSelectParams,
  ResultsCount,
  SearchBar,
  SpellCheck,
  StandardCard,
  VerticalResults,
  onSearchFunc,
  UniversalResults,
  NumericalFacet,
} from '@yext/search-ui-react';
import React, { useEffect, useState } from 'react';
import {
  LocationBiasMethod,
  SelectableStaticFilter,
  useSearchActions,
  useSearchState,
} from '@yext/search-headless-react';

export default function Search(): JSX.Element {
  const searchActions = useSearchActions();
  const [isProductSearch, setIsProductSearch] = useState(false);
  const verticalInfo = useSearchState((state) => state.universal.verticals);

  const onSearchFunc: onSearchFunc = (searchEventData) => {
    setIsProductSearch(false);
    const { query } = searchEventData;
    searchActions.setUniversal();
    searchActions.setQuery(query);
    searchActions.executeUniversalQuery();
  };

  useEffect(() => {
    const firstVertical = verticalInfo ? verticalInfo[0]?.verticalKey : null;
    if (firstVertical === 'products') {
      setIsProductSearch(true);
      searchActions.setVertical('products');
      searchActions.executeVerticalQuery();
    }
  }, [verticalInfo]);

  // const onSearchFunc: onSearchFunc = (searchEventData) => {
  //   const { query } = searchEventData;
  //   searchActions.setQuery(query);
  //   // searchActions.setLocationRadius(160934);
  //   searchActions.executeVerticalQuery();
  // };

  // const handleClickMagnifier = () => {
  //   const queryParams = new URLSearchParams(window.location.search);
  //   const inputElement = document.querySelector('input');
  //   const inputNativeValue = inputElement?.value;

  //   searchActions.setQuery(inputNativeValue || '');
  //   searchActions.executeVerticalQuery();
  // };

  return (
    <section className="py-10 max-w-7xl mx-auto flex flex-col w-full px-4">
      {/* <div className="flex gap-2 items-center w-full">
        <FilterSearch
          searchFields={[
            { fieldApiName: 'builtin.location', entityType: 'location' },
          ]}
          onSelect={handleFilterSelect}
          customCssClasses={{
            filterSearchContainer: 'w-full mb-0',
            inputElement: 'h-12 border border-black',
          }}
        />
        <button
          onClick={handleClickMagnifier}
          className="border h-12 px-4 rounded-md border-black"
        >
          Search
        </button>
      </div> */}
      <SearchBar
        onSearch={onSearchFunc}
        //   customCssClasses={{
        //     searchBarContainer: 'SearchBar-container',
        //     inputElement: 'py-4',
        //   }}
      />
      <AppliedFilters />
      {/* <ResultsCount /> */}
      <div className="flex flex-col gap-4">
        {isProductSearch && (
          <>
            <div className="flex gap-4">
              <Facets customCssClasses={{ facetsContainer: 'flex flex-col' }} />
              <VerticalResults
                CardComponent={StandardCard}
                displayAllOnNoResults={false}
                customCssClasses={{ verticalResultsContainer: 'w-full' }}
              />
            </div>
          </>
        )}
        {!isProductSearch && (
          <>
            <UniversalResults verticalConfigMap={{}} />
          </>
        )}
      </div>
    </section>
  );
}
