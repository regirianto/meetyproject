import EditIcon from "../../assets/img/icons/EditIcon";
import photo from "../../assets/img/image-test.png";
import Line from "../../components/Line";

const Profile = () => {
  return (
    <main className="mt-10 w-full h-full overflow-y-auto">
      <div className="w-full flex flex-col items-center gap-3">
        {/* Photo Profile */}
        <div className="bg-white rounded-full p-2 border-4 border-primary">
          <div className="w-32 h-32 rounded-full overflow-hidden">
            <img src={photo} alt="" className="" />
          </div>
        </div>
        {/* Name */}
        <div className="flex flex-col items-center tracking-tighter gap-0.5 relative">
          <h2 className="font-semibold text-2xl">Alana, 22</h2>
          <p className="text-text">Love that what i like</p>
          <div className="absolute -right-2 -top-1">
            <EditIcon color="#267F53" size={20} />
          </div>
        </div>
        {/* Loved & Be Loved */}
        <div className="flex gap-10 tracking-tight mt-4">
          <div className="flex flex-col items-center gap-1">
            <h4 className="text-[#F146DD] font-medium">5</h4>
            <p className="text-sm">Liked You</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <h4 className="text-[#F17146] font-medium">11</h4>
            <p className="text-sm">You Liked</p>
          </div>
        </div>
      </div>
      {/* Detail Profile */}
      <div className="bg-tertiary mt-6 py-6 px-6 w-full rounded-md">
        <div className="max-w-2xl mx-auto mb-4">
          <h4 className="font-medium text-sm">About me</h4>
          <p className="text-xs text-text leading-relaxed mt-2">
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which dont look
          </p>
        </div>
        <Line />
        <div className="max-w-2xl mx-auto my-4">
          <h4 className="font-medium text-sm">Interest</h4>
          <div className="flex gap-2 flex-wrap">
            <div className="mt-4 bg-tertiary text-primary font-normal w-max py-[4.5px] px-3 rounded-full border-[1px] border-primary text-[11.25px]">
              Sport
            </div>
            <div className="mt-4 bg-tertiary text-primary font-normal w-max py-[4.5px] px-3 rounded-full border-[1px] border-primary text-[11.25px]">
              Sport
            </div>
          </div>
        </div>
        <Line />
        <div className="max-w-2xl mx-auto my-4">
          <h4 className="font-medium text-sm">Gallery</h4>
          <div className="grid grid-cols-3 gap-2 mt-4">
            <div className="w-full h-[100px] bg-gray-300 rounded-md">
              <img src={photo} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="w-full h-[100px] bg-gray-300 rounded-md">
              <img src={photo} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="w-full h-[100px] bg-gray-300 rounded-md">
              <img src={photo} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="w-full h-[100px] bg-gray-300 rounded-md">
              <img src={photo} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="w-full h-[100px] bg-gray-300 rounded-md">
              <img src={photo} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="w-full h-[100px] bg-gray-300 rounded-md">
              <img src={photo} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="w-full h-[100px] bg-gray-300 rounded-md">
              <img src={photo} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="w-full h-[100px] bg-gray-300 rounded-md">
              <img src={photo} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="w-full h-[100px] bg-gray-300 rounded-md">
              <img src={photo} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="w-full h-[100px] bg-gray-300 rounded-md">
              <img src={photo} alt="" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
