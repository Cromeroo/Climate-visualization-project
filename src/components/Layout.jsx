import logo from '../images/logo.png';
import MyButton from './Button'; 


export default function Layout({children}) {
//<MyButton />
  return (
    <div className="layout">
        
        <img src={logo} className="logo" />
      {children}
    </div>
  )

}
