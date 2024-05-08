import React from 'react'

export default function References({ references = [] }) {
  return (
    <div className='mb-20'>
      <hr />
      <h3>References</h3>
      <ul>
        {references.map((reference, i) => (
          <li key={i}>
            <a className='text-gray-500' href={reference.url}>{reference.name}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}