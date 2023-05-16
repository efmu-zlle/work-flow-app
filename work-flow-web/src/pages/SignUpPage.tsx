import useAxios from "../hooks/useFetch";
import { APIConfig } from "../services/EndPoints";

function SignUpPage() {
  const [{ data, isLoading, error }, setConfig] = useAxios<IUser[]>({});

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error:</div>;
  }

  const handleClick = () => {
    setConfig({
      method: "get",
      url: `${APIConfig.BASE_URL}/api${APIConfig.EndPoints.test}`,
    });
  };

  return (
    <>
      <button onClick={() => handleClick()}>click here</button>
      <div>{data?.map((e) => e.username)}</div>{" "}
    </>
  );
}

export default SignUpPage;
