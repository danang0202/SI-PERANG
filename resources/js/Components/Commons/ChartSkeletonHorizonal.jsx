import React from 'react'

const ChartSkeletonHorizonal = () => {
    return (
        <div role="status" className="animate-pulse w-full px-10">
            <div className="flex items-baseline ">
                <div className="w-full bg-gray-200 rounded-t-lg h-72 "></div>
                <div className="w-full h-56 ms-6 bg-gray-200 rounded-t-lg "></div>
                <div className="w-full bg-gray-200 rounded-t-lg h-72 ms-6 "></div>
                <div className="w-full h-64 ms-6 bg-gray-200 rounded-t-lg "></div>
                <div className="w-full bg-gray-200 rounded-t-lg h-80 ms-6 "></div>
                <div className="w-full bg-gray-200 rounded-t-lg h-72 ms-6 "></div>
                <div className="w-full bg-gray-200 rounded-t-lg h-80 ms-6 "></div>
                <div className="w-full bg-gray-200 rounded-t-lg h-72 ms-6 "></div>
                <div className="w-full h-64 ms-6 bg-gray-200 rounded-t-lg "></div>
                <div className="w-full h-64 ms-6 bg-gray-200 rounded-t-lg "></div>
                <div className="w-full h-56 ms-6 bg-gray-200 rounded-t-lg "></div>
                <div className="w-full h-80 ms-6 bg-gray-200 rounded-t-lg "></div>
            </div>
            <span className="sr-only">Loading...</span>
        </div>
    )
}

export default ChartSkeletonHorizonal