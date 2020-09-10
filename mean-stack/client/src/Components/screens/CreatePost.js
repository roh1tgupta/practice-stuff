import React, {useState, useEffect, useRef} from 'react';
import { useHistory } from 'react-router-dom';
import M from 'materialize-css';
import {callApiCreatePost, callApiUploadPic} from '../../api'

const CreatePost = () => {
  const history = useHistory()
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');
  const uploadCard = useRef(null);
  const uploadedFile = useRef(null);
  const [filename, setFilename] = useState('');

  useEffect(() => {
    if (url) {
      createPost();
    }
  }, [url])

  useEffect(() => {
    const instance = M.Dropdown.init(uploadCard.current, {
      closeOnClick: false,
      autoTrigger: false,
      onOpenStart: () => {
        if (uploadedFile && uploadedFile.current.reset) {
          uploadedFile.current.reset()
        }
      }
    })
    
  },[])

  const createPost = () => {
    callApiCreatePost(title, body, url).then(data => {
      if (data.error) {
        M.toast({html: data.error, classes:"#c62828 red darken-3"})
      } else {
        M.toast({html: "created post successfully", classes:"#43a047 green darken-1"});
        history.push('/')
      }
    }).catch(err => console.log(err))
  }

  const postDetail = () => {
    if (!uploadedFile.current[2].files.length) {
      M.toast({html: "no file uploaded", classes:"#c62828 red darken-3"})
      return;
    }
    callApiUploadPic(uploadedFile.current[2].files[0]).then(data => {
      if (data.error) {
        M.toast({html: "Please make sure to uplaod a file", classes:"#c62828 red darken-3"})
      }
      setUrl(data.url);
    }).catch(err => {
      console.log(err);
    })
    
  }

  
  return(
    <div className="card input-filed"
      style={{
        margin:"10px auto",
        maxWidth: "500px",
        padding:"20px",
        textAlign:"center"
      }}
    >
      <a
      style={{width:"100%"}}
        className='dropdown-trigger #64b5f6 blue darken-1 btn' ref={uploadCard} href='#' data-target='dropdown1'>Create Post!</a>

{/* <!-- Dropdown Structure --> */}
            
        <form
          id='dropdown1'
          className='dropdown-content'
          ref={uploadedFile}
          style={{padding: "4px 8px"}}
          onSubmit={e => e.preventDefault()}
        >
          <input type="text" placeholder="title" value={title} onChange={e => setTitle(e.target.value)}/> 
          <input type="text" placeholder="body" value={body} onChange={e => setBody(e.target.value)} />
                <div className="file-field input-field">
                  <div className="btn #64b5f6 blue darken-2">
                    <span>Upload Image</span>
                    <input
                      type="file"
                      accept="file_extension|audio/*|video/*|image/*"
                      placeholder={filename}
                      />
                  </div>
                  <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                  </div>
              </div>
              <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
                onClick={() => {
                  M.Dropdown.getInstance(uploadCard.current).close()
                  postDetail()
                }}>
                  Submit Post
                </button>
        </form>


      

    </div>
  )
}

export default CreatePost;