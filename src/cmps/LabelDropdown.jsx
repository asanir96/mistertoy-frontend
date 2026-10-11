import { useState } from 'react'

export function LabelDropdown({ labels, filterBy, handleChange }) {
    const [isOpen, setIsOpen] = useState(false)

    function onExpandDropdown(ev) {
        ev.preventDefault()
        setIsOpen(!isOpen)
    }

    function onOptionSelect(ev) {
        handleChange(ev)
    }

    return <div className='label-multiselect position-relative' >
        <fieldset onClick={onExpandDropdown}>
            <span >
                {isOpen ? '▲' : '▼'}
            </span>
            <span>
                {`${filterBy.labels && filterBy.labels.length} selected`}
            </span>
        </fieldset>

        {isOpen && <fieldset className='dropdown-options position-absolute'>
            {labels.map(label => {
                return <div key={`option-${label}`} >
                    <input type="checkbox"
                        name={label}
                        checked={filterBy.labels && filterBy.labels.includes(label)}
                        onChange={onOptionSelect}
                        value={label} />
                    <label htmlFor={label}
                    >{label}</label>
                </div>
            })}
        </fieldset>}

    </div>
}