import Button from "../../../components/Button";
import Header from "../../../components/Header";

const ActivityProfile = () => {
  return (
    <main className="template-parent-box">
      <Header
        heading="Represent your vibe!"
        desc="Pick an activity that speaks to your true self. What's your perfect match?"
      />

      {/* form */}
      <div>
        <form className="form-base-profile">
          <label htmlFor="interest">
            Choose the one that feels most like you!
          </label>

          <div>
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
