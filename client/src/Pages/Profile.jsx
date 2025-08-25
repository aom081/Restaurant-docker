import React from "react";
import { useAuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user, logout } = useAuthContext();
  // ตัวอย่างข้อมูลผู้ใช้ (อาจมาจาก API จริงในภายหลัง)
  const userProfile = {
    name: user.userInfo.name,
    email: user.userInfo.email,
    avatar: "https://i.pravatar.cc/150?img=3", // รูป avatar จาก pravatar.cc
    role: user.authorities.toString(),
  };
  const handleLogOut = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-10">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
          <img
            src={userProfile.avatar}
            alt="Profile"
            className="rounded-full w-32 h-32"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title text-2xl">{userProfile.name}</h2>
          <p className="text-base-content">{userProfile.email}</p>
          <div className="badge badge-primary mt-2">{userProfile.role}</div>
          <div className="card-actions mt-6">
            <button className="btn btn-outline btn-primary">
              แก้ไขโปรไฟล์
            </button>
            <button className="btn btn-error text-white" onClick={handleLogOut}>
              ออกจากระบบ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
