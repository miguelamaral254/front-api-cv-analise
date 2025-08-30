import { useState } from 'react';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

export const PasswordField = ({ id, label, ...props }) => {
    const [isVisible, setIsVisible] = useState(false);
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
            <div className="relative mt-1">
                <input
                    id={id}
                    type={isVisible ? "text" : "password"}
                    required
                    minLength={8}
                    className="block w-full p-3 pr-10 border border-gray-300 rounded-lg shadow-sm focus:ring-secondary focus:border-secondary"
                    {...props}
                />
                <button
                    type="button"
                    onClick={() => setIsVisible(!isVisible)}
                    className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-secondary"
                >
                    {isVisible ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
                </button>
            </div>
        </div>
    );
};