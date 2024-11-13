import React from 'react'
import { Button } from '@nextui-org/react'

function IntroductionStep() {

    return (
        <>
        <div className='leading-snug p-10'>
            <span className='text-2xl font-extrabold md:text-4xl'>Welcome to SiteQL</span><br/><br/>
            <span className='text-md md:text-xl py-4'>
            SiteQL is a powerful SQL web application designed to streamline the process of building and deploying CRUD-based 
            web applications. 
            With SiteQL, users can automatically generate a SQL table structure and configure initial user 
            authentication to quickly set up customized Next.js applications. 
            Ideal for developers seeking efficiency, 
            SiteQL simplifies backend setup by allowing for seamless integration with SQL databases, making it easy to launch 
            fully tailored applications with robust database support and secure access controls.</span><br/><br/>
            <span className='text-xl font-extrabold'>  
            Full Breakdown on GitHub
            </span>
            <br/>
            <Button size="lg">
                GitHub
            </Button>  
        </div>
        </>
    )
}

export default IntroductionStep