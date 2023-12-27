import { GITHUB_ENDPOINTS } from '../utils/endpoints';
import axios from 'axios';

const GITHUB_API_BASE_URL = 'https://api.github.com';

const githubInfoService = {
  getProfile: username =>
    axios
      .get(`${GITHUB_API_BASE_URL.profile}/users/${username}`)
      ?.then(res => res?.data)
      ?.catch(err => console.log('GETPROFILE ERR:', err)),

  getReadmeContent: username =>
    axios
      .get(` https://api.github.com/repos/${username}/${username}/contents/README.md`)
      ?.then(res => res?.data)
      ?.catch(err => console.log('GETREADME ERR:', err)),
};

export default githubInfoService;
