import { useEffect, useState } from "react";
import Button from "../../../components/Button";
import Header from "../../../components/Header";
import { PlusIcon } from "../../../assets/img/icons";
import { useNavigate } from "react-router-dom";
import { getInterests, saveInterestProfile } from "../../../api";

const ActivityProfile = () => {
  const [interests, setInterests] = useState([]);
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();
  const profileId = JSON.parse(localStorage.getItem("profileId"));

  // Fetch all interest from the server
  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const res = await getInterests();
        setInterests(res.data);
      } catch (error) {
        console.error("Error fetching interests", error);
      }
    };
    fetchInterests();
  }, []);

  // Handle Checkbox
  const handleCheckbox = (event) => {
    const interestId = parseInt(event.target.value);
    if (selected.includes(interestId)) {
      setSelected(selected.filter((id) => id !== interestId));
    } else {
      setSelected([...selected, interestId]);
    }
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selected.length === 0) {
      alert("Please select at least one interest.");
      return;
    }

    console.log("📤 Sending Data:", { profileId, interestId: selected });

    try {
      await saveInterestProfile({ profileId, interestId: selected });
      alert("Interests saved successfully!");
      navigate("/set-photo");
    } catch (error) {
      console.error("❌ API Error:", error.response?.data || error);
    }
  };

  return (
    <main className="template-parent-box">
      <div className="flex flex-col gap-6 fixed right-6 left-6 top-20">
        <Header
          heading="Represent your vibe!"
          desc="Pick an activity that speaks to your true self. What's your perfect match?"
        />

        <p className="font-medium text-sm">
          Choose the one that feels most like you!
        </p>
      </div>

      {/* form */}
      <div className="mt-36">
        <form onSubmit={handleSubmit} className="form-base-profile">
          <div className="flex flex-wrap gap-[10px]">
            {/* interest list */}

            {interests.map((interest) => {
              const isSelected = selected.includes(interest.id);

              return (
                <div key={interest.id}>
                  <label
                    htmlFor={`check-${interest.id}`}
                    className={`cursor-pointer ${
                      isSelected
                        ? "bg-primary text-tertiary"
                        : "bg-tertiary text-primary"
                    }  font-normal w-max flex gap-1 py-2 pl-[16px] pr-3 rounded-full border-[1px] border-primary`}
                  >
                    {interest.interest_name}
                    <PlusIcon color={`${isSelected ? "#FFFFFF" : "#267F53"}`} />
                  </label>
                  <input
                    type="checkbox"
                    value={interest.id}
                    onChange={handleCheckbox}
                    className="hidden"
                    id={`check-${interest.id}`}
                  />
                </div>
              );
            })}
          </div>

          <div className="button-box-next">
            <Button label="Next" type="primary" isLink={false} />
          </div>
        </form>
      </div>
    </main>
  );
};

export default ActivityProfile;
