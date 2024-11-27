import React from 'react'
import Avatar from 'react-avatar'
import './editor.css'

const Client = ({name}) => {
  return (
    <div className="client-details">
      <Avatar
        name={name.toString()}
        size={30}
        round="4px"
        textSizeRatio={1.75}
      />
      <h4>{name}</h4>
    </div>
  );
}

export default Client