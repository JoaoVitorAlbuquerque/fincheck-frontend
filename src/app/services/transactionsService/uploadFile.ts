import { httpClient } from "../httpClient";

export async function uploadFile(url: string, file: File) {
  await httpClient.put(url, file, {
    headers: {
      'Content-Type': file.type,
    },
  });
}
