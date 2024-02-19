import servicesData from "./Data/servicesData";
import companyData from "./Data/companyData";
import SuccessStoryData from "./Data/successStory";
import AutoType from "../AutoType/AutoType";
import { Link } from "react-router-dom";

const LandingPage = () => {

  return (
    <main className=" min-h-[90vh] flex flex-col items-center justify-center gap-10 xs:px-24 px-2 py-8">
      <div className=" flex flex-col gap-16">

        <section className="flex justify-evenly items-center flex-wrap-reverse xl:flex-nowrap gap-10">
          <div className="flex flex-col items-center xl:items-start justify-center mx-4">
            <h1 className="xs:text-4xl text-2xl font-bold mb-4 md:hidden block">
              Upscaling Made
            </h1>
            <div className="xs:text-4xl text-xl font-bold flex items-center">
              <span className="hidden md:block">Upscaling</span>
              <AutoType />
            </div>
            <h1 className="xs:text-4xl text-xl font-bold mt-4">
              With DeveloperString
            </h1>
            <p className="xs:text-lg text-base max-w-[600px] my-8">
              DeveloperString is your one-stop-shop for upscaling. Get maximum
              value for time and resources you invest, with the best job in the market.
            </p>
            <Link to="/internship" >
              <button className="text-white bg-[#ee5555] py-3 px-1 w-64 rounded-lg hover:bg-[#e86969]">
                Explore Internships
              </button>
            </Link>
          </div>
          <div className="relative flex items-center justify-center">
            <img
              src="https://res.cloudinary.com/dlt4ash36/image/upload/v1700534738/hero-shadow_dg4u77.png"
              alt="cover-shadow-img"
              className="w-[75vw] absolute top-14"
            />
            <img
              src="https://res.cloudinary.com/dlt4ash36/image/upload/v1700534734/hero-bg_pabyfl.png"
              alt="cover-img"
              className="xs:w-[75%] w-[90vw] relative z-10"
            />
          </div>
        </section>

        <section className=" flex flex-col gap-16">

          <div className="flex items-center justify-evenly flex-wrap gap-5">
            {servicesData.map((el) => (
              <div
                key={el.id}
                className="shadow-[0_0_6px_gray] flex items-center justify-center gap-5 px-6 py-4 w-64 rounded-lg"
              >
                <img src={el.img} alt="logo" className="max-w-10 max-h-10"/>
                <div>
                  <h1 className="font-medium text-lg text-gray-950">
                    <b>{el.number}</b>
                  </h1>
                  <p className="text-sm">{el.category}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4 text-gray-950">
            <h1 className="xs:text-3xl text-xl font-bold md:text-left text-center">
              Our Achievers Work With
            </h1>
            <div className="flex items-center justify-center flex-wrap gap-5">
              {companyData.map((el) => (
                <div
                  key={el.id}
                  className="shadow-[0_0_6px_gray] flex items-center justify-center gap-5 p-6 w-64 rounded-lg"
                >
                  <img
                    src={el.companyLogo}
                    alt="company-logo"
                    className="w-28"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 max-w-[95vw]">
            <h1 className="xs:text-3xl text-xl font-bold md:text-left text-center text-gray-950">Success Stories</h1>

            <div className="flex items-center mx-auto gap-5 p-2 overflow-x-auto max-w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {SuccessStoryData.map((el) => (
                <div
                  key={el.id}
                  className="shadow-[0_0_6px_gray] flex justify-center flex-col gap-5 min-w-[280px] max-w-[280px] h-[350px] rounded-md overflow-hidden relative"
                >
                  <div className="bg-[#cdddc5] p-2 w-full text-[#33a44f] font-bold text-center absolute top-0">
                    {`${el.increment} Increment`}
                  </div>
                  <div className="flex items-center gap-4 ml-4 mt-4">
                    <div className="w-11 h-11 flex items-center justify-center rounded-full bg-[#cccbcb] text-gray-950 font-semibold">
                      {el.shortName}
                    </div>
                    <div>
                      <h1 className="text-lg font-semibold text-gray-950">{el.name}</h1>
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
                      <h1 className="font-semibold text-gray-950">From</h1>
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
                      <h1 className="font-semibold text-gray-950">To</h1>
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
