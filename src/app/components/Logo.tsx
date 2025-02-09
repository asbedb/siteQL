// components/Logo.tsx
import { Image } from "@nextui-org/react"
export default function Logo(){
    return(
        <div className="flex flex-col items-center  w-full">
            <Image
                width={300}
                alt="siteQL Logo"
                src="/img/dev_logo.png"
                className="w-28 rounded-full md:w-52"
            />
            <h1 className="text-xl font-extrabold md:text-4xl">siteQL</h1>
            <h2 className="text-md font-thin md:text-xl ">An automated SQL WebApp Deployer</h2><br/>
        </div>
    )
}