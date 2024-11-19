import React from 'react'
import { ThemeSwitcher } from './ThemeSwitcher'
import ServicePing from './ServicePing'
import InstallPopover from './InstallPopover'


function ServiceBar() {
    return (
        <div className='flex flex-row justify-between items-center p-4 bg-primary-50'>
            <div><ThemeSwitcher/></div>
            <div className='flex flex-row'><ServicePing/> <InstallPopover/></div>
        </div>
    )
}

export default ServiceBar