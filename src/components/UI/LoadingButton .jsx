
const LoadingButton  = ({ loading, buttonText }) => {
  return (
    <button type="submit" className={`btn btn-success w-100 mt-3 fw-bold`}>
      {!loading ? buttonText
       : <div className="spinner-border" style={{ width: "25px", height: "25px" }}></div>
      }
    </button>
  )
}

export default LoadingButton 