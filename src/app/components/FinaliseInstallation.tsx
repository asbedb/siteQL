import React from 'react'
import InstallationProgress from './InstallationProgress'
import FinalDBTest from './FinalDBTest'

function FinaliseInstallation() {
    return (
        <div className='p-12'>
            <span className='text-2xl font-semibold'>Finalise Installation</span>
            <span className='text-left'>
                <InstallationProgress/>
                <FinalDBTest/>
            </span>
        </div>
    )
}

export default FinaliseInstallation