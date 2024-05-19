import { useCallback, useContext } from "react";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_URL;

const useAxios = () => {
  const request = useCallback(
    async ({
      baseUrl = BASE_URL,
      url = "",
      method = "get",
      data = null,
      headers = {},
      includeToken = true,
    }) => {
      try {
        const response = await axios({
          method,
          url: `${baseUrl}api/${url}`,
          data,
          headers,
        });

        return response?.data;
      } catch (error) {
        const { statusCode, message } = error?.response?.data ?? {};
        if (statusCode > 299) {
          console.log(message);
        }
      }
    }
  );
  return { request };
};

export default useAxios;
