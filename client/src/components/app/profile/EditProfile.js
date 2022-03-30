import { Btn, IconBtn, Input, Loading } from 'components/uiKit/UiKIt';
import { useEffect, useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { storage } from 'firebases';
import { v4 as uuidv4 } from 'uuid';
import editProfileService from 'services/profileServices/editProfileService';

const EditProfile = (props) => {
  const [name, setName] = useState();
  const [nickname, setNickname] = useState();
  const [bio, setBio] = useState();
  const [image, setImage] = useState();
  const [email, setEmail] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [isChange, setIsChange] = useState(false);

  const imgClickHandler = (e) => {
    if (!isChange) setIsChange(true);
    const reader = new FileReader();
    setImage(e.target.files[0]);
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImageUrl(reader.result);
    };
  };

  const changeHandler = (setOption, value) => {
    if (!isChange) setIsChange(true);
    setOption(value);
  };

  const submitHandler = async () => {
    if (!isChange) return;
    if (image) {
      const id = uuidv4();
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
            .then(async (url) => {
              await editProfileService(
                {
                  _id: props.user._id,
                  name: name,
                  image_url: url,
                  nickname: nickname,
                  bio: bio,
                  email: email,
                },
                props.user,
                props.setCookies
              );
              props.userClicked(props.user._id);
              console.log(url);
            });
        }
      );
    } else {
      await editProfileService(
        {
          _id: props.user._id,
          name: name,
          image_url: imageUrl,
          nickname: nickname,
          bio: bio,
          email: email,
        },
        props.user,
        props.setCookies
      );
    }
    props.userClicked(props.user._id);
    props.save();
  };

  useEffect(async () => {
    setName(props.user.name);
    setNickname(props.user.nickname);
    setBio(props.user.bio);
    setEmail(props.user.email);
    setImageUrl(props.user.image_url);
  }, [props.user]);

  return imageUrl ? (
    <div className="edit_profile">
      <form className="edit_profile__container">
        <label className="edit_profile__container__img_container">
          <img className="new_img" src={imageUrl} />
          <IconBtn icon={AiOutlineEdit}></IconBtn>
          <input className="img_input" type="file" onChange={imgClickHandler}></input>
        </label>
        <Input value={name} text="Full Name" onChange={(value) => changeHandler(setName, value)}>
          Full Name...
        </Input>
        <Input value={nickname} text="Nickname" onChange={(value) => changeHandler(setNickname, value)}>
          Nickname...
        </Input>
        <Input textarea={true} value={bio} text="Bio" onChange={(value) => changeHandler(setBio, value)}>
          Bio...
        </Input>
        <Input value={email} text="Email" onChange={(value) => changeHandler(setEmail, value)}>
          Email...
        </Input>
        <Btn type="submit" onClick={submitHandler} className={isChange ? '' : 'disable'}>
          Submit
        </Btn>
      </form>
    </div>
  ) : (
    <Loading />
  );
};

export default EditProfile;
