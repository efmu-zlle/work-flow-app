interface IAPIConfig {
  BASE_URL: string;
  EndPoints: {
    test: string;
    signup: string;
    signin: string;
  };
}

export const APIConfig: IAPIConfig = {
  BASE_URL: "https://localhost:5001",
  EndPoints: {
    test: "/Auth/test",
    signup: "/Auth/signup",
    signin: "/Auth/signin",
  },
};
