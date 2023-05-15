interface IApiConfig {
  BASE_URL: string;
  EndPoints: {
    test: string;
    signup: string;
    signin: string;
  };
}

export const ApiConfig: IApiConfig = {
  BASE_URL: "https://example.com/",
  EndPoints: {
    test: "test/",
    signup: "signup/",
    signin: "signin",
  },
};
