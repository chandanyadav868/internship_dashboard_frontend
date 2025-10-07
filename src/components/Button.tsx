import type { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string
}

function Button({ className, text, ...props }: ButtonProps) {
    return (
        
        <button className={`commanflex cursor-pointer hover:bg-blue-500 buttonPadding springTransition bg-blue-400 font-bold rounded-md ${className}`} {...props}>
           <span className="text-center block">{text}</span> 
        </button>
    )
}

export default Button