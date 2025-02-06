import { useEffect, useRef, useState } from "react";
import CloseIcon from "../../assets/img/icons/CloseIcon";
import EditIcon from "../../assets/img/icons/EditIcon";
import LabelInput from "../../components/LabelInput";
import { getUserProfile, updateUserProfile, getInterests } from "../../api";
import Button from "../../components/Button";
import ModalInterests from "../../components/ModalInterests";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [profile, setProfile] = useState({
    name: "",
    bio: "",
    about: "",
    birth_date: "",
    gender: "",
    phone: "",
    email: "",
    interests: [],
    photo_profile: "",
    newPhoto: null,
  });

  const [allInterests, setAllInterests] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getUserProfile(user.id);

        // debuggin
        console.log("Fetched Birth Date:", res.data.birth_date);

        setProfile({
          name: res.data.name || "",
          bio: res.data.bio || "",
          about: res.data.about || "",
          birth_date: res.data.birth_date || "",
          gender: res.data.gender || "",
          phone: res.data.phone || "", // ✅ Ensure phone is not undefined
          email: res.data.email || "", // ✅ Ensure email is not undefined
          interests: res.data.interests.map((interest) => interest.id) || [],
          photo_profile: res.data.photo_profile || "",
        });

        // Debugging: Log the profile state after setting it
        console.log("Profile State After Setting:", {
          name: res.data.name || "",
          bio: res.data.bio || "",
          about: res.data.about || "",
          birth_date: res.data.birth_date || "",
          gender: res.data.gender || "",
          phone: res.data.phone || "",
          email: res.data.email || "",
          interests: res.data.interests.map((interest) => interest.id) || [],
          photo_profile: res.data.photo_profile || "",
        });

        const interestsRes = await getInterests();
        setAllInterests(interestsRes.data);
      } catch (error) {
        console.error("❌ Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, [user.id]);

  const handleInterestClick = (interestId) => {
    setProfile((prevProfile) => {
      const newInterests = prevProfile.interests.includes(interestId)
        ? prevProfile.interests.filter((id) => id !== interestId)
        : [...prevProfile.interests, interestId];

      return { ...prevProfile, interests: newInterests };
    });
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const fileInputRef = useRef(null);

  const handleEditIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected file: ", file);
      const imageUrl = URL.createObjectURL(file);
      setProfile((prevProfile) => ({
        ...prevProfile,
        newPhoto: file,
        photo_profile: imageUrl,
      }));
      console.log("New Profile State: ", profile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", profile.name);
    formData.append("bio", profile.bio);
    formData.append("about", profile.about || "");
    formData.append("birth_date", profile.birth_date || "");
    formData.append("gender", profile.gender || "");
    formData.append("phone", profile.phone);
    formData.append("email", profile.email);
    formData.append("interests", JSON.stringify(profile.interests));

    // Append new profile photo if selected
    if (profile.newPhoto) {
      formData.append("photo", profile.newPhoto);
    }

    // Debugging
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      await updateUserProfile(user.id, formData);
      alert("Profile updated successfully!");
      navigate("/user-profile");
    } catch (error) {
      console.error("❌ API Error:", error.response?.data || error);
    }
  };

  return (
    <main className="my-10 w-full overflow-y-auto">
      {/* Form */}
      <div className="text-[#333333]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Photo */}
          <div className="flex justify-center items-center mb-10">
            <div className="bg-white rounded-full p-2 border-4 border-primary relative">
              <div className="w-32 h-32 rounded-full overflow-hidden flex items-center justify-center">
                {/* Profile picture */}
                {profile.photo_profile ? (
                  <img
                    src={
                      profile.photo_profile.startsWith("blob")
                        ? profile.photo_profile
                        : profile.photo_profile
                    }
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <p className="text-sm text-gray-500">No Image</p>
                )}
              </div>

              {/* Edit button */}
              <div
                className="absolute right-0 bottom-0 cursor-pointer bg-primary p-3 rounded-full border-2 border-white"
                onClick={handleEditIconClick}
              >
                <EditIcon color="white" size={24} />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handlePhotoChange}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between gap-6">
            {/* Name */}
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
                value={profile.name}
                onChange={handleChange}
              />
            </div>

            {/* Bio */}
            <div className="flex flex-col w-1/2 gap-3">
              <LabelInput labelFor="bio" label="Bio" textSize="text-sm" />
              <input
                type="text"
                placeholder="Add your bio"
                className="input-class w-full placeholder:italic"
                name="bio"
                value={profile.bio}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* About */}
          <div className="flex flex-col gap-3">
            <LabelInput labelFor="about" label="About You" textSize="text-sm" />
            <textarea
              type="text"
              placeholder="Describe yourself"
              className="input-class w-full placeholder:italic py-4"
              name="about"
              value={profile.about}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-between gap-6">
            {/* Date */}
            <div className="flex flex-col w-1/2 gap-3">
              <LabelInput
                labelFor="birth_date"
                label="Birth Date"
                textSize="text-sm"
              />
              <input
                type="date"
                placeholder=""
                className="input-class w-full"
                name="birth_date"
                value={profile.birth_date || ""}
                onChange={(e) =>
                  setProfile({ ...profile, birth_date: e.target.value })
                }
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
                    checked={profile.gender === "male"}
                    onChange={() => setProfile({ ...profile, gender: "male" })}
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
                    checked={profile.gender === "female"}
                    onChange={() =>
                      setProfile({ ...profile, gender: "female" })
                    }
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
            <div className="bg-neutral-100 p-4 rounded-md flex flex-wrap items-center gap-3">
              {[...new Set(profile.interests)].map((interestId, index) => (
                <div
                  key={`${interestId}-${index}`} // Ensure uniqueness
                  className="bg-tertiary text-primary font-normal w-max py-[4.5px] px-3 pr-[8px] rounded-full border-[1px] border-primary text-[11.25px] flex"
                >
                  {allInterests.find((i) => i.id === interestId)
                    ?.interest_name || "Unknown"}
                  <CloseIcon color="#267F53" />
                </div>
              ))}
              <p className="italic text-xs" onClick={() => setModalOpen(true)}>
                + Add your interest
              </p>
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
                value={profile.phone}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col w-1/2 gap-3">
              <LabelInput labelFor="email" label="Email" textSize="text-sm" />
              <input
                type="email"
                placeholder=""
                className="input-class w-full"
                name="email"
                value={profile.email}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Modal */}
          <ModalInterests
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
          >
            <h2 className="text-lg font-semibold">Select Interests</h2>
            <div className="flex flex-wrap gap-3">
              {allInterests.map((interest) => (
                <button
                  key={interest.id}
                  className={`px-3 py-1 rounded-full border ${
                    profile.interests.includes(interest.id)
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-black"
                  }`}
                  onClick={() => handleInterestClick(interest.id)}
                >
                  {interest.interest_name}
                </button>
              ))}
            </div>
            <button
              onClick={() => setModalOpen(false)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Select
            </button>
          </ModalInterests>

          <div className="mt-5">
            <Button label="Update" type="primary" isLink={false} />
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditProfile;
