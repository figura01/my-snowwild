import React, { useContext } from "react";
import { AuthContext } from "@/contexts/authContext";

const Dashboard = ({ children } : { children: React.ReactNode }) => {
  const context = useContext(AuthContext);
  console.log('authContext', context);

  return (
    <div>
      content
    </div>
  )
}

export default Dashboard;