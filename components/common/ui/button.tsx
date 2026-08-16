import React from "react";

interface IProps {
    label: string;
    type?: "submit" | "reset" | "button";
}

const Button = ({ label, type = "button" }: IProps) => {
    return <button
        type={type}
        className="w-full rounded-xl bg-[#b91c4a] py-3.5 text-base font-bold text-white shadow-lg shadow-[#b91c4a]/20 transition-all duration-300 hover:bg-[#991b42] hover:shadow-xl active:scale-[0.99]"
    >{label}</button>;
};

export default Button;
