import { ActionFunction, LoaderFunction} from "@remix-run/node"
import { Form, Link, useActionData } from "@remix-run/react"
import { useRef, useState } from "react"
import FormDataToType from "~/utils/lib/ob.toType"
import { Mail } from "~/utils/types/new-mail.type"
import { TrashIcon } from '@heroicons/react/solid'


// loaderFunction which will be called on every render
export const loader: LoaderFunction = async ({request}) => {

    console.log("Runs on every request")

    // return null to disable the loader
    return null
}

// actionFunction that returns a promise that resolves to the data to be rendered
export const action: ActionFunction = async ({request}) => {

    // get the data from the request
    const formData = await request.formData()

    // convert the form data to the type of the data to be rendered
    const convertToNewMail = FormDataToType.toType<Mail>(formData)
    
    return convertToNewMail
}

export default function NewMail() {

    // Formdata is a promise that resolves to a FormData object when the form is submitted
    const prevFormData = useActionData()

    // create empty array of files
    const [files, setFiles] = useState<File[]>([])

    // create a ref to the input file
    const inputFileRef = useRef<HTMLInputElement>(null)

    // handle the files
    const handleFiles = (e: any) => {

        const filesList: File[] = Array.from(e.target.files)

        const uniqueFileList = [...new Set(filesList)]

        setFiles(files => [...files, ...uniqueFileList])
    }

    // update the files. if a file gets removed the state, array gets updated
    const updateFiles = (file: File, index: number) =>{

        // remove the file from the list and return the new list without the file
        const update = files.filter(f => f.name !== file.name)

        // ! asserts that the file is not null
        if(inputFileRef.current!.files?.item(index)?.name === file.name){
            inputFileRef.current!.value = ""   
        }

        // update the state
        setFiles(update)
    }

    return (
        <>
        <div className="container mx-auto h-full w-full py-5">
            <div className="flex justify-center text-2xl">
                <h1>Write email to NN</h1>
            </div>
            <div className="py-10">
                <Form method="post" encType="multipart/form-data" className="flex flex-col gap-5">
                    <div>
                        <input className="w-full h-10 bg-gray-200 p-5 rounded-sm outline-none" type="text" name="from" placeholder="From" defaultValue={prevFormData && prevFormData.to} />
                    </div>
                    <div>
                        <input className="w-full h-10 p-5 rounded-sm outline-none bg-gray-200" type="text" name="to" placeholder="To" value="nn@schade.com" disabled />
                    </div>
                    <div>
                        <input className="w-full h-10 p-5 rounded-sm outline-none bg-gray-200" type="text" name="subject" placeholder="Subject" defaultValue={prevFormData && prevFormData.subject}/>
                    </div>
                    <div>
                        <textarea className="w-full h-96 p-5 rounded-sm outline-none bg-gray-200" name="body" placeholder="Body"  defaultValue={prevFormData && prevFormData.body}/>
                    </div>
                    <div className="flex flex-row items-center bg-gray-200 p-5 gap-2 flex-wrap">
                        <input onChange={(e) => handleFiles(e)} type="file" name="attachments" className="text-sm text-slate-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-violet-50 file:text-violet-700
                            hover:file:bg-violet-100" defaultValue={prevFormData && prevFormData.attachments} ref={inputFileRef}/>

                            {
                                files && files.map((file, index) => {
                                    return (
                                        <div key={index} className="rounded-sm bg-purple-300 p-2  flex flex-row items-center w-44 justify-between">
                                            <Link to={`/attachments/${file.name}`} className="text-purple-900 text-ellipsis overflow-hidden hover:text-blue-700 ease-linear duration-300">
                                                <span >{file.name}</span>
                                            </Link>
                                            <TrashIcon className="h-5 w-5 text-blue-500 hover:text-blue-700 ease-linear duration-300 cursor-pointer" onClick={() => updateFiles(file, index)}/>
                                        
                                        </div>
                                    )})
                                
                            }
                    </div>
                    <div>
                        <button type="submit" className="w-full rounded-sm bg-purple-200 p-5  hover:bg-purple-300 ease-in duration-300 text-purple-900"> Send </button>
                    </div>
                </Form>
            </div>
        </div>
        </>
    )
}