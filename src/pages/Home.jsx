import React from 'react'
import { Link } from 'react-router-dom'


export default function Home() {
  return (
    <div className="login-box">
      <div className="child-element left">
        <img src='/illus1.png'></img>
      </div>

      <div className="child-element right">
        <div className='land-intro'>
          <p>''Experience note-taking reimagined with NotesApp: Unleash your creativity, streamline your life.''</p>
        </div>
        <h1 className='land-heading'>Welcome!</h1>
        <div className='land-btn'>
          <button><Link to='/register'>Register</Link></button>
          <button><Link to='/login'>Login</Link></button>
        </div>
      </div>


    </div>
  );
}
