import React, {useEffect, useState, useContext} from 'react';
import { UserContext } from '../../App'
import { callApiUploadPic, callApiUpdatePic, callApiMypost } from '../../api'
import { Link } from 'react-router-dom';
import Spinner from '../Ui-Component/Spinner';
import Overlay from '../Overlay';

const Profile = () => {
  const [mypics, setmypics] = useState([]);
  const [dataFetching, setDataFetching] = useState(false);
  const { state, dispatch } = useContext(UserContext)
  const [image, setImage] = useState('');
  const [showOverlay, setShowOverlay] = useState(null);

  // const [url, setUrl] = useState(undefined)



  useEffect(() => {
    setDataFetching(true);
    callApiMypost().then(result => {
      setDataFetching(false);
        setmypics(result.mypost)
      })
  }, [])

  useEffect(() => {
    if(image) {
      callApiUploadPic(image).then(data => {
        updatepic(data.url);
      }).catch(err => console.log(err))
    }
  }, [image])


  const updatepic = (url) => {
    callApiUpdatePic(url).then(result => {
      localStorage.setItem('user', JSON.stringify({...state, pic:result.result.pic}))
        dispatch({type:'UPDATEPIC', payload:result.result.pic})
    });
  }

  const updatePhoto = (image) => {
    setImage(image)
  }

  const clickHandler = () => {

  };

  return (
    state && 
    <div style={{maxWidth: "550px", margin:"0 auto"}}>
      <div style={{
        display: "flex",
        justifyContent: "space-around",
        margin:"10px 0",
        borderBottom: "1px solid gray"
      }}>
        <div style={{flex:"1"}}>
          <img style={{height: "160px", width:"160px", borderRadius:"80px"}}
            src={state ? state.pic: 'loading..'}
          />

        </div>
        <div style={{flex:"2"}}>
          <div style={{paddingLeft:"24px"}}>
            <h4 style={{fontFamily: "cursive"}}>
              {state.name.toUpperCase()}
            </h4>
            <h5>{state?.email}</h5>
            </div>
          <div style={{display:"flex", justifyContent:"space-around", width:"108%"}}>
            
            <h5 style={{textAlign:"center"}}> <div>{mypics.length}</div> <div>Posts</div></h5>
            <h5 style={{textAlign:"center"}}> <div>{state?.followers ? state.followers.length : 0}</div> <div>Followers</div></h5>
            <h5 style={{textAlign:"center"}}><div>{state?.following? state.following.length : 0}</div>Following</h5>
          </div>
        </div>

        {/* <div className="file-field input-field" style={{margin: "10px"}}>
          <div className="btn #64b5f6 blue darken-2">
            <span>Upload Image</span>
             <input type="file" onChange={(e) => updatePhoto(e.target.files[0])} />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
           </div>
        </div> */}
      </div>
    
      { dataFetching ? <Spinner /> : (
          <div className="gallery">
        
          {
            mypics.length > 0 ? mypics.map(item => {
              return (
                // <Link>
                  <img className="item" src={item.photo} alt={item.title} key={item._id} onClick={() => setShowOverlay(item)}/>
                // </Link>
              )
            }) : <div> no photos </div>
          }
         
        </div>
        )
      }

      {
        showOverlay && <Overlay item={showOverlay} close={() => setShowOverlay(null)}/>
      }
      
    </div>
  )
}

export default Profile;