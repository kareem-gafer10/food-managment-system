import { useEffect, useState } from "react";
import Router from "./router";
import { Toaster } from "react-hot-toast";
import InitialLoader from "./components/InitialLoader ";
const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  });

  return (
    <>
      <Toaster />
      {loading ? <InitialLoader /> : <Router />}
    </>
  );
};

export default App;
