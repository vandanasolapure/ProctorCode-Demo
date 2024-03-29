import Banner from "./components/Banner";
import General from "./components/General";
import Notification from "./components/Notification";

const StudentProfile = () => {
  return (
    <div className="flex w-full flex-col gap-10">
      <div className="w-ful mt-3 flex h-fit gap-5">
        <div className="lg:!mb-0">
          <Banner />
        </div>
        <div className=" lg:mb-0">
          <General />
        </div>
      </div>

      <div className="grid h-full grid-cols-1 gap-5 lg:!grid-cols-12">
        <div className="col-span-5 lg:col-span-12 lg:mb-0 3xl:!col-span-3">
          <Notification />
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
