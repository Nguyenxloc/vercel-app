
"use client"
import { Footerx } from "@/app/(dashboard)/component/footer";
import { Navbarx } from "@/app/(dashboard)/component/navbarx";
export default function Page() {
  return (
    <div>
      <h2>this is the home page</h2>
      <Navbarx />
      <div className="flex">
        <div className="w-full bg-white">
            <div className="ms-5 mt-5">
            </div>
        </div>
      </div>
       <div className="mt-5">
       <Footerx />
       </div>
    </div>
  );
}
