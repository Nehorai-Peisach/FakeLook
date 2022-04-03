import React, { useState } from 'react';
import { Container, Input, Title, Btn, IconBtn } from 'components/uiKit/UiKIt';
import { storage } from 'firebases';
import { v4 as uuidv4 } from 'uuid';
import newPostService from 'services/postServices/newPostService';
import { FiDownload } from 'react-icons/fi';
import { RiSendPlaneFill } from 'react-icons/ri';
import { useCookies } from 'react-cookie';

const NewPost = (props) => {
  const [cookies] = useCookies(['user']);
  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [text, setText] = useState('');
  const [tags, setTags] = useState('');
  const [userTags, setUserTags] = useState('');

  const [afterPostContent, setAfterPostContent] = useState(<></>);

  const imageHandler = (e) => {
    console.log(typeof e);
    const reader = new FileReader();
    setImage(e.target.files[0]);
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setImageUrl(reader.result);
    };
  };

  const postHandler = () => {
    if (image) {
      navigator.geolocation.getCurrentPosition(async (currentLocation) => {
        // const { latitude, longitude } = currentLocation.coords;

        const latitude = getRandomInRange(-90, 90, 6);
        const longitude = getRandomInRange(-180, 180, 6);

        const id = uuidv4();
        uploadImage(id);
        const tagsArray = tags.split(', ');
        const userTagsArray = userTags.split(', ');
        const newPost = {
          image_id: id,
          location: { lat: latitude, lng: longitude },
          date: Date.now(),
          user_id: cookies.user.data._id,
          text: text,
          tags: tagsArray,
          userTags: userTagsArray
        };
        const result = await newPostService(newPost);

        // for the real-time feed update
        props.socket.emit('new_post');

        if (result.data.msg)
          setAfterPostContent(<h1>Post as been uploaded successfully!</h1>);
        else setAfterPostContent(<h1>Post failed to upload!</h1>);
      });
    }
  };

  function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    s;
  }

  const uploadImage = (id) => {
    const uploadTask = storage.ref(`images/${id}`).put(image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {},
      (err) => {
        console.log(err);
      },
      () => {
        storage
          .ref('images')
          .child(id)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
          });
      }
    );
  };

  return (
    <div className="new_post">
      <Title className="new_post_title">Create Post</Title>
      <div className="interface">
        <div className="img_container">
          <label className="file_btn">
            <img className="new_img" src={imageUrl} />
            <IconBtn className="transparent" icon={FiDownload}>
              Choose File...
            </IconBtn>
            <input
              className="img_input"
              type="file"
              onChange={imageHandler}
            ></input>
          </label>
        </div>
        <div className="inputs_container">
          <div className="inputs">
            <Input
              className="caption_input input"
              type="text"
              onChange={(value) => {
                setText(value);
              }}
            >
              Description...
            </Input>
            <Input
              className="tags_input input"
              type="text"
              onChange={(value) => {
                setTags(value);
              }}
            >
              Tags...
            </Input>
            <p className="tags_help">
              *enter your tags with a: ", " between them
            </p>
            <Input
              className="friends_input input"
              type="text"
              onChange={(value) => {
                setUserTags(value);
              }}
            >
              Friend tags...
            </Input>
          </div>
          <IconBtn icon={RiSendPlaneFill} onClick={postHandler}>
            Post
          </IconBtn>
          {afterPostContent}
        </div>
      </div>
    </div>
  );
};

export default NewPost;
