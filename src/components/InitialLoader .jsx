import { InfinitySpin } from "react-loader-spinner";

const InitialLoader = () => {
 

  return (
    <div className=" d-flex justify-content-center align-items-center vh-100 bg-black">
      <InfinitySpin
        visible={true}
        width="200"
        color="#4fa94d"
        ariaLabel="infinity-spin-loading"
      />
    </div>
  );
};

export default InitialLoader;
