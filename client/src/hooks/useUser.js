import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../redux/userReducer";

const useUser = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = function authenticateUser() {
      axios({
        method: "get",
        withCredentials: true,
        url: "http://localhost:4000/api/user",
      }).then((res) => {
        dispatch(getUser(res.data));
        console.log(res.data);
        setIsLoading(false);
      });
    };
    return unsubscribe;
  }, [dispatch]);

  return { user, isLoading };
};

export default useUser;
