import { useEffect, useState } from "react";
import Button from "../../../components/Button";
import Header from "../../../components/Header";
import { PlusIcon } from "../../../assets/img/icons";
import { interestList } from "../../../constant";

const ActivityProfile = () => {
  const [isChecked, setIsChecked] = useState([]);
  const [scrollActive, setScrollActive] = useState(false);

  const handleCheckbox = (id, event) => {
    if (event.target.checked) {
      console.log("checked ", id);
      setIsChecked((prev) => [...prev, id]);
    } else {
      console.log("unchecked ", id);
      setIsChecked((prev) => prev.filter((checkedId) => checkedId !== id));
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const targetHeight = 500;

      scrollPosition > targetHeight
        ? setScrollActive(true)
        : setScrollActive(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        <form className="form-base-profile">
          <div className="flex flex-wrap gap-[10px]">
            {/* interest list */}
            {interestList.map((interest) => (
              <div key={interest.id}>
                <label
                  htmlFor={`check-${interest.id}`}
                  className={`${
                    isChecked.includes(interest.id)
                      ? "bg-primary text-white"
                      : "bg-tertiary text-primary"
                  }  font-normal w-max flex gap-1 py-2 pl-[16px] pr-3 rounded-full border-[1px] border-primary`}
                >
                  {interest.label}
                  <PlusIcon
                    color={`${
                      isChecked.includes(interest.id) ? "#FFFFFF" : "#267F53"
                    }`}
                  />
                </label>
                <input
                  type="checkbox"
                  checked={isChecked.includes(interest.id)}
                  onChange={(e) => handleCheckbox(interest.id, e)}
                  className="hidden"
                  id={`check-${interest.id}`}
                />
              </div>
            ))}
          </div>

          <div className="button-box-next">
            <Button
              label="Next"
              type="primary"
              isLink={true}
              href="/set-photo"
            />
          </div>
        </form>
      </div>
    </main>
  );
};

export default ActivityProfile;
