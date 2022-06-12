import { Link } from "@remix-run/react"

export default function Index() {
    return (
        <div className="flex flex-row min-h-screen justify-center items-center">
            <Link to="/new-mail" className="w-full">
            <button className="bg-purple-200 p-4 w-full hover:bg-purple-300 ease-in duration-300 text-purple-900">
                New Mail
            </button>
            </Link>
            
        </div>
    )
}