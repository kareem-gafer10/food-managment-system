const Header = ({ title, description, img }) => {
  return (
    <div className=" header-bg my-4 overflow-hidden ">
      <div className="row align-items-center mx-5 ">
        <div className="col-md-8">
          <h2>{title}</h2>
          <p className=" recipe-title">{description}</p>
        </div>
        <div className="col-md-4 d-flex justify-content-md-end">
          <img className=" img-fluid" src={img} alt={title} />
        </div>
      </div>
    </div>
  );
};

export default Header;
