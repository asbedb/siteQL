import { Image } from "@nextui-org/react"
export default function Logo(){
    return(
        <>
            <Image
                width={300}
                alt="NextUI hero Image"
                src="/img/dev_logo.png"
                className="w-52 rounded-full"
            />
            <h1 className="text-4xl pt-2 font-extrabold">siteQL</h1>
            <h2 className="text-xl pt-2 font-thin">An automated SQL WebApp Deployer</h2><br/>
        </>
    )
}