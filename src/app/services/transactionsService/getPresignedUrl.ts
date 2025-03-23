import { httpClient } from "../httpClient";

export async function getPresignedUrl({ fileName }: { fileName: string | undefined }) {
  const { data } = await httpClient.put<{ signedUrl: string }>('/transactions/file', { fileName });

  console.log('Resposta do servidor:', data.signedUrl);

  return data.signedUrl;
}
