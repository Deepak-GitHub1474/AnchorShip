import { Link } from "react-router-dom";

function PageNotFound() {

  return (
    <div className="min-h-[80vh] flex items-center justify-center flex-col">
      <Link to="/">
        <img
          src="https://res.cloudinary.com/dlt4ash36/image/upload/v1703921602/CodePen-404-Page_fkcbr4.gif"
          alt="err"
          className="sm:w-[800px] w-[95vw]"
        />
      </Link>
    </div>
  );
}

export default PageNotFound;
