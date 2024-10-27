import { Link } from "react-router-dom";

const SpecialTitle = ({ title, subtitle, button,path,onckick }) => {
  return (
    <div className=" d-flex justify-content-between flex-wrap align-items-center mx-5">
      <div>
        <h5>{title}</h5>
        <p>{subtitle}</p>
      </div>
      {
        button &&  
        <Link to={path}>
        <button onClick={onckick} className=" btn btn-success px-3 py-2 px-lg-5 py-md-3  fw-bold">{button}</button>
        </Link>
      }
     
    </div>
  );
};

export default SpecialTitle;
