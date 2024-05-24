import { Api } from "./axiosService";

export async function GetServices(payload) {
  const url = payload;

  return Api.get(url)
    .then((response) => {
      if (response?.status === 200) {
        return {
          message: "Success",
          success: true,
          data: response?.data,
        };
      } else {
        return {
          success: false,
          message: "Something went wrong",
          data: "",
          error: "",
        };
      }
    })
    .catch((e) => console.log("error =---->", e));
}
