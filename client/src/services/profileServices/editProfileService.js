import httpReq from 'services/httpReq';

export default async (newUser, user, setUser) => {
  const tmpUser = user;
  const result = httpReq('friends/editProfile', newUser);

  tmpUser.name = result.data.name;
  tmpUser.image_url = result.data.image_url;
  tmpUser.nickname = result.data.nickname;
  tmpUser.bio = result.data.bio;
  tmpUser.email = result.data.email;

  setUser('user', { data: tmpUser });
  return result.data;
};
