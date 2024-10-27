import noData from "../assets/no-data.png"
const NoData = () => {
  return (
    <div className=" text-center">
      <img src={noData} alt="noData" />
      <h2>NoData</h2>
      <p>are you sure you want to delete this item ? if you are sure just click on delete it</p>
    </div>
  )
}

export default NoData