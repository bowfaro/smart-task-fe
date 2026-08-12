import { apiRequest } from "./axiosClient";

export async function getTagsApi() {
  return apiRequest<any>({
    url: "/tags",
    method: "GET",
  });
}
