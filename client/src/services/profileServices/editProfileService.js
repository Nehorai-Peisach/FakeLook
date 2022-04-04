import httpReq from 'services/httpReq';
import updateProfileService from './updateProfileService';

export default async (newUser) => {
  const result = httpReq('friends/editProfile', newUser, 'editProfileService');
  await updateProfileService(newUser._id);

  return result.data;
};
