import React, { useState } from 'react';
import axios from 'axios';

type Log = {
    id: string;
    level: string;
    message: string;
    resourceId: string;
    timestamp: string;
    traceId: string;
    spanId: string;
    commit: string;
    parentResourceId: string;
};


const Home: React.FC = () => {
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

    const [results, setResults] = useState([]);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleSearch = async () => {

        // const selectedFilters = Object.keys(filters).reduce((acc: any, key: string) => {
        //     if (filters[key as keyof typeof filters]) {
        //         acc[key] = filters[key as keyof typeof filters];
        //     }
        //     return acc;
        // }, {});

        const selectedFilters = Object.fromEntries(Object.entries(filters).filter(([_, value]) => value));

        try {
            const response = await axios.get('http://localhost:3000/logs', { params: selectedFilters });

            if (response.status >= 200 && response.status < 300) {
                console.log('Logs retrieved successfully:', response.data);
            }

            setResults(response.data);

        } catch (error) {
            console.error('Error retrieving logs:', error);
        }
    }

    return (
        <div className="max-w-md mx-auto my-8 p-6 bg-white shadow-md rounded-md">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="level">
                    Level
                </label>
                <input
                    className="border rounded-md w-full py-2 px-3"
                    type="text"
                    name="level"
                    value={filters.level}
                    onChange={handleFilterChange}
                    id="level"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                    Message
                </label>
                <input
                    className="border rounded-md w-full py-2 px-3"
                    type="text"
                    name="message"
                    value={filters.message}
                    onChange={handleFilterChange}
                    id="message"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="resourceId">
                    Resource ID
                </label>
                <input
                    className="border rounded-md w-full py-2 px-3"
                    type="text"
                    name="resourceId"
                    value={filters.resourceId}
                    onChange={handleFilterChange}
                    id="resourceId"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="timestamp">
                    Timestamp
                </label>
                <input
                    className="border rounded-md w-full py-2 px-3"
                    type="text"
                    name="timestamp"
                    value={filters.timestamp}
                    onChange={handleFilterChange}
                    id="timestamp"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="traceId">
                    Trace ID
                </label>
                <input
                    className="border rounded-md w-full py-2 px-3"
                    type="text"
                    name="traceId"
                    value={filters.traceId}
                    onChange={handleFilterChange}
                    id="traceId"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="spanId">
                    Span ID
                </label>
                <input
                    className="border rounded-md w-full py-2 px-3"
                    type="text"
                    name="spanId"
                    value={filters.spanId}
                    onChange={handleFilterChange}
                    id="spanId"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="commit">
                    Commit
                </label>
                <input
                    className="border rounded-md w-full py-2 px-3"
                    type="text"
                    name="commit"
                    value={filters.commit}
                    onChange={handleFilterChange}
                    id="commit"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="parentResourceId">
                    Parent Resource ID
                </label>
                <input
                    className="border rounded-md w-full py-2 px-3"
                    type="text"
                    name="parentResourceId"
                    value={filters.parentResourceId}
                    onChange={handleFilterChange}
                    id="parentResourceId"
                />
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSearch}>
                Search
            </button>

            <div className="mt-8">
                <h2 className="text-lg font-bold mb-2">Results</h2>
                <ul>
                    {results?.map((log: Log) => (
                        <li key={log.id} className="mb-4 p-4 border rounded-md shadow-md bg-gray-50">
                            <div className="text-sm">{log.timestamp}</div>
                            <div className="font-bold">{log.message}</div>
                            <div className="text-sm">{log.level}</div>
                            <div className="text-sm">{log.resourceId}</div>
                            <div className="text-sm">{log.traceId}</div>
                            <div className="text-sm">{log.spanId}</div>
                            <div className="text-sm">{log.commit}</div>
                            <div className="text-sm">{log.parentResourceId}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Home;
