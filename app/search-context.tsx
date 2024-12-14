"use client";

import React, { createContext, useState, useContext } from "react";

export const SearchContext = createContext({
  searchTerm: "",
  setSearchTerm: (term: string) => {},
});

// Provider component
export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};

// Custom hook for using search context
export const useSearch = () => useContext(SearchContext);
