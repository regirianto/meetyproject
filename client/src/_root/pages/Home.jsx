import Photo from "../../assets/img/person.jpeg";
import { heartLeftIcon, heartRightIcon } from "../../assets/img/icons";

const Home = () => {
  return (
    // Content
    <main className="mt-4">
      <div className="absolute top-20 left-4 right-4 bottom-[105px] rounded-xl overflow-hidden">
        <img
          src={Photo}
          alt="profile photo"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 black-gradient text-white flex flex-col justify-end px-5 py-5 gap-3">
          {/* Left Right Icon */}
          <div className="absolute left-0 top-1/2">
            <img src={heartLeftIcon} alt="heart icon" />
          </div>
          <div className="absolute right-0 top-1/2">
            <img src={heartRightIcon} alt="heart icon" />
          </div>

          <span className="bg-tertiary w-max text-primary border-2 border-primary text-sm italic font-medium px-2 py-1 rounded-full">
            Photography
          </span>
          <div className="flex flex-col gap-4">
            <h3 className="text-3xl font-medium">Sanjaya, 29</h3>
            <p className="text-xs text-neutral-300">
              &quot;Cari teman sehobby dan sehappy.&quot;
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
