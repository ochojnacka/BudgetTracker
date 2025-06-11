import React from 'react'

const TheTextarea = ({name, placeholder, value, onChange}) => {
  return (
    <textarea
        class="textarea is-primary is-small"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
    />
  )
}

export default TheTextarea