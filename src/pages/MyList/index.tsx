import {useEffect} from "react";

const MyList = () =>{
    
    useEffect(()=>{
        document.title = "Minha Lista"
    },[]);

    return "My List"
    
}

export default MyList;