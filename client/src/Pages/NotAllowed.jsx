import React from "react";
import { Link } from "react-router";

const NotAllowed = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 px-4 text-center">
      <div className="max-w-md">
        <h1 className="text-6xl font-bold text-error">403</h1>
        <h2 className="text-2xl font-semibold mt-4">Access Denied</h2>
        <p className="mt-2 text-base-content">
          คุณไม่มีสิทธิ์เข้าถึงหน้านี้ หากคิดว่านี่เป็นข้อผิดพลาด
          กรุณาติดต่อผู้ดูแลระบบ
        </p>
        <Link to="/" className="btn btn-primary mt-6">
          กลับสู่หน้าหลัก
        </Link>
      </div>
    </div>
  );
};

export default NotAllowed;
