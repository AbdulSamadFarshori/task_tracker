import React from 'react';

export default function DropDownBox({ label, id, options = [], onChange }) {
    return (
        <>
            <label htmlFor={id}>{label}</label>
            <select id={id} onChange={onChange} required>
                <option value="">Select...</option>
                {options.map((opt, idx) => (
                    <option key={idx} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
        </>
    );
}