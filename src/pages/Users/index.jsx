import Header from "../../components/Header";
import HeaderImg from "../../assets/header.png";
import SpecialTitle from "../../components/SpecialTitle";
import DsiplayUsers from "../../components/DsiplayUsers";
const Users = () => {
  return (
    <div className="container-fluid mt-6">
      <Header
        title="Users List"
        description="You can now add your items that any user can order it from the Application and you can edit"
        img={HeaderImg}
      />
      <SpecialTitle
        title="Recipe Table Details"
        subtitle="You can check all details"
      />

      <DsiplayUsers />
    </div>
  );
};

export default Users;
