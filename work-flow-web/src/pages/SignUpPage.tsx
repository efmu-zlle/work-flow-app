import useAxios from "../hooks/useFetch";
import { EndPoints, IUser } from "../interfaces";

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
      url: `/api${EndPoints.test}`,
    });
  };

  return (
    <>
      <button onClick={() => handleClick()}>click here</button>
      <div>{data?.map((e) => e.email)}</div>{" "}
    </>
  );
}

export default SignUpPage;
