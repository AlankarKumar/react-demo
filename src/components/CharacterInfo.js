import React, { useState } from "react";
import { useEffect } from "react";
import CharacterCard from "./ChracterCard";
import "./CharacterInfo.css";
import SelectedFilters from "./SelectedFilter";
import SearchBar from "./SearchBar";

// const globalCharacters = [];
// let memoizedCharacterList = [];

const CharacterInfo = () => {
  const speciesfilter = ["Human", "Alien"];
  const genderfilter = ["Male", "Female"];
  const originfilter = [
    "Unknown",
    "Earth (C-137)",
    "Abadango",
    "Earth (Replacement Dimension)",
  ];



  const [searchQuery, setSearchQuery] = useState('');
  const [sortState,setSortState] = useState('default');
  const [characters, setCharacters] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [memoizedCharacterList, setmemoizedCharacterList] = useState(() => []);
  const [speciesCheckedState, setSpeciesCheckedState] = useState(
    new Array(speciesfilter.length).fill(false)
  );
  const [genderCheckedState, setGenderCheckedState] = useState(
    new Array(genderfilter.length).fill(false)
  );

  const [originCheckedState, setOriginCheckedState] = useState(
    new Array(originfilter.length).fill(false)
  );
  const [selectedFilters, setSelectedFilters] = useState([]);

  const filterCharacters = (category, filterType) => {
    const filteredCharacters = memoizedCharacterList.filter((character) => {
      if (filterType === "origin") {
        return character.origin.name.toLowerCase() === category.toLowerCase();
      }
      return character[filterType].toLowerCase() === category.toLowerCase();
    });
    return filteredCharacters;
  };

  const handleSortChange = (e) => {
    setSortState(e.target.value)
  };

  useEffect(()=>{
      if(sortState === 'ascending'){

          setCharacters([...characters.sort((a,b)=> a.id - b.id)])
      }else {
        setCharacters([...characters.sort((a,b)=> b.id - a.id)])

      }
  },[sortState]);


  useEffect(() => {
    let speciesSelections = [];
    speciesCheckedState.forEach((item, index) => {
      if (item) speciesSelections.push(speciesfilter[index]);
    });

    let genderSelections = [];
    genderCheckedState.forEach((item, index) => {
      if (item) genderSelections.push(genderfilter[index]);
    });

    let originSelections = [];
    originCheckedState.forEach((item, index) => {
      if (item) originSelections.push(originfilter[index]);
    });

    const selections = [
      ...speciesSelections,
      ...genderSelections,
      ...originSelections,
    ];
    setSelectedFilters(selections);
  }, [speciesCheckedState, genderCheckedState, originCheckedState]);

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character/")
      .then((res) => res.json())
      .then((data) => {
        setIsLoaded(true);
        setCharacters(data.results);
        setmemoizedCharacterList(data.results);
      });
  }, []);

  const handleSelection = (position, filterType) => {
    switch (filterType) {
      case "species": {
        const updatedCheckedState = speciesCheckedState.map((item, index) =>
          index === position ? !item : item
        );
        setSpeciesCheckedState(updatedCheckedState);
        break;
      }
      case "gender": {
        const updatedCheckedState = genderCheckedState.map((item, index) =>
          index === position ? !item : item
        );
        setGenderCheckedState(updatedCheckedState);
        break;
      }
      case "origin": {
        const updatedCheckedState = originCheckedState.map((item, index) =>
          index === position ? !item : item
        );
        setOriginCheckedState(updatedCheckedState);
        break;
      }
      default: {
      }
    }
  };

  useEffect(() => {
    if (speciesCheckedState.every((currentValue) => currentValue === false)) {
      const updatedCharactersList = [...memoizedCharacterList];
      setCharacters(updatedCharactersList);
    } else {
      const updatedCharactersList = speciesCheckedState.reduce(
        (acc, curr, index) => {
            acc = [...acc, ...filterCharacters(speciesfilter[index], "species")];
            return acc;
        },
        []
      );

    //   const updatedCharacterList = []
    //   speciesCheckedState.forEach((item,index)=> {
    //     if(item){
    //         updatedCharacterList.push()
    //     }
    //   })
      setCharacters(updatedCharactersList);
    }
  }, [speciesCheckedState]);

  useEffect(() => {
    if (genderCheckedState.every((currentValue) => currentValue === false)) {
      const updatedCharactersList = [...memoizedCharacterList];
      setCharacters(updatedCharactersList);
    } else {
      const updatedCharactersList = genderCheckedState.reduce(
        (acc, curr, index) => {
          acc = [...acc, ...filterCharacters(genderfilter[index], "gender")];
          return acc;
        },
        []
      );
      setCharacters(updatedCharactersList);
    }
  }, [genderCheckedState]);


  useEffect(()=> {
    setCharacters([...characters.filter((character) => character.name.includes(searchQuery))]);
  },[searchQuery]);

  useEffect(() => {
    if (originCheckedState.every((currentValue) => currentValue === false)) {
      const updatedCharactersList = [...memoizedCharacterList];
      setCharacters(updatedCharactersList);
    } else {
      const updatedCharactersList = originCheckedState.reduce(
        (acc, curr, index) => {
          acc = [...acc, ...filterCharacters(originfilter[index], "origin")];
          return acc;
        },
        []
      );
      setCharacters(updatedCharactersList);
    }
  }, [originCheckedState]);

  if (!isLoaded) {
    return <div>.....</div>;
  } else {
    return (
      <div className="CharacterInfo-parent-container">
        <div className="CharacterInfo-filter-parent">
          <h2>Filters</h2>
          <div className="CharacterInfo-filter">
            <h3>Species</h3>
            {speciesfilter.map((filterName, index) => {
              return (
                <div>
                  <label htmlFor={filterName} key={index}>
                    <input
                      type="checkbox"
                      name={filterName}
                      onChange={() => handleSelection(index, "species")}
                      checked={speciesCheckedState[index]}
                    />
                    {filterName}
                  </label>
                </div>
              );
            })}
          </div>
          <div className="CharacterInfo-filter">
            <h3>Gender</h3>
            {genderfilter.map((filterName, index) => {
              return (
                <div>
                  <label htmlFor={filterName} key={index}>
                    <input
                      type="checkbox"
                      name={filterName}
                      onChange={() => handleSelection(index, "gender")}
                      checked={genderCheckedState[index]}
                    />
                    {filterName}
                  </label>
                </div>
              );
            })}
          </div>
          <div className="CharacterInfo-filter">
            <h3>Origin</h3>
            {originfilter.map((filterName, index) => {
              return (
                <div>
                  <label htmlFor={filterName} key={index}>
                    <input
                      type="checkbox"
                      name={filterName}
                      onChange={() => handleSelection(index, "origin")}
                      checked={originCheckedState[index]}
                    />
                    {filterName}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <SelectedFilters filters={selectedFilters} />
          <div className="CharacterInfo-search-select-container">
          <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
          <select value={sortState} onChange={handleSortChange}>
              <option value="default" disabled hidden>Sort By id</option>
              <option value="ascending">Ascending</option>
              <option value="descending">Descending</option>
          </select>
          </div>
          <div className="CharacterInfo-container">
            {characters.map((character) => (
              <div key={character.id}>
                <CharacterCard character={character}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default CharacterInfo;
