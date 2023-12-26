import { GITHUB_ENDPOINTS } from '../utils/endpoints';
import axios from 'axios';

const homeSectionService = {
  getProfile: username => axios
    .get(`${GITHUB_ENDPOINTS.profile}/${username}`)
    ?.then(res => res?.data)
    ?.catch(err => err?.message),
};

export default homeSectionService;
