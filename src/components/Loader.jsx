import { Blocks } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className=" text-center">
      <Blocks
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="blocks-loading"
        wrapperClass="blocks-wrapper"
        visible={true}
      />
    </div>
  );
};

export default Loader;
