import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

export const Navbar = ({ search, setSearch, data, setData }) => {
    // Initialize originalData state with the initial data received via props
    const [originalData] = useState(data);

    // Function to handle search based on the input query
    const handleSearch = () => {
        // If the search query is empty, reset data to the original data set
        if (search.trim() === '') {
            setData(originalData);
            return;
        }

        // Create a regular expression for case-insensitive search
        const regex = new RegExp(search, 'i');

        // Filter the original data based on the search query
        const updatedData = originalData.filter((item) => {
            if (item.currencies && typeof item.currencies === 'object') {
                const currencies = Object.keys(item.currencies);
                return currencies.some((currency) => regex.test(currency));
            }
            return false;
        });

        // Updating  the data state with the filtered data
        setData(updatedData);
    };

    // Using useEffect to debounce the search operation.
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            handleSearch();
        }, 600);

        // Cleanup function to clear the timeout on component unmount or when search query changes.
        return () => clearTimeout(delayDebounceFn);
    }, [search, originalData, setData]);

    
    return (
        <div className='nav'>
            <input
                type='text'
                placeholder='Enter the Currency'
                width={"200px"}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <FontAwesomeIcon icon={faMagnifyingGlass} onClick={handleSearch} className='search-icon' />
        </div>
    );
};
