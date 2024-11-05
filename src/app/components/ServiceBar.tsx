import React from 'react'
import { ThemeSwitcher } from './ThemeSwitcher'
import ServicePing from './ServicePing'

function ServiceBar() {
    return (
        <div className='flex flex-row justify-between items-center p-4'>
            <div><ThemeSwitcher/></div>
            <div><ServicePing/></div>
        </div>
    )
}

export default ServiceBar