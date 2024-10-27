import Header from "../../components/Header";
import HeaderImg from "../../assets/home-avatar.svg";
import ReciepeListHeader from "../../components/ReciepeListHeader";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Dashboard = () => {
  const { userData } = useContext(AuthContext);

  return (
    <div className="mt-6 ">
      <Header
        title={`Welcome ${userData?.userName}`}
        description="is a welcoming screen for the entry of the application , you can now see the options"
        img={HeaderImg}
      />
      <ReciepeListHeader />
    </div>
  );
};

export default Dashboard;
