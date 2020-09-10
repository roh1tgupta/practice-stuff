import React, {useEffect, useState, useContext} from 'react';
import { UserContext } from '../../App'
import { useParams } from 'react-router-dom';


const Profile = () => {
  const [userProfile, setUserProfile] = useState(null)
  const { state, dispatch } = useContext(UserContext)
  const {userid} = useParams();
  
  const [showFollow, setShowFollow] = useState(state ? !state.following.includes(userid) : true);

  useEffect(() => {
      fetch(`/user/${userid}`, {
        headers: {
          Authorization: "Bearer "+localStorage.getItem('jwt')
        }
      }).then(res => res.json()).then(result => {
        console.log(result)
        setUserProfile(result)
      })
  }, [])

  const followUser = () => {
    fetch('/follow', {
      method: 'put',
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer "+localStorage.getItem('jwt')
      },
      body: JSON.stringify({
        followId: userid
      })
    }).then(res => res.json()).then(result => {
      dispatch({type: 'UPDATE',
      payload:{following: result.following, followers: result.followers}})
      localStorage.setItem('user', JSON.stringify(result))
      // console.log(result)
      setUserProfile((prevstate) => {
        return {
          ...prevstate,
          user: {
            ...prevstate.user,
            followers: [...prevstate.user.followers, result._id]
          }
        }
      })
      setShowFollow(false);
    })
  }

  const unfollowUser = () => {
    fetch('/unfollow', {
      method: 'put',
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer "+localStorage.getItem('jwt')
      },
      body: JSON.stringify({
        unfollowId: userid
      })
    }).then(res => res.json()).then(result => {
      dispatch({type: 'UPDATE',
      payload:{following: result.following, followers: result.followers}})
      localStorage.setItem('user', JSON.stringify(result))
      // console.log(result)
      setUserProfile((prevstate) => {
        return {
          ...prevstate,
          user: {
            ...prevstate.user,
            followers: [...prevstate.user.followers.filter(id => id !== result._id)]
          }
        }
      })
      setShowFollow(true);
    })
  }



  return (
    <> {
      userProfile ? (
        <div style={{maxWidth: "550px", margin:"0 auto"}}>
      <div style={{
        display: "flex",
        justifyContent: "space-around",
        margin:"10px 0",
        borderBottom: "1px solid gray"
      }}>
        <div style={{flex:"1"}}>
          <img style={{height: "160px", width:"160px", borderRadius:"80px"}}
            src={userProfile.user ? userProfile.user.pic: 'loading..'}
          />

        </div>
        <div style={{flex:"2"}}>
          <div style={{paddingLeft:"24px", display:"flex"}}>
            <div style={{width:"66%"}}>
              <h4 style={{fontFamily: "cursive"}}>
                {userProfile.user && userProfile.user.name.toUpperCase()}
              </h4>
              <h5>{userProfile?.user?.email}</h5>
            </div>
            <div style={{width:"33%", textAlign:"right"}}>
            {
              showFollow ? (
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
                  onClick={() => followUser()}
                  style={{margin: "10px"}}>
                  Follow
                </button>
              ) : (
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
                  onClick={() => unfollowUser()}
                  style={{margin: "10px"}}>
                  UnFollow
                </button>
              )
            }
            </div>
          </div>
          <div style={{display:"flex", justifyContent:"space-around"}}>
            
            <h5 style={{textAlign:"center"}}> <div>{userProfile.posts.length}</div> <div>Posts</div></h5>
            <h5 style={{textAlign:"center"}}> <div>{userProfile.user? userProfile.user.followers.length : 0}</div> <div>Followers</div></h5>
            <h5 style={{textAlign:"center"}}><div>{userProfile.user ?userProfile.user.following.length : 0}</div>Following</h5>
          </div>
        </div>

        {/* <div>
          
          <div style={{display:"flex", justifyContent:"space-around", width:"108%"}}>
            {
              showFollow ? (
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
                  onClick={() => followUser()}
                  style={{margin: "10px"}}>
                  Follow
                </button>
              ) : (
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
                  onClick={() => unfollowUser()}
                  style={{margin: "10px"}}>
                  UnFollow
                </button>
              )
            }
            
            
          </div>
        </div> */}
      </div>
    
    
      <div className="gallery">
        {
          userProfile.posts.length > 0 && userProfile.posts.map(item => {
            return (
              <img className="item" src={item.photo} alt={item.title} key={item._id} />
            )
          })
        }
       
      </div>
    </div>
      ) : <h2>loading....</h2>
    }
    </>
  )
}

export default Profile;