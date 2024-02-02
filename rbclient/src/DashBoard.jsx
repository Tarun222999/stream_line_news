import { UserButton } from '@clerk/clerk-react';
import { useClerk } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import Article from './Components/Article';

const Dashboard = () => {
    const { user } = useClerk();

    const [page, setPage] = useState(1);
    const [news, setNews] = useState(null);
    const [totalPages, setTotalPages] = useState(3);
    const [newsCache, setNewsCache] = useState({});

    console.log(page, news);
    const handlePageChange = (newPage) => {

        if (newPage !== page && newPage > 0 && newPage <= totalPages) {
            setPage(newPage);
        }
    };
    const handleMarkAsRead = (articleId) => {
        // Update the news state to mark the article as read
        setNews((prevNews) =>
            prevNews.map((article) =>
                article._id === articleId ? { ...article, read: true } : article
            )
        );

        // If you also want to update the cache, you can do so
        setNewsCache((prevCache) => {
            const newCache = { ...prevCache };
            Object.keys(newCache).forEach((page) => {
                newCache[page] = newCache[page].map((article) =>
                    article._id === articleId ? { ...article, read: true } : article
                );
            });
            return newCache;
        });
    };

    const handleDelete = (articleId) => {


        console.log(articleId);

        setNewsCache((prevCache) => {
            const newCache = { ...prevCache };
            Object.keys(newCache).forEach((page) => {
                newCache[page] = newCache[page].filter((article) => article._id !== articleId);
            });
            return newCache;
        });


        if (news) {
            setNews((prevNews) => prevNews.filter((article) => article._id !== articleId));
        }

    };

    useEffect(() => {
        const getData = async (page) => {

            if (newsCache[page]) {
                return setNews(newsCache[page]);
            }

            const res = await fetch(`api/news?p=${page}`);
            const data = await res.json();
            const markedData = data.map((article) => ({ ...article, read: false }));

            setNewsCache((prevCache) => ({
                ...prevCache,
                [page]: markedData,
            }));

            setNews(markedData);
        };

        getData(page);
    }, [page, newsCache]);

    return (
        <>
            <div className="bg-gradient-to-r from-green-400 to-blue-500 p-4">
                <div className='container mx-auto flex justify-between items-center'>
                    <h1 className="text-4xl font-bold text-white">{user.firstName}'s Dashboard</h1>
                    <UserButton />
                </div>
            </div>


            <div className="flex justify-center mt-4">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        className={`mx-2 px-3 py-1 rounded ${index + 1 === page ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
                            }`}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
            <div className="flex flex-wrap justify-center">
                {news && news.map((newsItem) => (
                    <Article
                        key={newsItem._id.$oid}
                        onMarkAsRead={handleMarkAsRead}
                        onDelete={handleDelete}
                        {...newsItem} />
                ))}
            </div>




        </>
    );
};

export default Dashboard;