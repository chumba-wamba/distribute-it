import { FixedLayout } from "../shared/FixedLayout";
import Navbar from "../shared/Navbar";
import CreatedTaskList from "../shared/CreatedTaskList";

const Dashboard = () => {
  return (
    <>
      <Navbar></Navbar>
      <FixedLayout>
        <div>
          <CreatedTaskList></CreatedTaskList>
        </div>
      </FixedLayout>
    </>
  );
};

export default Dashboard;
