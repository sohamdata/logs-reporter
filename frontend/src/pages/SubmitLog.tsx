import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

type LogForm = {
    id: string;
    level: string;
    message: string;
    resourceId: string;
    timestamp: string;
    traceId: string;
    spanId: string;
    commit: string;
    metadata: {
        parentResourceId: string;
    };
};

const SubmitLog: React.FC = () => {
    const { register, handleSubmit, reset } = useForm<LogForm>();

    const onSubmit = async (data: LogForm) => {
        console.log('Submitting log:', data);
        try {
            const response = await axios.post('http://localhost:3000/logs', data);

            if (response.status >= 200 && response.status < 300) {
                alert('Log submitted successfully');
            }

            reset();

            console.log('Log submitted successfully:', response.data);
        } catch (error) {
            console.error('Error submitting log:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto my-8 p-6 bg-white shadow-md rounded-md">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="level">
                    Level
                </label>
                <input
                    className="border rounded-md w-full py-2 px-3"
                    type="text"
                    {...register('level')}
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
                    {...register('message')}
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
                    {...register('resourceId')}
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
                    {...register('timestamp')}
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
                    {...register('traceId')}
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
                    {...register('spanId')}
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
                    {...register('commit')}
                    id="commit"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="metadata.parentResourceId">
                    Parent Resource ID
                </label>
                <input
                    className="border rounded-md w-full py-2 px-3"
                    type="text"
                    {...register('metadata.parentResourceId')}
                    id="metadata.parentResourceId"
                />
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
                Submit
            </button>
        </form>
    );
}

export default SubmitLog;
