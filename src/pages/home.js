import React from 'react'
import { useSelector} from 'react-redux';
const Home =() =>{
    const { user } = useSelector((state) => state.auth);
    
    return (
    <div>home</div>
  )
}

export default Home;

