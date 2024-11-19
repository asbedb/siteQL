import { Image } from "@nextui-org/react"
export default function Logo(){
    return(
        <>
            <Image
                width={300}
                alt="siteQL Logo"
                src="/img/dev_logo.png"
                className="w-28 rounded-full md:w-52"
            />
            <h1 className="text-xl pt-2 font-extrabold md:text-4xl">siteQL</h1>
            <h2 className="text-md pt-2 font-thin md:text-xl mb-2">An automated SQL WebApp Deployer</h2><br/>
        </>
    )
}