import { SignInButton } from '@clerk/clerk-react';

const Home = () => {
    const backgroundImageUrl = 'https://images2.alphacoders.com/459/459009.jpg';

    return (
        <div className="flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
            <div className=" p-8 rounded shadow-md w-96">
                <h1 className="text-3xl font-semibold mb-4 text-gray-800">Streamline News</h1>
                <p className="text-gray-900 mb-6">Sign in to access your dashboard.</p>
                <SignInButton
                    mode="modal"
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
                    redirectUrl="/dashboard"
                />
            </div>
        </div>
    );
};

export default Home;

