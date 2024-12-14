"use client";

import React, { useEffect, useState, useContext} from "react";
import { services } from "./services"; // Ensure this is correctly imported and structured.
import { SearchContext, useSearch } from "./search-context"; // Galing sa Step 2

interface Service {
    name: string;
    category: string;
    inclusion: { name: string }[]; 
    doctor?: string; 
    schedule?: string; 
}

export default function ServiceSelection() {
    // Step 4: Kunin yung search term gamit ang context
    const { searchTerm } = useContext(SearchContext);

    // State Management
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const [filteredServices, setFilteredServices] = useState(services);

    // Available Filters
    const filters: string[] = ["All", "Lab Test", "Package", "Consultation"];

    // Handles filter button clicks
    const handleFilterButtonClick = (selectedCategory: string) => {
        if (selectedCategory === "All") {
            setSelectedFilters([]); // Reset filters
        } else {
            setSelectedFilters([selectedCategory]); // Apply selected filter
        }
    };

    // Effect to apply filtering when `selectedFilters` or `searchTerm` changes
    useEffect(() => {
        filterServices();
    }, [selectedFilters, searchTerm]);

    // Filters the services based on the selected category or search term
    const filterServices = () => {
        let tempServices = services;

        // **Step 4**: Apply search filter if searchTerm exists
        if (searchTerm) {
            tempServices = tempServices.filter((item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (item.inclusion && item.inclusion.some((test) =>
                  test.toLowerCase().includes(searchTerm.toLowerCase()))) ||
                item.category.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply category filter
        if (selectedFilters.length > 0) {
            tempServices = tempServices.filter(
                (item) => item.category === selectedFilters[0]
            );
        }

        setFilteredServices(tempServices);
    };

    const [expandedItem, setExpandedItem] = useState<Service | null>(null);

    const { setSearchTerm } = useSearch();


    const [selectedServices, setSelectedServices] = useState<string[]>([]);

    function handleAddServices(service: string) {
        setSelectedServices((prevServices) => {
          if (!prevServices.includes(service)) {
            return [...prevServices, service]; 
          }
          return prevServices;
        });
      }

    function handleRemoveServices(index) {
        setSelectedServices((prev) =>
            prev.filter((_, idx) => idx !== index)
        );
    }

    function handleRemoveAllServices(){
        setSelectedServices([]);
    }

    return (
        <div className="flex flex-col bg-[#D9D9D9] justify-center items-center mb-10">
            <div className="flex flex-row mt-20">
                <h1 className="text-5xl font-bold mb-4 text-[#253369]">Services Offered</h1>
            </div>

            <div className="flex flex-row min-h-max ">
            {/*Category Menu*/}
            <div className="category-container flex flex-col w-64 min-h-64 h-max mr-4 bg-[#12205D] p-10 space-y-1 rounded-xl">
                <input
                    type="text"
                    placeholder={`Search ${selectedFilters.length === 0 || selectedFilters.includes("All") ? "Services..." : `${selectedFilters[0]}...`}`}
                    className="px-4 py-2 text-black rounded-full shadow-lg mb-2"
                    onChange={(e) => {
                        setSearchTerm(e.target.value); 
                        setExpandedItem(null);
                    }}
                    // Update the search term
                />
                <div>
                {filters.map((category, idx) => (
                    <button
                        key={`filters-${idx}`}
                        onClick={() => {
                            handleFilterButtonClick(category);
                            setExpandedItem(null);
                        }}
                        className={`button ${
                            selectedFilters.includes(category) || (category === "All" && selectedFilters.length === 0)
                                ? "active text-white bg-blue-600"
                                : "text-blue-600 bg-[#D9D9D9]"
                        } px-4 py-2 rounded-xl hover:bg-blue-500 hover:transition-colors hover:duration-500 flex flex-col w-40 mb-1`}
                    >
                        {category}
                    </button>
                ))}
                </div>
            </div>

            {/*Results Section*/}
            <div id="results-section" className="w-[620px] min-h-full h-[447px] max-h-full overflow-y-auto overflow-x-hidden mr-4">
                {expandedItem === null ? (
                    // Normal Grid View
                    <div className="grid grid-cols-3 gap-4 auto-rows-[minmax(120px, 1fr)] w-[620px] mx-auto pr-4">
                        {filteredServices.map((item, idx) => (
                            <div
                                key={`services-${idx}`}
                                className="item relative flex flex-col items-start justify-start text-white bg-[#12205D] w-48 h-28 p-2 scrollbar-hide shadow-md p-2"
                            >
                                <p className="item-name font-bold text-lg">{item.name}</p>
                                <p className="category text-sm">{item.category}</p>
                                <button
                                    className="absolute bottom-2 right-2 bg-white text-[#253369] text-sm px-3 py-1 rounded-full hover:bg-blue-600 hover:text-white"
                                    onClick={() => {
                                        setExpandedItem(item);
                                        //setSelectedFilters([item.category]);
                                    }}
                                >
                                    View More
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    // Expanded Item View
                    <div className="flex flex-col items-center justify-center w-full min-h-full max-h-full bg-[#253369] text-white p-8 rounded-lg shadow-lg">
                        <button
                            className="self-end bg-red-500 text-white px-4 py-2 rounded-full"
                            onClick={() => setExpandedItem(null)} // Collapse back to grid
                        >
                            X
                        </button>

                        <h2 className="text-2xl font-bold mb-4">{expandedItem.name}</h2>
                        <h2 className="text-xl mb-4">{expandedItem.category}</h2>
                        {expandedItem.category === "Lab Test" ? (
                            // Lab Test
                            <div className="grid grid-cols-3 gap-4 auto-rows-[minmax(120px, 1fr)] mx-auto">
                                {expandedItem.inclusion.map((test, index) => (
                                    <div
                                        key={index}
                                        className="text-center bg-white text-black p-4 rounded w-44 shadow"
                                    >
                                        <p>{test}</p>
                                        <button onClick={() => handleAddServices(test)}>
                                        Add
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : expandedItem.category === "Package" ? (
                            // Package
                            <div>
                            <ul className="list-disc list-inside px-20">
                                {expandedItem.inclusion.map((test, index) => (
                                    <li key={index} className="p-2">
                                        {test}
                                    </li>
                                ))}
                            </ul>
                            <button onClick={() => handleAddServices(expandedItem.name)}>
                            Add
                            </button>
                            </div>
                        ) : (
                            // Consultation
                            <div>
                                <p>Doctor: {expandedItem.doctor}</p>
                                <p>Schedule: {expandedItem.schedule}</p>
                                <button onClick={() => handleAddServices(expandedItem.name)}>
                                Add
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/*Selected Service List*/}
            <div className="Selected-list relative flex flex-col items-center bg-[#12205D] w-72 max-h-96 rounded-xl pb-4 mr-4 overflow-y-auto">
                <h2 className="text-white font-bold text-xl p-4">Selected Services</h2>
                <ul className="pb-2">
                    {selectedServices.map((service, index) =>
                    <li key={index} className="text-[#253369] bg-white rounded-xl px-4 py-2 w-60 mb-1 items-center flex justify-between">
                        <span>{service}</span>
                        <button onClick={() => handleRemoveServices(index)} className="text-red-500 font-bold">
                            x
                        </button>
                    </li>
                    )}
                </ul>
                <div className="flex justify-end w-full px-4 mt-auto">
                    <button className="mt-2 text-white px-4 py-2 hover:bg-blue-600 hover:rounded-full text-sm" 
                            onClick={() => handleRemoveAllServices()}>
                        Remove All
                    </button>
                    <button className="mt-2 bg-white text-[#253369] hover:text-white px-4 py-2 rounded-full hover:bg-blue-600 text-sm">
                        Book
                    </button>
                </div>
            </div>

            </div>
        </div>
    );
}
