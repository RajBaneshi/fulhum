import { useEffect, useState } from "react";

function TypingIndicator () {
    const [dots, setDots] = useState('');

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDots((prevDots) => {
                // Rotate between one and three dots
                const newDots = prevDots.length < 3 ? prevDots + '.' : '.';
                return newDots;
            });
        }, 500);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="flex items-center space-x-1 bg-gray-200 rounded-md shadow px-2 py-3">
            <div className={`w-2 h-2 bg-gray-600 rounded-full${dots.length > 0 ? ' animate-bounce' : ''}`}></div>
            <div className={`w-2 h-2 bg-gray-600 rounded-full${dots.length > 1 ? ' animate-bounce' : ''}`}></div>
            <div className={`w-2 h-2 bg-gray-600 rounded-full${dots.length > 2 ? ' animate-bounce' : ''}`}></div> 
        </div>
    );
};

export default TypingIndicator;