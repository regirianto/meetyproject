import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import Photo from "../../assets/img/person.jpeg";
import {
  heartLeftIcon,
  heartRightIcon,
  UpIcon,
  DownIcon,
  maleIcon,
  LoveIcon,
} from "../../assets/img/icons"; // Added DownIcon
import ModalHome from "../../components/ModalHome";
import CloseIcon from "../../assets/img/icons/CloseIcon";

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);

  // ✅ Swipe handlers
  const handlers = useSwipeable({
    onSwipedLeft: () => console.log("❌ Swiped Left (Skip Profile)"),
    onSwipedRight: () => console.log("💖 Swiped Right (Like Profile)"),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <main className="mt-4">
      <div
        {...handlers}
        className="bg-blue-600 w-full h-[75vh] relative rounded-xl overflow-hidden"
      >
        {/* Profile Image */}
        <div className="absolute top-0 bottom-0 left-0 right-0">
          <img
            src={Photo}
            alt="profile photo"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 black-gradient text-white flex flex-col justify-end px-5 py-5 gap-3">
            <div className="absolute left-0 top-1/2">
              <img src={heartLeftIcon} alt="heart icon" />
            </div>
            <div className="absolute right-0 top-1/2">
              <img src={heartRightIcon} alt="heart icon" />
            </div>

            <div className="flex justify-between items-end">
              <div className="flex flex-col gap-2">
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
              <button
                className="bg-tertiary border-2 border-primary h-max w-max p-2 rounded-full z-50"
                onClick={() => setModalOpen(!modalOpen)}
              >
                {modalOpen ? (
                  <DownIcon color="#267F53" size={16} />
                ) : (
                  <UpIcon color="#267F53" size={16} />
                )}
              </button>
            </div>
          </div>
        </div>

        <ModalHome isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          <div className="w-full h-[65vh]">
            <img src={Photo} alt="" className="w-full h-full object-cover" />
          </div>

          {/* Profile Box */}
          <div className="bg-white px-4 py-6 flex flex-col gap-6 tracking-tight text-text relative">
            <button
              className="bg-primary border-2 border-primary h-max w-max p-2 rounded-full absolute -top-5 right-6"
              onClick={() => setModalOpen(!modalOpen)}
            >
              <DownIcon color="#ffffff" size={20} />
            </button>
            <div className="">
              <div className="flex gap-4">
                <h3 className="text-2xl font-semibold mb-2">
                  Sanjaya, <span className="font-medium">26</span>
                </h3>
                <h5 className="flex w-max h-max gap-2 text-xs bg-tertiary border-primary text-primary border-[1px] py-1 px-2 rounded-full mt-1">
                  <img src={maleIcon} alt="" className="w-3" />
                  Male
                </h5>
              </div>
              <p className="text-xs italic">
                &quot;Cari teman sehobby dan sehappy.&quot;
              </p>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">About me</h4>
              <p className="text-xs leading-relaxed">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Doloremque, aut harum culpa aperiam reiciendis impedit non?
                Quas, sapiente cum. Repellendus aut labore, dolores quibusdam
                ipsa voluptatum obcaecati quis reiciendis libero.
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-2 p-4 border-[1px] border-neutral-2 rounded-lg">
                <span className="bg-tertiary text-primary font-normal w-max py-[4.5px] px-3 rounded-full border-[1px] border-primary text-[11.25px] flex">
                  Story
                </span>
                <span className="bg-tertiary text-primary font-normal w-max py-[4.5px] px-3 rounded-full border-[1px] border-primary text-[11.25px] flex">
                  Story
                </span>
                <span className="bg-tertiary text-primary font-normal w-max py-[4.5px] px-3 rounded-full border-[1px] border-primary text-[11.25px] flex">
                  Story
                </span>
              </div>
            </div>

            <div>
              <div className="flex flex-wrap gap-2 p-4 border-[1px] border-neutral-2 rounded-lg">
                <div className="grid grid-cols-3 gap-2">
                  <div className="w-full h-[110px] bg-gray-300 rounded-md overflow-hidden">
                    <img
                      src={Photo}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-full h-[110px] bg-gray-300 rounded-md overflow-hidden">
                    <img
                      src={Photo}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-full h-[110px] bg-gray-300 rounded-md overflow-hidden">
                    <img
                      src={Photo}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-full h-[110px] bg-gray-300 rounded-md overflow-hidden">
                    <img
                      src={Photo}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 flex gap-6 justify-center bg-gradient-to-b from-transparent to-white w-full px-4 py-6">
              <button className="bg-white rounded-full p-2 shadow-lg">
                <CloseIcon color="#333333" size={36} />
              </button>
              <button className="bg-white rounded-full p-2 shadow-lg">
                <LoveIcon color="#267F53" size={36} />
              </button>
            </div>
          </div>
        </ModalHome>
      </div>
    </main>
  );
};

export default Home;
