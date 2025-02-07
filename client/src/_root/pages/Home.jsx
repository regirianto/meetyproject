import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import {
  heartLeftIcon,
  heartRightIcon,
  UpIcon,
  DownIcon,
  maleIcon,
  LoveIcon,
  femaleIcon,
} from "../../assets/img/icons"; // Added DownIcon
import ModalHome from "../../components/ModalHome";
import CloseIcon from "../../assets/img/icons/CloseIcon";
import { getHomeProfiles, likeUser } from "../../api";

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const [profiles, setProfiles] = useState([]);

  // ✅ Fetch daftar profil lawan jenis saat halaman dimuat
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await getHomeProfiles(user.id);
        console.log("API Response:", res); // Log the entire response
        setProfiles(res.data); // Access data only if res is defined
      } catch (error) {
        console.error("❌ Error fetching home profiles:", error);
      }
    };

    fetchProfiles();
  }, [user.id]);

  // ✅ Swipe handlers
  const handlers = useSwipeable({
    onSwipedLeft: () => handleSkip(),
    onSwipedRight: () => handleLike(),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  // Handle swipe left (skip)
  const handleSkip = () => {
    if (profiles.length === 0) return;
    setProfiles((prev) => prev.slice(1));
  };

  // ✅ Handle swipe right (Like)
  const handleLike = async () => {
    if (profiles.length === 0) return;

    const likedUserId = profiles[0]?.user_id;
    const likerId = user.id;

    console.log("🔍 Liking user:", { likerId, likedUserId }); // Debugging

    if (!likedUserId) return;

    try {
      console.log("💖 Liking user:", likedUserId);
      const response = await likeUser(user.id, likedUserId);
      console.log("✅ Like Response:", response.data);
    } catch (error) {
      console.error("❌ Error liking user:", error);
    }
    handleSkip();
  };

  // ✅ Jika tidak ada profil, tampilkan loading
  if (profiles.length === 0) {
    return <p className="text-center mt-10">🔄 Loading profiles...</p>;
  }

  // ✅ Ambil profil saat ini
  const currentProfile = profiles[0];

  return (
    <main className="mt-4">
      <div
        {...handlers}
        className="bg-blue-600 w-full h-[75vh] relative rounded-xl overflow-hidden"
      >
        {/* Profile Image */}
        <div className="absolute top-0 bottom-0 left-0 right-0">
          <img
            src={currentProfile.photo_profile || "/default-profile.png"}
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
                  <h3 className="text-3xl font-medium">
                    {currentProfile.name}, {currentProfile.age}
                  </h3>
                  <p className="text-xs text-neutral-300">
                    {currentProfile.bio || "No bio available"}
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
            <img
              src={currentProfile.photo_profile || "/default-profile.png"}
              alt=""
              className="w-full h-full object-cover"
            />
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
                  {currentProfile.name},{" "}
                  <span className="font-medium">{currentProfile.age}</span>
                </h3>
                <h5 className="flex w-max h-max gap-2 text-xs bg-tertiary border-primary text-primary border-[1px] py-1 px-2 rounded-full mt-1">
                  <img
                    src={
                      currentProfile.gender === "male" ? maleIcon : femaleIcon
                    }
                    alt=""
                    className="w-3"
                  />
                  {currentProfile.gender.charAt(0).toUpperCase() +
                    currentProfile.gender.slice(1)}
                </h5>
              </div>
              <p className="text-xs italic">
                {currentProfile.bio || "No bio available"}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">About me</h4>
              <p className="text-xs leading-relaxed">
                {currentProfile.about || "No additional details available."}
              </p>
            </div>

            {/* Interest */}
            <div>
              <div className="flex flex-wrap gap-2 p-4 border-[1px] border-neutral-2 rounded-lg">
                {currentProfile.interests.length > 0 ? (
                  currentProfile.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="bg-tertiary text-primary font-normal w-max py-[4.5px] px-3 rounded-full border-[1px] border-primary text-[11.25px] flex"
                    >
                      {interest}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500 text-xs">
                    No interests listed
                  </span>
                )}
              </div>
            </div>

            <div>
              <div className="flex flex-wrap gap-2 p-4 border-[1px] border-neutral-2 rounded-lg">
                <div className="grid grid-cols-3 gap-2">
                  {currentProfile.gallery.length > 0 ? (
                    currentProfile.gallery.map((image, index) => (
                      <div
                        key={index}
                        className="w-full h-[100px] bg-gray-300 rounded-md overflow-hidden"
                      >
                        <img
                          src={image}
                          alt={`Gallery image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-xs">No photos available</p>
                  )}
                </div>
              </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 flex gap-6 justify-center bg-gradient-to-b from-transparent to-white w-full px-4 py-6">
              <button
                className="bg-white rounded-full p-2 shadow-lg"
                onClick={handleSkip}
              >
                <CloseIcon color="#333333" size={36} />
              </button>
              <button
                className="bg-white rounded-full p-2 shadow-lg"
                onClick={handleLike}
              >
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
