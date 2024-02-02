import React from 'react'

function Article({ _id, title, age, comments, href, read, score, user, onDelete, onMarkAsRead }) {
    const createdAt = new Date(parseInt(1706860666073)); // Convert timestamp to date
    const updatedAt = new Date(parseInt(1706861234871));

    return (
        <div className="max-w-xl mx-auto bg-white p-2 rounded-md shadow-md my-4">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <p className="text-gray-600 mb-2">
                {createdAt.toLocaleString()} by {user}
            </p>
            <p className="text-gray-600 mb-2">{age}</p>
            <p className="text-gray-600 mb-2">{score}</p>
            <p className="text-gray-600 mb-2">{comments}</p>
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline block"
            >
                Read more
            </a>
            <button
                onClick={() => onMarkAsRead(_id)}
                className={`py-2 px-4 rounded mr-2 ${read ? 'bg-green-500 hover:bg-green-600' : 'bg-yellow-300 hover:bg-yellow-400'}`}
            >
                Mark as Read
            </button>
            <button
                onClick={() => onDelete(_id)}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
            >
                Delete
            </button>
        </div>
    );
}

export default Article
