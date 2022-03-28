export class ApiError extends Error {
  constructor(url: string, public status: number) {
    super(`'${url}' returned ${status}`);
    if (Error.captureStackTrace) {
      //사용자 지정오류를 설정할 때
      Error.captureStackTrace(this, ApiError); //커스텀 에러 이름을 ApiError로 지었음
    }
    this.name = 'ApiError';
  }
}

export async function fetchJson(
  url: string,
  options?: RequestInit
): Promise<any> {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new ApiError(url, response.status);
  }
  return await response.json();
}
