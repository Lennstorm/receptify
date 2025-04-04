// components/auth/AuthModal.tsx

'use client'

import { ReactNode, useEffect } from "react";
import { X } from "lucide-react";
import { escape } from "querystring";

interface AuthModalProps {
    onClose: () => void;
    children: ReactNode;
}

export default function AuthModal({ onClose, children}: AuthModalProps) {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        onClick={onClose} //klick utanför modal stänger modal
        >
            <div 
                className="relative bg-white rounded-lg shadow-xl w-[90%] max-w-lg px-12 pt-12 pb-6"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Stäng-knapp */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray700"
                    aria-label="Stäng"
                    >
                    <X />                    
                </button>

                {children}
            </div>
        </div>
    );
}