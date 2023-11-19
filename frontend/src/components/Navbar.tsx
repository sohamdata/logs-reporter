import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between">
                    <div className="text-white">
                        <Link to="/" className="text-white text-lg font-bold">Home</Link>
                    </div>
                    <div className="space-x-4">
                        <Link to="/SubmitLog" className="text-white">Submit Log</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
