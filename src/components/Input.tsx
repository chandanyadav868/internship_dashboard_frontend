import {forwardRef, type InputHTMLAttributes} from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    text:string,
    requiredField?:boolean
}

const  Input = forwardRef<HTMLInputElement,InputProps>(({className, requiredField=true ,text ,...props},ref)=>{
  return (
    <label className="w-full" htmlFor={text}>
        <p className={`font-bold uppercase ${requiredField && "requiredInput"}`}>{text}</p>
        <input ref={ref} {...props} className={`w-full rounded-md px-7 py-4 bg-gray-200 border-0 outline-0 focus:outline-1 focus:outline-blue-400 text-black commanPadding ${className}`} />
    </label>
  )
})
 
export default Input
