import axios from "axios";
import { API_BASE_URI } from "../constants";
const API = axios.create({
  baseURL: API_BASE_URI,
  withCredentials: true,
  responseType: "json",
});

/**
 * Insert new user in database
 * @param formValues
 * @returns {Promise<{data: any, status: number}>}
 */
export async function register(formValues) {
  try {
    const result = await API.post("/register", formValues);
    return { data: result.data, status: result.status };
  } catch (err) {
    return { data: err.response.data, status: err.response.status };
  }
}

/**
 * Check if user exist in database
 * @param formValues
 * @returns {Promise<{data: any, status: number}>}
 */
export async function login(formValues) {
  try {
    const result = await API.post("/login", formValues);
    return { data: result.data, status: result.status };
  } catch (err) {
    return { data: err.response.data, status: err.response.status };
  }
}

/**
 * Logout the user
 * @returns {Promise<void>}
 */
export async function logout() {
  try {
    const result = await API.post("/logout");
    return result;
  } catch (err) {
    console.log(err.response);
  }
}

/**
 * check if the user is authenticated
 * @returns {Promise<{data: any, status: number}>}
 */
export async function isAuthenticated() {
  try {
    const result = await API.get("/authenticated");
    return { data: result.data, status: result.status };
  } catch (err) {
    return { data: err.response.data, status: err.response.status };
  }
}
