import { Button, Label, Modal, TextInput, ToggleSwitch } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function CellGiaoHangBrowser({ cellGiaoHang, i}) {
  return (
    <div
      className="mt-5 w-8/12"
    >
      <div className="flex flex-cols w-screen">
      <h5 className="text-xl tracking-tight text-gray-900 dark:text-white flex items-center w-[50px] ">
        {i + 1}{" "}
      </h5>
      <div className="flex items-center w-1/12 ">
      <img className="w-[70px] h-[50px]" src={cellGiaoHang.hinhAnh} alt="" />
      </div>
      <h5 className="trackfing-tight text-xl text-gray-900 dark:text-white w-1/12 flex items-center ">
        {cellGiaoHang.ma}{" "}
      </h5>
      <h5 className="text-xl tracking-tight text-gray-900 dark:text-white w-2/12 flex items-center ">
        {cellGiaoHang.ten}
      </h5>
      <h5 className="text-xl text-gray-900 dark:text-white w-1/12 flex items-center ">
        {cellGiaoHang.ngayTao}
      </h5>
      <h5 className="text-xl text-gray-900 dark:text-white w-1/12 flex items-center ">
        {!(cellGiaoHang.trangThai == 1) ? "Hoạt động" : "Dừng hoạt động"}
      </h5>
      <h5 className="text-xl text-gray-900 dark:text-white w-1/12 flex items-center ">
        {cellGiaoHang.giaBan}
      </h5>
      </div>
    </div>
  );
}
