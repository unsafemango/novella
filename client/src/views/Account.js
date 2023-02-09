import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Account = () => {
  const [title] = useState("Account");
  const { user } = useSelector((state) => state.user);

  const account = user.payload ? user.payload : null;

  useEffect(() => {
    document.title = title;
    console.log(user);
  }, [title, user]);
  return (
    <>
      <div className="content">
        <h1>Account</h1>
        {account ? <h1>Welcome back {account.username}</h1> : null}
      </div>
    </>
  );
};

export default Account;
