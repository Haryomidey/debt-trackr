import React from "react"

export const Badge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800">
        {children}
    </span>
);