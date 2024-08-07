
import { Footerx } from "@/app/(dashboard)/component/footer";
import Navbarx from "@/app/(dashboard)/component/navbarx";
import {
  Button,
  Label,
  Modal,
  Pagination,
  TextInput,
  ToggleSwitch,
} from "flowbite-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HiFolderAdd } from "react-icons/hi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CellSanPhamBrowser from "./cellSanPhamBrowser";
export default function SanPham() {
  const router = useRouter();
  const [data, setData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };
  const [lastPage, setLastPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  var todayNow = mm + "/" + dd + "/" + yyyy;
  var ngayTaoSys = yyyy + "-" + mm + "-" + dd;
  const [id, setId] = useState("");
  const [ma, setMa] = useState("");
  const [ten, setTen] = useState("");
  const [ngayTao, setNgayTao] = useState(ngayTaoSys);
  const [hinhAnh, setHinhAnh] = useState("");
  const [giaBan, setGiaBan] = useState("");
  const [trangThai, setTrangThai] = useState(false);
  const [refkey, setRefkey] = useState(0);
  let validateOK = false;
  useEffect(() => {
    fetch(
      "http://ec2-54-179-249-209.ap-southeast-1.compute.amazonaws.com:8080/san-pham/index?page=" +
        currentPage,
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
        setRefkey(0);
        console.log("data:", data);
      });
      fetch(
        "http://ec2-54-179-249-209.ap-southeast-1.compute.amazonaws.com:8080/san-pham/count")
        .then((res) => res.json())
        .then((data) => {
          setLastPage(Math.ceil(data/20));
          console.log("data:", Math.ceil(data/20));
        });
    console.log("test current page: ", currentPage);
  }, [refkey, currentPage]);
  function saveProduct() {
    if (validateOK) {
      fetch(
        "http://ec2-54-179-249-209.ap-southeast-1.compute.amazonaws.com:8080/san-pham/save",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ten: ten,
            trangThai: "1",
            ngayTao: ngayTao,
            hinhAnh: hinhAnh,
            giaBan: giaBan,
          }),
        },
      ).then((res) => console.log("test response: ", res.ok));
      setRefkey(1);
      setCurrentPage(lastPage);
    } else {
      console.log("not do post");
    }
  }
  function updateProduct() {
    if (validateOK) {
      fetch(
        "http://ec2-54-179-249-209.ap-southeast-1.compute.amazonaws.com:8080/san-pham/save",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ten: ten,
            trangThai: "0",
            ngayTao: ngayTao,
            hinhAnh: hinhAnh,
            giaBan: giaBan,
          }),
        },
      ).then((res) => console.log("test response: ", res.ok));
    } else {
      console.log("not do post");
    }
  }

  function onCloseModalAdd() {
    setOpenModalAdd(false);
    console.log("test ref: ", refkey);
  }
  function onOpenModalEdit(spParam: object) {
    setId(spParam.id);
    setMa(spParam.ma);
    setTen(spParam.ten);
    setTrangThai(spParam.trangThai);
    setNgayTao(spParam.ngayTao);
    setHinhAnh(spParam.hinhAnh);
    setGiaBan(spParam.giaBan);
  }
  function onCloseModalEdit() {
    setOpenModalEdit(false);
    resetState();
    console.log("test ref: ", refkey);
  }
  function resetState() {
    setId("");
    setMa("");
    setTen("");
    setTrangThai(false);
    setNgayTao("");
    setHinhAnh("");
    setGiaBan("");
  }

  function doSetRefKey() {
    setRefkey(1);
    console.log("test ref: ", refkey);
  }
  function validatorNull(textValidate: String) {
    if (textValidate == "") {
      validateOK = false;
      return false;
    } else {
      validateOK = true;
      return true;
    }
  }
  function routePage(idSPCT: String) {
    router.push("/admin/san-pham/detail/" + idSPCT);
    console.log("route to show all detail product: ", idSPCT);
  }

 
  return (
    <div id="sanPhamBrowser" className="ms-2 bg-white">
      <h2>this is the admin san pham page</h2>
      <Navbarx />
      <div className="me-[115px] flex flex-row-reverse">
        <Button gradientMonochrome="info" onClick={() => setOpenModalAdd(true)}>
          <HiFolderAdd size={20} />
          Thêm sản phẩm
        </Button>
      </div>
      {!isLoading ? (
        <div id="formAdd" className="z-0 ms-5 mt-5 w-full">
          <div className="flex-cols md-[20px] flex w-screen">
            <h5 className="w-[50px] text-xl font-semibold tracking-tight text-gray-900 dark:text-white ">
              STT
            </h5>
            <h5 className="w-1/12 text-xl font-semibold tracking-tight text-gray-900 dark:text-white ">
              Hình ảnh
            </h5>
            <h5 className="trackfing-tight w-1/12 text-xl font-semibold text-gray-900 dark:text-white ">
              Mã
            </h5>
            <h5 className="w-2/12 text-xl font-semibold tracking-tight text-gray-900 dark:text-white ">
              Tên sản phẩm
            </h5>
            <h5 className="w-1/12 text-xl font-semibold text-gray-900 dark:text-white ">
              Ngày tạo
            </h5>
            <h5 className="w-1/12 text-xl font-semibold text-gray-900 dark:text-white ">
              Trạng thái
            </h5>
            <h5 className="w-1/12 text-xl font-semibold text-gray-900 dark:text-white ">
              Giá bán
            </h5>
            <hr />
          </div>
          {data.map((sp, i) => (
            <div id={sp.id}>
              <div className="flex-cols flex w-screen">
                <CellSanPhamBrowser cellSanPham={sp} i={i} />
                <div className="flex-cols flex w-2/12 items-center gap-1">
                  <Button
                    className="flex h-[50px] w-[100px] items-center"
                    onClick={() => {
                      setOpenModalEdit(true), onOpenModalEdit(sp);
                    }}
                  >
                    Sửa
                  </Button>
                  <Button
                    className="flex h-[50px] w-[100px] items-center"
                    onClick={() => routePage(sp.id)}
                  >
                    Quản lý
                  </Button>
                </div>
              </div>
              <hr />
            </div>
          ))}
          <Modal
            show={openModalEdit}
            size="xl"
            onClose={onCloseModalEdit}
            popup
          >
            <Modal.Header />
            <Modal.Body className="overflow-auto">
              <div className="space-y-2">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  Sửa sản phẩm
                </h3>
                <div className="flex justify-center">
                  <img className="h-[200px]" src={hinhAnh} alt="" />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="ma" value="Mã sản phẩm" />
                  </div>
                  <TextInput
                    id="ma"
                    value={ma}
                    onChange={() => setMa(event.target.value)}
                    required
                  />
                  {!validatorNull(ma) ? (
                    <p className="text-red-600">
                      Không để trống trường dữ liệu này
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="ten" value="Tên sản phẩm" />
                  </div>
                  <TextInput
                    id="ten"
                    value={ten}
                    onChange={() => setTen(event.target.value)}
                    required
                  />
                  {!validatorNull(ten) ? (
                    <p className="text-red-600">
                      Không để trống trường dữ liệu này
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="ngayTao" value="Ngày tạo" />
                  </div>
                  <TextInput id="ngayTao" value={todayNow} required readOnly />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="hinhAnh" value="Link Hình ảnh" />
                  </div>
                  <TextInput
                    id="hinhAnh"
                    value={hinhAnh}
                    onChange={() => setHinhAnh(event.target.value)}
                    required
                  />
                  {!validatorNull(hinhAnh) ? (
                    <p className="text-red-600">
                      Không để trống trường dữ liệu này
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="giaBan" value="Giá bán" />
                  </div>
                  <TextInput
                    id="giaBan"
                    value={giaBan}
                    onChange={() => setGiaBan(event.target.value)}
                    required
                  />
                  {!validatorNull(giaBan) ? (
                    <p className="text-red-600">
                      Không để trống trường dữ liệu này
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="trangThai" value="Trạng thái" />
                  </div>
                  <ToggleSwitch
                    checked={trangThai}
                    label="Toggle me"
                    onChange={setTrangThai}
                  />
                </div>
                <div className="w-full">
                  <Button
                    onClick={() => {
                      updateProduct();
                    }}
                  >
                    Lưu sản phẩm
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
          <Modal show={openModalAdd} size="xl" onClose={onCloseModalAdd} popup>
            <Modal.Header />
            <Modal.Body className="overflow-auto">
              <div className="space-y-2">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  Thêm sản phẩm
                </h3>
                <div>
                  <div className="flex justify-center">
                    <img className="h-[200px]" alt="" />
                  </div>
                  <div className="mb-2 block">
                    <Label htmlFor="ten" value="Tên sản phẩm" />
                  </div>
                  <TextInput
                    id="ten"
                    value={ten}
                    onChange={() => setTen(event.target.value)}
                    required
                  />
                  {!validatorNull(ten) ? (
                    <p className="text-red-600">
                      Không để trống trường dữ liệu này
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="ngayTao" value="Ngày tạo" />
                  </div>
                  <TextInput id="ngayTao" value={todayNow} required readOnly />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="hinhAnh" value="Link Hình ảnh" />
                  </div>
                  <TextInput
                    id="hinhAnh"
                    value={hinhAnh}
                    onChange={() => setHinhAnh(event.target.value)}
                    required
                  />
                  {!validatorNull(hinhAnh) ? (
                    <p className="text-red-600">
                      Không để trống trường dữ liệu này
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="giaBan" value="Giá bán" />
                  </div>
                  <TextInput
                    id="giaBan"
                    value={giaBan}
                    onChange={() => setGiaBan(event.target.value)}
                    required
                  />
                  {!validatorNull(giaBan) ? (
                    <p className="text-red-600">
                      Không để trống trường dữ liệu này
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="trangThai" value="Trạng thái" />
                  </div>
                  <ToggleSwitch
                    checked={trangThai}
                    label="Toggle me"
                    onChange={setTrangThai}
                  />
                </div>
                <div className="w-full">
                  <Button onClick={() => saveProduct()}>Lưu sản phẩm</Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      ) : (
        <Skeleton count={20} />
      )}
      <div className="flex overflow-x-auto sm:justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={100}
          onPageChange={onPageChange}
        />
      </div>
      <div className="mt-5">
        <Footerx />
      </div>
    </div>
  );
}
