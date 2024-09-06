export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow overflow-hidden sm:rounded-lg flex justify-center flex-col gap-4">
                <div className="w-full flex justify-center">
                    <img src="/images/logo-HD.png" alt="Logo" width={180} />
                </div>
                {children}
            </div>
        </div>
    );
}
