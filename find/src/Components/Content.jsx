import React, { useState } from 'react';

function Content() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(9);
    const [pageLoading, setPageLoading] = useState(false);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const filteredItems = data.filter((item) => {
        return search.toLowerCase() === '' ? item : item.name.toLowerCase().includes(search);
    });
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setPageLoading(true);
        setCurrentPage(pageNumber);
        setTimeout(() => {
            setPageLoading(false);
        }, 500);
    };

    return (
        <div className="cards-container">
            <div className="cards">
                {loading ? (
                    <div className="loader">Loading...</div>
                ) : pageLoading ? (
                    <div className="loader">Loading page...</div>
                ) : (
                    <>
                        {currentItems.map((person, index) => (
                            <div className='card' key={index}>
                                <img src={`https://www.saps.gov.za/crimestop/wanted/${person.image}`}/>
                                <h3><span className='strong'>Name: </span> {person.name}</h3> 
                                <p>Crime: {person.crime}</p>
                                <p>Status: {person.status}</p>
                                <button onClick={() => handleButtonClick(`https://www.saps.gov.za/crimestop/wanted/${person.link}`)}>See More Details</button>
                            </div>
                        ))}
                        
                        <div className="pagination">
                            <button 
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                            
                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => handlePageChange(index + 1)}
                                    className={currentPage === index + 1 ? 'active' : ''}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Content; 