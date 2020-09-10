

const getHeader = (ContentType = null) => {
  const Authorization = {
    "Authorization":"Bearer "+localStorage.getItem('jwt')
  };

  if (ContentType) {
    return {
      "Content-Type":ContentType,
      ...Authorization
    };
  }
  return { ...Authorization };
  
};

const callApiFetchAllPost = () => {
  return fetch('/allpost', {
    headers: getHeader(),
  }).then(res =>res.json())
}

const callApiLikePost = (id) => {
  return fetch('/like', {
    method: 'put',
    headers: getHeader('application/json'),
    body: JSON.stringify({
      postId: id
    })
  }).then(res =>res.json())
}

const callApiUnlikePost = (id) => {
  return fetch('/unlike', {
    method: 'put',
    headers: getHeader('application/json'),
    body: JSON.stringify({
      postId: id
    })
  }).then(res =>res.json())
}

const callApiMakeComment = (text, postId) => {
  return fetch('/comment', {
    method: 'put',
    headers: getHeader('application/json'),
    body: JSON.stringify({postId, text})
  })
  .then(res => res.json())
}

const callApiDeletePost = (postId) => {
  return fetch(`/deletepost/${postId}`, {
    method: "delete",
    headers: getHeader()
  }).then(res => res.json());
}

const callApiDeleteComment = (postId, commentId) => {
  return fetch(`/deletecomment/${postId}/${commentId}`, {
    method: "delete",
    headers: getHeader()
  }).then(res => res.json())
}

const callApiEditComment = (postId, commentId) => {
  return fetch(`/editcomment/${postId}/${commentId}`, {
    method: "put",
    headers: getHeader()
  }).then(res => res.json())
}

const callApiUploadPic = (image) => {
  const data = new FormData();
    data.append('file', image)
        data.append('upload_preset', 'insta-clone')
        data.append('cloud_name', 'dnigswdbm');
    const type = image.type.includes('image');
        return fetch(`https://api.cloudinary.com/v1_1/dnigswdbm/${type ? 'image' : 'video'}/upload`, {
          method:'post',
          body:data
        }).then(res =>res.json())
}

const callApiUpdatePostPic = (postId, url) => {
  return fetch(`/updatepostpic`, {
    method: "put",
    headers: getHeader('application/json'),
    body: JSON.stringify({
      postId,
      pic: url
    })
  }).then(res => res.json())
}

const callApiGetFollowingsPost = () => {
  return fetch('/getsubpost', {
    headers: getHeader('application/json')
  }).then(res =>res.json())
}

const callApiSignin = (password, email) => {
  return fetch('/signin', {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      password,
      email
    })
  }).then(res => res.json())
}

const callApiCreatePost = (title, body, url) => {
  return fetch('/createpost', {
    method: "post",
    headers: getHeader('application/json'),
    body: JSON.stringify({
      title,
      body,
      pic: url
    })
  }).then(res => res.json())
}

const callApiUpdatePic = (url)=> {
  return fetch('/updatepic', {
    method: "put",
    headers: getHeader('application/json'),
    body: JSON.stringify({pic: url})
  }).then(res => res.json())
}

const callApiMypost = ()=> {
  return fetch('/mypost', {
    headers: {
      "Authorization": "Bearer "+localStorage.getItem('jwt')
    }
  }).then(res => res.json());
}

module.exports = {
  callApiSignin,
  callApiFetchAllPost,
  callApiLikePost,
  callApiUnlikePost,
  callApiMakeComment,
  callApiDeletePost,
  callApiDeleteComment,
  callApiEditComment,
  callApiUploadPic,
  callApiUpdatePostPic,
  callApiGetFollowingsPost,
  callApiCreatePost,
  callApiUpdatePic,
  callApiMypost
};

