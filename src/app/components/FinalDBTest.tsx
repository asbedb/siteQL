import React from 'react'
import { Code } from '@nextui-org/react'

function FinalDBTest() {
    return (
        <Code className='w-full p-4 rounded-xl'>
            {`-- Connect to the database`}<br/>
            {`USE \`newApp\`;`}<br/>

            {`-- Check if the main table exists`}<br/>
            {`SHOW TABLES LIKE 'main';`}<br/>

            {`-- Check if additional custom tables exist`}<br/>
            {`SHOW TABLES WHERE \`Tables_in_newApp\` IN ('test', 'testada', 'weee', 'weeea', '123');`}<br/>

            {`-- Fetch a few rows from each table to confirm functionality`}<br/>
            {`-- Main table query`}<br/>
            {`SELECT * FROM \`main\` LIMIT 5;`}<br/>

            {`-- Custom tables queries`}<br/>
            {`SELECT * FROM \`test\` LIMIT 5;`}<br/>
            {`SELECT * FROM \`testada\` LIMIT 5;`}<br/>
            {`SELECT * FROM \`weee\` LIMIT 5;`}<br/>
            {`SELECT * FROM \`weeea\` LIMIT 5;`}<br/>
            {`SELECT * FROM \`123\` LIMIT 5;`}<br/>
        </Code>
    )
}

export default FinalDBTest