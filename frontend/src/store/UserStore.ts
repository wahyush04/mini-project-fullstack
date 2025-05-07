import { createApiStore } from './api';
import type { UserModel } from '../types/user';

export const useUserStore = createApiStore<UserModel[]>();