import React from 'react'

export default function SkeletonProjectCard() {
    return (
        <div>
            <div className='bg-gray-800 shadow-md border border-gray-600 p-3 rounded-lg my-5'>

                {/* Tags */}
                <div className='mb-3 flex items-center justify-between'>
                    <div className='mb-3'>
                        <span className='inline-block m-2 mt-0 px-3 w-16 h-6 py-1 rounded-full skeleton-shimmer'></span>
                        <span className='inline-block m-2 mt-0 px-3 w-16 h-6 py-1 rounded-full skeleton-shimmer'></span>
                        <span className='inline-block m-2 mt-0 px-3 w-16 h-6 py-1 rounded-full skeleton-shimmer'></span>
                    </div>
                    <span className='w-8 h-2 skeleton-shimmer rounded-full'></span>
                </div>
                {/* Image and  name */}
                <div className='flex items-center'>
                    <span className='rounded-full w-12 h-12 p-2 skeleton-shimmer'> </span>
                    <span className='h-2 w-12  rounded-full ml-2 skeleton-shimmer'></span>
                </div>

                <div className='pl-3 mt-3'>
                    {/* Title */}
                    <span className='p-2 skeleton-shimmer rounded-full block'></span>
                    {/* Description */}
                    <div className='p-2'>
                        <p className='block p-1 rounded-full skeleton-shimmer mt-2'></p>
                        <p className='block p-1 rounded-full skeleton-shimmer mt-2'></p>
                        <p className='block p-1 rounded-full skeleton-shimmer mt-2'></p>
                    </div>
                </div>

                {/* Links */}
                <div className='flex items-center mt-2'>
                    <span className='inline-block h-8 w-8 m-2 rounded-full skeleton-shimmer'></span>
                    <span className='inline-block h-8 w-8 m-2 rounded-full skeleton-shimmer'></span>
                </div>
                        
                {/* Reviews */}
                <div className='flex items-center flex-wrap mt-4 border-t border-gray-900 pt-3'>
                    <span className='m-2 py-1 px-3 rounded-full h-8 w-16 skeleton-shimmer'></span>
                    <span className='m-2 py-1 px-3 rounded-full h-8 w-16 skeleton-shimmer'></span>
                    <span className='m-2 py-1 px-3 rounded-full h-8 w-16 skeleton-shimmer'></span>
                    <span className='m-2 py-1 px-3 rounded-full h-8 w-16 skeleton-shimmer'></span>
                </div>

            </div>
        </div>
    )
}
