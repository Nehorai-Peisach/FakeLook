import React, { useState } from 'react';
import { Container, Input, Title, Btn, IconBtn } from 'components/uiKit/UiKIt';
import { storage } from 'firebases';
import { v4 as uuidv4 } from 'uuid';
import newPostService from 'services/postServices/newPostService';
import { FiDownload } from 'react-icons/fi';

const NewPost = (props) => {
  const [image, setImage] = useState({});
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
    navigator.geolocation.getCurrentPosition(async (currentLocation) => {
      const { latitude, longitude } = currentLocation.coords;
      console.log(latitude, longitude);
      const id = uuidv4();
      uploadImage(id);
      const tagsArray = tags.split(', ');
      const userTagsArray = userTags.split(', ');
      const newPost = {
        image_id: id,
        location: { lan: latitude, lng: longitude },
        date: Date.now(),
        user_id: { _id: props.user._id },
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
  };

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
          <Input
            className="caption_input"
            type="text"
            onChange={(value) => {
              setText(value);
            }}
          >
            Description...
          </Input>
          <p className="tags_help">
            *enter your tags with a: ", " between them
          </p>
          <Input
            className="tags_input"
            type="text"
            onChange={(value) => {
              setTags(value);
            }}
          >
            Tags...
          </Input>
          <Input
            className="friends_input"
            type="text"
            onChange={(value) => {
              setUserTags(value);
            }}
          >
            Friend tags...
          </Input>
          <Btn className="post_btn grey" onClick={postHandler}>
            Post
          </Btn>
          {afterPostContent}
        </div>
      </div>
    </div>
  );
};

export default NewPost;
