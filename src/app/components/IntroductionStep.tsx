import React from 'react'
import { Button } from '@nextui-org/react'

function IntroductionStep() {

    return (
        <>
        <div className='leading-10'>
            <span className='text-4xl font-extrabold'>Welcome to SiteQL</span><br/>
            <span className='text-2xl font-bold'>For Full Documentation Check out the GitHub Page</span><br/>
            <Button size="lg">
                GitHub
            </Button>  
        </div>
        </>
    )
}

export default IntroductionStep