import logo from '../images/logo.png';
import MyButton from './Button'; 


export default function Layout({children}) {

  return (
    <div className="layout">
       <MyButton />
        <img src={logo} className="logo" />
      {children}
    </div>
  )

}
