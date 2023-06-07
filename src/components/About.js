
import React,{useContext, useEffect} from 'react'
import Notecontext from '../context/notes/Notecontext'


export const About = () => {
    const a =useContext(Notecontext)

  return (
    <div>This is About Page</div>
  )
}
