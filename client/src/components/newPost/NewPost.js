import React, { useState } from 'react';
import { Container, Input, Title, Btn } from '../uiKit/UiKIt';
import { storage } from '../../firebase';
import { v4 as uuidv4 } from 'uuid';
import newPostService from '../../services/newPostService';

const NewPost = (props) => {
  const [image, setImage] = useState({});
  const [imageUrl, setImageUrl] = useState(
    'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg'
  );
  const [text, setText] = useState('');
  const [tags, setTags] = useState('');
  const [userTags, setUserTags] = useState('');

  const [afterPostContent, setAfterPostContent] = useState(<></>);

  const imageHandler = (e) => {
    const reader = new FileReader();
    setImage(e.target.files[0]);
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setImageUrl(reader.result);
    };
  };

  const postHandler = async () => {
    const id = uuidv4();
    uploadImage(id);
    const tagsArray = tags.split(', ');
    const userTagsArray = userTags.split(', ');
    const newPost = {
      image_id: id,
      location: { location: 'demo' },
      date: Date.now(),
      user_id: { _id: 'demo' },
      text: text,
      tags: tagsArray,
      userTags: userTagsArray
    };
    const result = await newPostService(newPost);
    if (result.data.msg)
      setAfterPostContent(<h1>Post as been uploaded successfully!</h1>);
    else setAfterPostContent(<h1>Post failed to upload!</h1>);
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
    <section style={{ backgroundColor: 'green' }}>
      <Container>
        <Title>New Post</Title>
        <img src={imageUrl} />
        <Input type="file" onChange={imageHandler}>
          upload Image
        </Input>
        <Input
          type="text"
          onChange={(e) => {
            setText(e.target.value);
          }}
        >
          Description...
        </Input>
        <p>*enter your tags with a: ", " between them</p>
        <Input
          type="text"
          onChange={(e) => {
            setTags(e.target.value);
          }}
        >
          Tags...
        </Input>
        <Input
          type="text"
          onChange={(e) => {
            setUserTags(e.target.value);
          }}
        >
          Friend tags...
        </Input>
        <Btn onClick={postHandler}>Post</Btn>
        {afterPostContent}
      </Container>
    </section>
  );
};

export default NewPost;
