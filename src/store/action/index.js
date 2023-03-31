

export function get_users() {
  return (dispatch) => {
    let USERS = []
    const myUsers =(e)=>{
      // console.log("====>",e.results)
      dispatch({ type: "SETUSERS", payload: e.results })
    }
    fetch('https://randomuser.me/api/?results=20')
    .then(res => res.json())
    .then(res => myUsers(res));
     
    }
   
}
