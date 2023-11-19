import React, { useState } from 'react';
import axios from 'axios';
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

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleSearch = async () => {
        const selectedFilters = Object.fromEntries(
            Object.entries(filters).filter(([_, value]) => value)
        );

        try {
            const response = await axios.get('http://localhost:3000/logs', {
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

            <div className="mt-8">
                <h2 className="text-lg font-bold mb-2">Results</h2>

                {results?.map((log: Log) => (
                    <div key={log.id} className="mb-4 p-4 border rounded-md shadow-md bg-gray-50">
                        {Object.entries(log).slice(1).map(([key, value]) => (
                            <div key={key} className="mb-2">
                                <span className="font-bold">{key}: </span>
                                {typeof value === 'string' ? (
                                    <pre>{value}</pre>
                                ) : (
                                    <pre>{JSON.stringify(value, null, 2)}</pre>
                                )}
                            </div>
                        ))}
                    </div>
                ))}

            </div>
        </div>
    );
};
