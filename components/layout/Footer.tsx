import React from 'react'

const Footer = () => {
    return (
        <div className='w-full bg-amber-400'>
            <div>
                <p className='text-center py-4 text-md text-gray-700'>
                    &copy; {new Date().getFullYear()} MinStore. All rights reserved.
                </p>
            </div>
        </div >
    )
}

export default Footer