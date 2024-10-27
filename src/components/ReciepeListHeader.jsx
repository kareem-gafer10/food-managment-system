import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ReciepeListHeader = () => {
    const navigate = useNavigate();


    const goToReciepeList=()=>{
        navigate("/dashboard/recipes");
    }


  return (
    <div className=" recipe-list-header mx-3 mx-md-5">
      <div className="row align-items-center px-5 py-2 ">
        <div className="col-md-8">
        <h2> Fill the <span className="text-success">Recipes !</span></h2>
          <p className="recipe-title "> 
          you can now fill the meals easily using the table and form , click here and sill it with the table !</p>
        </div>
        <div className="col-md-4 d-flex justify-content-md-end">
        <button onClick={goToReciepeList}  className="btn btn-success px-3 py-2 px-lg-5 py-md-3  fw-bold">
            Fill Reciepes <FaArrowRight className=" ms-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReciepeListHeader;
