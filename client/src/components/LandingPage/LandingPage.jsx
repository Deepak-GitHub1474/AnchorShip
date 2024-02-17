import servicesData from "./Data/servicesData";
import companyData from "./Data/companyData";
import SuccessStoryData from "./Data/successStory";
import AutoType from "../AutoType/AutoType";
import { Link } from "react-router-dom";

const LandingPage = () => {

  return (
    <main className=" min-h-[90vh] flex flex-col items-center justify-center gap-10 sm:px-24 px-2 py-8">
      <div className=" flex flex-col gap-16">

        <section className="flex justify-evenly items-center flex-wrap-reverse xl:flex-nowrap gap-10">
          <div className="flex flex-col items-center xl:items-start justify-center ml-4 mr-4">
            <h1 className="sm:text-4xl text-2xl font-bold mb-4 md:hidden block">
              Upscaling Made
            </h1>
            <div className="sm:text-4xl text-2xl font-bold flex items-center">
              <span className="hidden md:block">Upscaling</span>
              <AutoType />
            </div>
            <h1 className="sm:text-4xl text-2xl font-bold mt-4">
              With DeveloperString
            </h1>
            <p className="sm:text-lg text-base max-w-[600px] mt-8 mb-8">
              DeveloperString is your one-stop-shop for upscaling. Get maximum
              value for time and resources you invest, with the best job in the market.
            </p>
            <Link to="/internship" >
              <button className="text-white bg-[#ee5555] p-3 sm:w-56 w-72 rounded sm:text-lg text-base hover:bg-[#e86969]">
                Explore Internships
              </button>
            </Link>
          </div>
          <div className="relative flex items-center justify-center">
            <img
              src="https://res.cloudinary.com/dlt4ash36/image/upload/v1700534738/hero-shadow_dg4u77.png"
              alt="cover-shadow-img"
              className="w-[71%] absolute top-14"
            />
            <img
              src="https://res.cloudinary.com/dlt4ash36/image/upload/v1700534734/hero-bg_pabyfl.png"
              alt="cover-img"
              className="sm:w-[75%] w-[90%] relative z-10"
            />
          </div>
        </section>

        <section className=" flex flex-col gap-16">

          <div className="flex items-center justify-evenly flex-wrap gap-5 drop-shadow-md">
            {servicesData.map((el) => (
              <div
                key={el.id}
                className="shadow-[0_0_10px_#cecece] flex items-center justify-center gap-5 drop-shadow-md p-5 w-72 rounded-lg"
              >
                <img src={el.img} alt="logo" />
                <div>
                  <h1 className="font-medium text-xl">
                    <b>{el.number}</b>
                  </h1>
                  <p>{el.category}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4 max-w-[95vw]">
            <h1 className="sm:text-3xl text-2xl font-bold md:text-left text-center">
              Our Achievers Work With
            </h1>
            <div className="flex items-center justify-center flex-wrap gap-8">
              {companyData.map((el) => (
                <div
                  key={el.id}
                  className="shadow-[0_0_10px_#cecece] flex items-center justify-center gap-5 drop-shadow-md p-7 w-64 rounded-lg"
                >
                  <img
                    src={el.companyLogo}
                    alt="company-logo"
                    className="w-32"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 max-w-[95vw]">
            <h1 className="sm:text-3xl text-2xl font-bold md:text-left text-center">Success Stories</h1>

            <div className="flex items-center mx-auto gap-12 p-2 overflow-x-auto max-w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {SuccessStoryData.map((el) => (
                <div
                  key={el.id}
                  className="shadow-[0_0_10px_#cecece] flex justify-center flex-col gap-5 min-w-[280px] max-w-[280px] h-[350px] rounded-md overflow-hidden relative"
                >
                  <div className="bg-[#cdddc5] p-2 w-full text-[#33a44f] font-bold text-center absolute top-0">
                    {`${el.increment} Increment`}
                  </div>
                  <div className="flex items-center gap-4 ml-4 mt-4">
                    <div className="w-11 h-11 flex items-center justify-center rounded-full bg-[#cccbcb]">
                      {el.shortName}
                    </div>
                    <div>
                      <h1 className="text-lg font-semibold">{el.name}</h1>
                      <p className="text-sm text-[#575757] font-semibold">
                        {el.role}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-[#6d6d6d] ml-4 mr-2">
                    {el.story}
                  </div>
                  <div className="flex items-center justify-around ml-4 mr-2">
                    <div>
                      <h1 className="font-semibold">From</h1>
                      <img src={el.from} alt="logo" className="w-24" />
                    </div>
                    <div>
                      <img
                        src={el.arrorImg}
                        alt="arrow"
                        className="ml-1 mr-5"
                      />
                    </div>
                    <div>
                      <h1 className="font-semibold">To</h1>
                      <img src={el.to} alt="logo" className="w-24" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default LandingPage;
