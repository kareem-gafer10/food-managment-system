
import { useEffect, useState } from "react";
import baseInstance from "../config/baseInstance";

const useDisplayTable = (url, searchTerms, pageNumber) => {
  const [usersList, setUsersList] = useState([]);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(0);
  const [loading, setLoading] = useState(true);

  const getCurrentUsers = async () => {
    try {
      setLoading(true);
      const { userName, email, country, group, name, tagId, categoryId } =
        searchTerms;

      const { data } = await baseInstance.get(`${url}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          name,
          userName,
          email,
          country,
          groups: group,
          tagId,
          categoryId,
          pageNumber,
        },
      });

      setUsersList(data.data);
      setTotalNumberOfPages(data.totalNumberOfPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentUsers();
  }, [searchTerms, pageNumber]);

  return { usersList, getCurrentUsers, totalNumberOfPages, loading };
};

export default useDisplayTable;
