import { useEffect, useState } from 'react';
import GoogleLogin from 'react-google-login';
import { IconBtn } from '../uiKit/UiKIt';

const LoginGoogle = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  const responseGoogle = (response) => {
    setName(response.profileObj.name);
    setEmail(response.profileObj.email);
    setImgUrl(response.profileObj.imageUrl);

    console.log(response.profileObj);
  };

  useEffect(() => {
    if (!(name && email && imgUrl)) return;

    console.log(`name: ${name}`);
    console.log(`email: ${email}`);
    console.log(`imgUrl: ${imgUrl}`);
  }, [name, email, imgUrl]);

  return (
    <GoogleLogin
      clientId="1029852783351-4f72fqmgojl6l4330dfo5d01jluic2ds.apps.googleusercontent.com"
      buttonText="Login with Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />
    // (
    //   <IconBtn icon={BsGoogle} className="grey">
    //     Login with Google
    //   </IconBtn>
    // )
  );
};

export default LoginGoogle;
