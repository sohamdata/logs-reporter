import React, { useState } from 'react';
import axios from '../utils/axios';
import { Log } from '../utils/types';

export default function Home() {
    const [filters, setFilters] = useState({
        level: '',
        message: '',
        resourceId: '',
        timestamp: '',
        traceId: '',
        spanId: '',
        commit: '',
        parentResourceId: '',
    });

    const [results, setResults] = useState<Log[] | null>(null);

    const [searched, setSearched] = useState(false);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleSearch = async () => {
        setSearched(true);
        const selectedFilters = Object.fromEntries(
            Object.entries(filters).filter(([_, value]) => value)
        );

        if (Object.keys(selectedFilters).length === 0) {
            alert('Please enter at least one filter');
            return;
        }

        try {
            const response = await axios.get('/logs', {
                params: selectedFilters,
            });

            if (response.status >= 200 && response.status < 300) {
                console.log('Logs retrieved successfully:', response.data);
            }

            setResults(response.data);
        } catch (error) {
            console.error('Error retrieving logs:', error);
        }
    };

    return (
        <>
            <div className="max-w-md mx-auto my-8 p-6 bg-white shadow-md rounded-md">
                <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.keys(filters).map((filter) => (
                        <div key={filter}>
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor={filter}
                            >
                                {filter}
                            </label>
                            <input
                                className="border rounded-md w-full py-2 px-3"
                                type="text"
                                name={filter}
                                value={filters[filter as keyof typeof filters]}
                                onChange={handleFilterChange}
                                id={filter}
                            />
                        </div>
                    ))}
                </div>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleSearch}
                >
                    Search
                </button>

            </div>

            {searched && (
                <div className="my-8 p-4 max-w-screen-xl mx-auto">
                    {results === null ? (
                        <h2 className="text-lg font-bold mb-2">No results found</h2>
                    ) : (
                        <div>
                            <h2 className=" mb-2 text-lg font-bold text-center">Results</h2>
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        {Object.keys(results[0]).slice(1).map((key) => (
                                            <th key={key} className="px-4 py-2 border-b">{key}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {results.map((log: Log) => (
                                        <tr key={log.id} className="border-b">
                                            {Object.entries(log).slice(1).map(([key, value]) => (
                                                <td key={key} className="px-4 py-2">{typeof value === 'string' ? value : JSON.stringify(value)}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
