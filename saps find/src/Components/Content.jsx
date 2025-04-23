import {useState, useEffect} from 'react';
import axios from 'axios';
import '../Components/Content.css';

function Content() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20; // Number of cards per page

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get('https://tut-puppeteer.onrender.com/wantedPersonell');
                setData(response.data);
            } catch (err) {
                console.log("Err ", err);
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();
    }, [])

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    }

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    }

    const filteredOptionData = selectedOption
        ? data.filter((item) => item.crime === selectedOption) : data; 

    const handleButtonClick = (url) => {
        window.location.href = url;
    }

    // Calculate pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const filteredData = filteredOptionData.filter((item) => {
        return search.toLowerCase() === '' ? item : item.name.toLowerCase().includes(search);
    });
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setLoading(true);
        setCurrentPage(pageNumber);
        // Simulate loading delay
        setTimeout(() => setLoading(false), 500);
    };

    const renderPaginationButtons = () => {
        const buttons = [];
        
        if (totalPages <= 6) {
            // If total pages are 6 or less, show all numbers
            for (let i = 1; i <= totalPages; i++) {
                buttons.push(
                    <button
                        key={i}
                        onClick={() => handlePageChange(i)}
                        className={`page-button ${currentPage === i ? 'active' : ''}`}
                    >
                        {i}
                    </button>
                );
            }
        } else {
            // Always show first page
            buttons.push(
                <button
                    key={1}
                    onClick={() => handlePageChange(1)}
                    className={`page-button ${currentPage === 1 ? 'active' : ''}`}
                >
                    1
                </button>
            );

            // Show dots if current page is > 3
            if (currentPage > 3) {
                buttons.push(<span key="dots1" className="dots">...</span>);
            }

            // Show current page and one before and after
            for (let i = Math.max(2, currentPage - 1); i <= Math.min(currentPage + 1, totalPages - 1); i++) {
                buttons.push(
                    <button
                        key={i}
                        onClick={() => handlePageChange(i)}
                        className={`page-button ${currentPage === i ? 'active' : ''}`}
                    >
                        {i}
                    </button>
                );
            }

            // Show dots if current page is < totalPages - 2
            if (currentPage < totalPages - 2) {
                buttons.push(<span key="dots2" className="dots">...</span>);
            }

            // Always show last page
            buttons.push(
                <button
                    key={totalPages}
                    onClick={() => handlePageChange(totalPages)}
                    className={`page-button ${currentPage === totalPages ? 'active' : ''}`}
                >
                    {totalPages}
                </button>
            );
        }
        
        return buttons;
    };

    return (
        <div className="cards-container">
            <div className='search'>
                <span>Search</span>
                <input 
                type="text"
                placeholder='search...'
                value={search}
                onChange={handleSearchChange}
                />
                <button>Search</button>
                <span htmlFor="crime">Filter By crime Nature</span>
                <select name="" id="crime" value={selectedOption} onChange={handleOptionChange}>
                    <option value="">All</option>
                    <option value="(Rape)">Rape</option>
                    <option value="(Theft)">Theft</option>
                    <option value="(Murder)">Murder</option>
                    <option value="(Fraud)">Fraud</option>
                    <option value="(Robbery)">Robbery</option>
                    <option value="(Assault)">Assault</option>
                </select>
            </div>
            <div className="cards">
                {loading ? (
                    <div className="loader">Loading...</div>
                ) : (
                    currentItems.map((person, index) => (
                        <div className='card' key={index}>
                            <img src={`https://www.saps.gov.za/crimestop/wanted/${person.image}`}/>
                            <h3><span className='strong'>Name: </span> {person.name}</h3> 
                            <p>Crime: {person.crime}</p>
                            <p>Status: {person.status}</p>
                            <button onClick={() => handleButtonClick(`https://www.saps.gov.za/crimestop/wanted/${person.link}`)}>See More Details</button>
                        </div>
                    ))
                )}
            </div>
            {!loading && totalPages > 1 && (
                <div className="pagination">
                    <button 
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="page-button"
                    >
                        Previous
                    </button>
                    {renderPaginationButtons()}
                    <button 
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="page-button"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    )
}

export default Content