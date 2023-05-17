import { useState } from "react";
import useFetch from "../hooks/useFetch";
import { EndPoints, IUser } from "../interfaces";

function SignUpPage() {
  const [
    { isLoading, data, error, messageSuccess, messageError },
    sendRequest,
  ] = useFetch<IUser[]>({ method: "GET", url: `${EndPoints.test}` });

  const [user, setUser] = useState<IUser>({
    username: "",
    email: "",
    password: "",
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleClick = () => {
    sendRequest({
      method: "POST",
      url: `${EndPoints.signup}`,
      body: user,
    });
  };

  return (
    <>
      <button onClick={() => handleClick()}>click here</button>
      {data?.map((e) => (
        <div key={e.userId}>
          <span>{e.username}</span>
        </div>
      ))}
      {messageSuccess}
      {messageError}
    </>
  );
}

export default SignUpPage;
