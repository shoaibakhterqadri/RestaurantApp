import React, { useEffect, useState } from "react";
import Heading from "../../components/Heading";
import { FlexBetween } from "../../style/CommonClasses";
import { AiOutlineUser } from "react-icons/ai";
import {
  MdFastfood,
  MdLocalOffer,
  MdFeedback,
  MdOutlineManageAccounts,
} from "react-icons/md";
import { getApiMethod } from "../../state/Api";

const Dashboard = () => {
  const [dashCardData, setDashCardData] = useState([]);

  const getDashboardData = async () => {
    const { data } = await getApiMethod(`/user/dashboardData`);
    setDashCardData(data);
  };
  useEffect(() => {
    getDashboardData();
  }, []);
  const dashboardCardData = [
    {
      title: "TOTAL USER",
      icon: <AiOutlineUser className="text-indigo-600" fontSize={24} />,
      role: "user",
    },
    {
      title: "TOTAL DISHES",
      icon: <MdFastfood className="text-indigo-600" fontSize={24} />,
      role: "dishes",
    },
    {
      title: "TOTAL OFFERS",
      icon: <MdLocalOffer className="text-indigo-600" fontSize={24} />,
      role: "offers",
    },
    {
      title: "ADMINS",
      icon: (
        <MdOutlineManageAccounts className="text-indigo-600" fontSize={24} />
      ),
      role: "admin",
    },
  ];
  // const updatedashboardCardData = dashboardCardData?.map((item, index) => {
  //   return {
  //     ...item,
  //     role: dashCardData[index],
  //   };
  // });

  return (
    <div>
      <Heading>DASHBOARD</Heading>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* {updatedashboardCardData?.map((dashboardData, index) => {
            return (
              <div
                className={`${FlexBetween} w-full rounded-xl px-2 py-2 shadow-md`}
              >
                <div>
                  <div className="font-medium text-indigo-600">
                    {dashboardData?.title}
                  </div>
                  <div className="text-indigo-600">{dashboardData?.role}</div>
                </div>
                {dashboardData?.icon}
              </div>
            );
          })} */}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
