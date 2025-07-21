import React from 'react'

function Status({text, icon: Icon, bg, color}) {
  return (
    <div
    className={`${bg} ${color} px-2 py-2 rounded font-medium flex items-center gap-10`}>
        {text} <Icon size={15}/>
    </div>
  )
}

export default Status;
