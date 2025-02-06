import CloseIcon from "../../assets/img/icons/CloseIcon";
import EditIcon from "../../assets/img/icons/EditIcon";
import Photo from "../../assets/img/image-test.png";
import LabelInput from "../../components/LabelInput";

const EditProfile = () => {
  return (
    <main className="my-10 w-full overflow-y-auto">
      {/* Form */}
      <div className="text-[#333333]">
        <form className="flex flex-col gap-4">
          <div className="flex justify-center items-center mb-10">
            <div className="bg-white rounded-full p-2 border-4 border-primary relative">
              <div className="w-32 h-32 rounded-full overflow-hidden flex items-center justify-center">
                {/* Profile picture */}
                <img
                  src={Photo}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute right-0 bottom-0 cursor-pointer bg-primary p-3 rounded-full border-2 border-white">
                <EditIcon color="white" size={24} />
                <input type="file" accept="image/*" className="hidden" />
              </div>
            </div>
          </div>

          <div className="flex justify-between gap-6">
            <div className="flex flex-col w-1/2 gap-3">
              <LabelInput
                labelFor="name"
                label="Your Name"
                textSize="text-sm"
              />
              <input
                type="text"
                placeholder=""
                className="input-class w-full"
                name="name"
              />
            </div>
            <div className="flex flex-col w-1/2 gap-3">
              <LabelInput labelFor="bio" label="Bio" textSize="text-sm" />
              <input
                type="text"
                placeholder="Add your bio"
                className="input-class w-full placeholder:italic"
                name="bio"
              />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <LabelInput labelFor="about" label="About You" textSize="text-sm" />
            <textarea
              type="text"
              placeholder="Describe yourself"
              className="input-class w-full placeholder:italic py-4"
              name="about"
            />
          </div>
          <div className="flex justify-between gap-6">
            <div className="flex flex-col w-1/2 gap-3">
              <LabelInput
                labelFor="date"
                label="Birth Date"
                textSize="text-sm"
              />
              <input
                type="date"
                placeholder=""
                className="input-class w-full"
                name="date"
              />
            </div>
            <div className="flex flex-col w-1/2 gap-3">
              <LabelInput labelFor="gender" label="Gender" textSize="text-sm" />
              <div className="flex gap-2">
                <div className="checkbox-gender-profile">
                  <input
                    type="radio"
                    name="gender"
                    className=""
                    id="male"
                    value="male"
                  />
                  <LabelInput
                    label="Male"
                    labelFor="male"
                    addClasses="text-primary w-full h-full"
                  />
                </div>
                <div className="checkbox-gender-profile">
                  <input
                    type="radio"
                    name="gender"
                    className=""
                    id="female"
                    value="female"
                  />
                  <LabelInput
                    label="Female"
                    labelFor="female"
                    addClasses="text-primary w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <LabelInput
              labelFor="interest"
              label="Interest"
              textSize="text-sm"
            />
            <div className="bg-neutral-100 p-4 rounded-md flex items-center gap-3">
              <div className="bg-tertiary text-primary font-normal w-max py-[4.5px] px-3 pr-[8px] rounded-full border-[1px] border-primary text-[11.25px] flex">
                Story <CloseIcon color="#267F53" />
              </div>
              <p className="italic text-xs">+ Add your interest</p>
            </div>
          </div>
          <div className="flex justify-between gap-6">
            <div className="flex flex-col w-1/2 gap-3">
              <LabelInput
                labelFor="phone"
                label="Phone Number"
                textSize="text-sm"
              />
              <input
                type="number"
                placeholder=""
                className="input-class w-full"
                name="phone"
              />
            </div>
            <div className="flex flex-col w-1/2 gap-3">
              <LabelInput labelFor="email" label="Email" textSize="text-sm" />
              <input
                type="email"
                placeholder=""
                className="input-class w-full"
                name="email"
              />
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditProfile;
