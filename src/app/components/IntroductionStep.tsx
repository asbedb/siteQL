// components/IntroductionStep.tsx
import React from 'react'
import { Button } from '@nextui-org/react'

function IntroductionStep() {

    return (
        <div className='flex w-full h-full flex-col items-center gap-8 md:px-20'>
            <span className='text-2xl font-extrabold md:text-4xl'>Welcome to siteQL</span>
            <span className='text-md md:text-xl'>
            siteQL is a powerful SQL web application designed to streamline the process of building and deploying CRUD-based 
            web applications. 
            With SiteQL, users can automatically generate a SQL table structure and configure initial user 
            authentication to quickly set up customized Next.js applications. 
            Ideal for developers seeking efficiency, 
            siteQL simplifies backend setup by allowing for seamless integration with SQL databases, making it easy to launch 
            fully tailored applications with robust database support and secure access controls.</span>
            <Button size="lg" className='min-h-10'>
                GitHub
            </Button>  
        </div>
    )
}

export default IntroductionStep