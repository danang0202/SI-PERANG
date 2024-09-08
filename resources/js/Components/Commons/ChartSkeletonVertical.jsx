import React from 'react'

const ChartSkeletonVertical = () => {
    return (
        <div role="status" className="animate-pulse w-full px-20">
            <div className="h-7 w-8/12 bg-gray-200 rounded-sm  mb-4"></div>
            <div className="w-7/12 h-7 mb-4 bg-gray-200 rounded-sm "></div>
            <div className="w-9/12 h-7 mb-4 bg-gray-200 rounded-sm "></div>
            <div className="w-12/12 h-7 mb-4 bg-gray-200 rounded-sm "></div>
            <div className="w-9/12 h-7 mb-4 bg-gray-200 rounded-sm "></div>
            <div className="w-10/12 h-7 mb-4 bg-gray-200 rounded-sm "></div>
            <div className="w-6/12 h-7 mb-4 bg-gray-200 rounded-sm "></div>
            <div className="w-11/12 h-7 mb-4 bg-gray-200 rounded-sm "></div>
            <span className="sr-only">Loading...</span>
        </div>
    )
}

export default ChartSkeletonVertical