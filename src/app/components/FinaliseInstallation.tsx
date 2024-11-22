import React from 'react'
import InstallationProgress from './InstallationProgress'

function FinaliseInstallation() {
    return (
        <div className='p-12'>
            <span className='text-2xl font-semibold'>Finalise Installation</span>
            <span className='text-left'>
                <InstallationProgress/>
            </span>
        </div>
    )
}

export default FinaliseInstallation