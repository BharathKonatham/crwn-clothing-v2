import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg'
import './navigation.styles.scss'
import { userContext } from '../../contexts/user.context'
import { useContext } from 'react'
import { signOutUser } from '../../utils/firebase.utils'


const Navigation= () => {

  const {currentUser} = useContext(userContext)
  // console.log(currentUser)

  const signOutHandler = async ()=>{
    const response = await signOutUser()
    console.log(response)
  }
  return (
    <>
      <div className='navigation'>
            <Link className='logo' to='/'>
                <div className='logo-container'>
                    <CrwnLogo className='logo' />
                </div>
            </Link>
            
            <div className='nav-links-container'>
                <Link className='nav-link' to='/shop'> 
                    SHOP
                </Link>
                {currentUser ? <span className='nav-link' onClick={signOutHandler}>{' '}SIGN OUT {' '}</span> : <Link className='nav-link' to='/authentication'> 
                SIGN IN
                </Link>}
                
            </div>
      </div>
      <Outlet />
    </>
  )
}

export default Navigation