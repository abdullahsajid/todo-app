export const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export const API_ROUTES = {
    SIGNUP: `${BACKEND_BASE_URL}/auth/signup`,
    LOGIN: `${BACKEND_BASE_URL}/auth/login`,
    TODO: `${BACKEND_BASE_URL}/todos`,
    
};
