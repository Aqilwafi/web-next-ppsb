"use client";

import { useState } from "react";
import { useBiodata } from "@/hooks/useBiodata";
import { useKonten } from "@/hooks/useKonten";
import { DashboardStepProps } from "@/types/propsType";

export default function BiodataStep({
  user,
  isComplete,
  onComplete,
  isLoading = false,
}: DashboardStepProps) {
  const { dataA, dataB, setDataB, dataC, setDataC, dataD, setDataD, dataE, setDataE, dataF, setDataF, loading, error, inputData, fetchData } = useBiodata(user);
  const { handleMarkStep } = useKonten(user);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);
  const [isEditing, setIsEditing] = useState(true);
  const [statusRumah, setStatusRumah] = useState();
  const [tinggalBersama, setTinggalBersama] = useState();
  //console.log(dataE);
  //console.log(dataD);
  //console.log(dataB);

  const handleClick = async () => {
    try {
       if (!dataB || !dataC || !dataD || !dataF) {
        console.error("Data belum lengkap!");
        return;
      }
      await inputData(dataB, dataC, dataD, dataE, dataF);
      //console.log(dataA, dataB, dataC, dataD, dataE, dataF);
      //await mutate();
      if (!isComplete) onComplete();
    } catch (err : unknown) {
      if (err instanceof Error) {
      console.error(err.message); // Error object
    } else if (typeof err === "string") {
      console.error(err); // Kalau API throw string
    } else {
      console.error("Gagal mengambil biodata."); // fallback
    }
    }
  };

  if (loading) {
    return <div><p className="text-gray-500">Loading biodata...</p></div>;
  } 

  return (
    <main className="max-w mx-auto">
        <div className="text-black">
          <section className="space-y-3 max-w-3xl mx-auto"> 
            <form onSubmit={handleClick} className="flex flex-col gap-4">

              {/* Bagian Read-only data user */}
              <div className="p-4 border rounded-lg bg-white">
                  <h2 className="bg-blue-900 text-white px-4 py-2 font-bold mb-3">Biodata Siswa</h2>
                  <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex flex-col w-full md:w-1/2">
                        <label>Email</label>
                        <input
                            type="text"
                            value={dataA?.email ?? ""}
                            readOnly
                            className="border rounded-lg px-3 py-2 bg-gray-100 text-gray-500 cursor-not-allowed"
                        />
                      </div>
                      <div className="flex flex-col w-full md:w-1/2">
                        <label>Username</label>
                        <input
                            type="text"
                            value={dataA?.username ?? ""}
                            readOnly
                            className="border rounded-lg px-3 py-2 bg-gray-100 text-gray-500 cursor-not-allowed"
                        />
                      </div>
                  </div>
              </div>

              {/* Biodata siswa */}
              <div className="p-4 border rounded-lg bg-white">
                  <h2 className="bg-blue-900 text-white px-4 py-2 font-bold">Biodata Siswa</h2>
                  <div className="flex flex-col md:flex-row gap-4 mt-3">
                      <div className="flex flex-col w-full md:w-1/2">
                        <label>Lembaga</label>
                        <input
                            type="text"
                            value={dataB?.lembaga ?? ""}
                            readOnly
                            className="border rounded-lg px-3 py-2 bg-gray-100 text-gray-500 cursor-not-allowed"
                        />
                      </div>
                      <div className="flex flex-col w-full md:w-1/2">
                        <label>Tingkatan</label>
                        <input
                            type="text"
                            value={dataB?.tingkatan ?? ""}
                            readOnly
                            className="border rounded-lg px-3 py-2 bg-gray-100 text-gray-500 cursor-not-allowed"
                        />
                      </div>
                  </div>
                  <div className="flex flex-col">
                      <label>Nama Lengkap</label>
                      <input
                          type="text"
                          value={dataC?.nama_lengkap ?? ""}
                          readOnly
                          className="border rounded-lg px-3 py-2 bg-gray-100 text-gray-500 cursor-not-allowed"
                      />
                  </div>
                  <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex flex-col  w-full md:w-1/2">
                          <label>Jenis Kelamin</label>
                          <input
                              type="text"
                              value={dataC?.jenis_kelamin ?? ""}
                              readOnly
                              className="border rounded-lg px-3 py-2 bg-gray-100 text-gray-500 cursor-not-allowed"
                          />
                      </div>
                      <div className="flex flex-col w-full md:w-1/2">
                          <label>Agama</label>
                          <input
                              type="text"
                              value={dataC?.agama ?? ""}
                              readOnly
                              className="border rounded-lg px-3 py-2 bg-gray-100 text-gray-500 cursor-not-allowed"
                          />
                      </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex flex-col w-full md:w-1/3">
                        <label>Tempat Lahir</label>
                        <input
                            readOnly={!isEditing}
                            required={isEditing}
                            type="text"
                            value={dataC?.tempat_lahir ?? ""}
                            onChange={(e) => setDataC({ ...dataC, tempat_lahir: e.target.value })}
                            className={`border rounded-lg px-3 py-2 ${
                              isEditing
                                ? "bg-white text-gray-700"
                                : "bg-gray-100 text-gray-500 cursor-not-allowed"
                            }`}
                        />
                      </div>
                      <div className="flex flex-col w-full md:w-1/3">
                      <label>Tanggal Lahir</label>
                      <input
                          readOnly={!isEditing}
                          required={isEditing}
                          type="date"
                          value={dataC?.tanggal_lahir ?? ""}
                          onChange={(e) =>
                              setDataC((prev) =>
                              prev ? { ...prev, tempat_lahir: e.target.value } : prev
                            )
                          }
                          className={`border rounded-lg px-3 py-2 ${
                              isEditing
                                ? "bg-white text-gray-700"
                                : "bg-gray-100 text-gray-500 cursor-not-allowed"
                            }`}
                      />
                      </div>
                      <div className="flex flex-col w-full md:w-1/3">
                        <label>NISN</label>
                        <input
                            type="text"
                            value={dataC?.nisn ?? ""}
                            readOnly={!isEditing}
                            required={isEditing}
                            maxLength={10}
                            inputMode="numeric"   
                            pattern="[0-9]*" 
                            onChange={(e) => setDataC({ ...dataC, nisn: e.target.value })}
                            className={`border rounded-lg px-3 py-2 ${
                              isEditing
                                ? "bg-white text-gray-700"
                                : "bg-gray-100 text-gray-500 cursor-not-allowed"
                            }`}
                        />
                      </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex flex-col w-full md:w-1/2">
                        <label>NIK</label>
                        <input
                            type="text"
                            readOnly={!isEditing}
                            required={isEditing}
                            value={dataC?.nik ?? ""}
                            maxLength={16}
                            inputMode="numeric"
                            pattern="[0-9]*" 
                            onChange={(e) => setDataC({ ...dataC, nik: e.target.value })}
                            className={`border rounded-lg px-3 py-2 ${
                              isEditing
                                ? "bg-white text-gray-700"
                                : "bg-gray-100 text-gray-500 cursor-not-allowed"
                            }`}
                        />
                      </div>
                      <div className="flex flex-col w-full md:w-1/2">
                        <label>No. KK</label>
                        <input
                            type="text"
                            value={dataC?.no_kk ?? ""}
                            readOnly={!isEditing}
                            required={isEditing}
                            maxLength={16}
                            inputMode="numeric"
                            pattern="[0-9]*" 
                            onChange={(e) => setDataC({ ...dataC, no_kk: e.target.value })}
                            className={`border rounded-lg px-3 py-2 ${
                              isEditing
                                ? "bg-white text-gray-700"
                                : "bg-gray-100 text-gray-500 cursor-not-allowed"
                            }`}
                        />
                      </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex flex-col w-full md:w-3/10">
                        <label>Anak ke</label>
                        <input
                            readOnly={!isEditing}
                            required={isEditing}
                            type="number"
                            min={1}
                            max={200}
                            value={dataC?.anak_ke ?? ""}
                            onChange={(e) => setDataC({ ...dataC, anak_ke: e.target.value === "" ? null : Number(e.target.value) })}
                            className={`border rounded-lg px-3 py-2 ${
                              isEditing
                                ? "bg-white text-gray-700"
                                : "bg-gray-100 text-gray-500 cursor-not-allowed"
                            }`}
                          />
                      </div>
                      <div className="flex flex-col w-full md:w-3/10">
                          <label>Jumlah Saudara</label>
                          <input
                              readOnly={!isEditing}
                              required={isEditing}
                              type="number"
                              value={dataC.jumlah_saudara ?? ""}
                              onChange={(e) => setDataC({ ...dataC, jumlah_saudara: e.target.value === "" ? null : Number(e.target.value) })}
                              className={`border rounded-lg px-3 py-2 ${
                                isEditing ? "bg-white text-gray-700" : 
                                "bg-gray-100 text-gray-500 cursor-not-allowed"
                              }`}
                          />
                      </div>
                      <div className="flex flex-col w-full md:w-3/10">
                          <label>Golongan Darah</label>
                          <select
                            disabled={!isEditing}
                            required={isEditing}
                            value={dataC?.golongan_darah ?? ""}
                            onChange={(e) => setDataC({ ...dataC, golongan_darah: e.target.value })}
                            className={`border rounded-lg px-3 py-2 ${
                              isEditing ? "bg-white text-gray-700" : "bg-gray-100 text-gray-500 cursor-not-allowed"
                            }`}
                          >
                            <option value="">Pilih Golongan Darah</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="AB">AB</option>
                            <option value="O">O</option>
                          </select>
                      </div>
                  </div>
                  <div className="flex flex-col">  
                      <label>Penyakit</label>
                      <textarea
                      readOnly={!isEditing}
                      value={dataC?.penyakit ?? ""}
                      onChange={(e) => setDataC({ ...dataC, penyakit: e.target.value })}
                      className={`border rounded-lg px-3 py-2 ${
                          isEditing ? "bg-white text-gray-700" : "bg-gray-100 text-gray-500 cursor-not-allowed"
                      }`}
                      />
                  </div>
              </div>

              {/* asal sekolah */}
              <div className="p-4 border rounded-lg bg-white">
                <h2 className="bg-blue-900 text-white px-4 py-2 font-bold">Pendidikan Sebelumnya</h2>
                <div className="flex flex-col md:flex-row gap-4 mt-3">
                  <div className="flex flex-col w-full md:w-2/5">
                    <label>Asal Sekolah</label>
                    <input
                      type="text"
                      readOnly={!isEditing}
                      required={isEditing}
                      value={dataB?.asal_sekolah ?? ""}
                      onChange={(e) => setDataB({ ...dataB, asal_sekolah: e.target.value })}
                      className={`border rounded-lg px-3 py-2 ${
                        isEditing ? "bg-white text-gray-700" : "bg-gray-100 text-gray-500 cursor-not-allowed"
                      }`}
                    />
                  </div>
                  <div className="flex flex-col w-full md:w-2/5">
                    <label>NPSN</label>
                    <input
                      type="text"
                      required={isEditing}
                      readOnly={!isEditing}
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={8}
                      value={dataB?.npsn ?? ""}
                      onChange={(e) => setDataB({ ...dataB, npsn: e.target.value })}
                      className={`border rounded-lg px-3 py-2 ${
                        isEditing ? "bg-white text-gray-700" : "bg-gray-100 text-gray-500 cursor-not-allowed"
                      }`}
                    />
                  </div>
                  <div className="flex flex-col w-full md:w-1/5">
                    <label>Tahun Lulus</label>
                    <select
                      required={isEditing}
                      disabled={!isEditing}
                      value={dataB?.tahun_lulus || ""}
                      onChange={(e) => setDataB({ ...dataB, tahun_lulus: e.target.value })}
                      className={`border rounded-lg px-3 py-2 ${
                        isEditing ? "bg-white text-gray-700" : "bg-gray-100 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      <option value="">Pilih Tahun Lulus</option>
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex flex-col">
                    <label>Alamat Sekolah</label>
                    <textarea
                    readOnly={!isEditing}
                    required={isEditing}
                    value={dataB?.alamat_pendidikan_sebelumnya ?? ""}
                    onChange={(e) => setDataB({ ...dataB, alamat_pendidikan_sebelumnya: e.target.value })}
                    className={`border rounded-lg px-3 py-2 ${
                        isEditing ? "bg-white text-gray-700" : "bg-gray-100 text-gray-500 cursor-not-allowed"
                    }`}
                    />
                </div>
              </div>

              {/* Orang Tua */}
              <div className="p-4 border rounded-lg bg-white">
                <h2 className="bg-blue-900 text-white px-4 py-2 font-bold">Biodata Orang Tua Siswa</h2>
                <h3 className="text-l font-bold mt-3 mb-2 ">Biodata Ayah</h3>
                <div className="flex flex-col">
                  <label>Nama Ayah</label>
                  <input
                    readOnly={!isEditing}
                    required={isEditing}
                    type="text"
                    value={dataD?.nama_ayah ?? ""}
                    onChange={(e) => setDataD({ ...dataD, nama_ayah: e.target.value })}
                    className ={`border rounded-lg px-3 py-2 ${
                      isEditing
                        ? "bg-white text-gray-700"
                        : "bg-gray-100 text-gray-500 cursor-not-allowed"
                    }`}
                  />
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex flex-col w-full md:w-1/2">
                    <label>NIK</label>
                    <input
                      readOnly={!isEditing}
                      required={isEditing}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={16}
                      value={dataD?.nik_ayah ?? ""}
                      onChange={(e) => setDataD({ ...dataD, nik_ayah: e.target.value })}
                      className={`border rounded-lg px-3 py-2 ${
                        isEditing
                          ? "bg-white text-gray-700"
                          : "bg-gray-100 text-gray-500 cursor-not-allowed"
                      }`}
                    />
                  </div>
                  <div className="flex flex-col w-full md:w-1/2">
                    <label>No. Telepon Ayah</label>
                    <input
                      readOnly={!isEditing}
                      required={isEditing}
                      type="tel"
                      value={dataD?.no_telp_ayah ?? ""}
                      onChange={(e) => setDataD({ ...dataD, no_telp_ayah: e.target.value })}
                      className={`border rounded-lg px-3 py-2 ${
                        isEditing ? "bg-white text-gray-700" : "bg-gray-100 text-gray-500 cursor-not-allowed"
                      }`}
                    />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex flex-col w-full md:w-3/7">
                    <label>Tempat Lahir</label>
                    <input
                      readOnly={!isEditing}
                      required={isEditing}
                      type="text"
                      value={dataD?.tempat_lahir_ayah ?? ""}
                      onChange={(e) => setDataD({ ...dataD, tempat_lahir_ayah: e.target.value })}
                      className ={`border rounded-lg px-3 py-2 ${
                        isEditing
                          ? "bg-white text-gray-700"
                          : "bg-gray-100 text-gray-500 cursor-not-allowed"
                      }`}
                    />
                  </div>
                  <div className="flex flex-col w-full md:w-2/7">
                    <label>Tanggal Lahir</label>
                    <input
                      readOnly={!isEditing}
                      required={isEditing}
                      type="date"
                      value={dataD?.tanggal_lahir_ayah ?? ""}
                      onChange={(e) => setDataD({ ...dataD, tanggal_lahir_ayah: e.target.value })}
                      className ={`border rounded-lg px-3 py-2 ${
                        isEditing
                          ? "bg-white text-gray-700"
                          : "bg-gray-100 text-gray-500 cursor-not-allowed"
                      }`}
                    />
                  </div>
                  <div className="flex flex-col w-full md:w-2/7">
                    <label>Status</label>
                    <select
                      disabled={!isEditing}      
                      required={isEditing}
                      value={dataD?.status_ayah ?? ""}    
                      onChange={(e) => setDataD({ ...dataD, status_ayah: e.target.value })}
                      className={`border rounded-lg px-3 py-2 ${
                        isEditing
                          ? "bg-white text-gray-700"
                          : "bg-gray-100 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      <option value="">Pilih Status</option>
                      <option value="Hidup">Hidup</option>
                      <option value="Meninggal">Meninggal</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex flex-col w-full md:w-1/7">
                    <label>Pendidikan</label>
                    <select
                      disabled={!isEditing}
                      required={isEditing}
                      value={dataD?.pendidikan_ayah ?? ""}
                      onChange={(e) => setDataD({ ...dataD, pendidikan_ayah: e.target.value })}
                      className={`border rounded-lg px-3 py-2 ${
                        isEditing ? "bg-white text-gray-700" : "bg-gray-100 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      <option value="">Pilih Pendidikan</option>
                      <option value="SD">SD</option>
                      <option value="SMP">SMP</option>
                      <option value="SMA">SMA</option>
                      <option value="D1">D1</option>
                      <option value="D2">D2</option>
                      <option value="D3">D3</option>
                      <option value="S1">S1</option>
                      <option value="S2">S2</option>
                      <option value="S3">S3</option>
                    </select>
                  </div>
                  <div className="flex flex-col w-full md:w-3/7">
                    <label>Pekerjaan</label>
                    <input
                      readOnly={!isEditing}
                      required={isEditing}
                      type="text"
                      value={dataD?.pekerjaan_ayah ?? ""}
                      onChange={(e) => setDataD({ ...dataD, pekerjaan_ayah: e.target.value })}
                      className ={`border rounded-lg px-3 py-2 ${
                        isEditing
                          ? "bg-white text-gray-700"
                          : "bg-gray-100 text-gray-500 cursor-not-allowed"
                      }`}
                    />
                  </div>
                  <div className="flex flex-col w-full md:w-3/7">
                    <label>Penghasilan</label>
                    <select
                      disabled={!isEditing}
                      required={isEditing}
                      value={dataD?.penghasilan_ayah ?? ""}
                      onChange={(e) => setDataD({ ...dataD, penghasilan_ayah: e.target.value })}
                      className={`border rounded-lg px-3 py-2 ${
                        isEditing ? "bg-white text-gray-700" : "bg-gray-100 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                      <option value="">Pilih Penghasilan</option>
                      <option value="<1 juta">&lt;1 juta</option>
                      <option value="1-3 juta">1–3 juta</option>
                      <option value="3-5 juta">3–5 juta</option>
                      <option value="5-10 juta">5–10 juta</option>
                      <option value=">10 juta">&gt;10 juta</option>
                    </select>
                  </div>
                </div>
                <h3 className="text-l font-bold mt-3 mb-2">Biodata Ibu</h3>
                <div className="flex flex-col">
                  <label>Nama Ibu</label>
                  <input
                    readOnly={!isEditing}
                    required={isEditing}
                    type="text"
                    value={dataD?.nama_ibu ?? ""}
                    onChange={(e) => setDataD({ ...dataD, nama_ibu: e.target.value })}
                    className ={`border rounded-lg px-3 py-2 ${
                      isEditing
                        ? "bg-white text-gray-700"
                        : "bg-gray-100 text-gray-500 cursor-not-allowed"
                    }`}
                  />
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex flex-col w-full md:w-1/2">
                    <label>NIK</label>
                    <input
                      readOnly={!isEditing}
                      required={isEditing}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={16}
                      value={dataD?.nik_ibu ?? ""}
                      onChange={(e) => setDataD({ ...dataD, nik_ibu: e.target.value })}
                      className={`border rounded-lg px-3 py-2 ${
                        isEditing
                          ? "bg-white text-gray-700"
                          : "bg-gray-100 text-gray-500 cursor-not-allowed"
                      }`}
                    />
                  </div>
                  <div className="flex flex-col w-full md:w-1/2">
                    <label>No. Telepon Ibu</label>
                    <input
                      readOnly={!isEditing}
                      required={isEditing}
                      type="tel"
                      value={dataD?.no_telp_ibu ?? ""}
                      onChange={(e) => setDataD({ ...dataD, no_telp_ibu: e.target.value })}
                      className={`border rounded-lg px-3 py-2 ${
                        isEditing ? "bg-white text-gray-700" : "bg-gray-100 text-gray-500 cursor-not-allowed"
                      }`}
                    />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex flex-col w-full md:w-3/7">
                    <label>Tempat Lahir</label>
                    <input
                      readOnly={!isEditing}
                      required={isEditing}
                      type="text"
                      value={dataD?.tempat_lahir_ibu ?? ""}
                      onChange={(e) => setDataD({ ...dataD, tempat_lahir_ibu: e.target.value })}
                      className ={`border rounded-lg px-3 py-2 ${
                        isEditing
                          ? "bg-white text-gray-700"
                          : "bg-gray-100 text-gray-500 cursor-not-allowed"
                      }`}
                    />
                  </div>
                  <div className="flex flex-col w-full md:w-2/7">
                    <label>Tanggal Lahir</label>
                    <input
                      readOnly={!isEditing}
                      required={isEditing}
                      type="date"
                      value={dataD?.tanggal_lahir_ibu ?? ""}
                      onChange={(e) => setDataD({ ...dataD, tanggal_lahir_ibu: e.target.value })}
                      className ={`border rounded-lg px-3 py-2 ${
                        isEditing
                          ? "bg-white text-gray-700"
                          : "bg-gray-100 text-gray-500 cursor-not-allowed"
                      }`}
                    />
                  </div>
                  <div className="flex flex-col w-full md:w-2/7">
                    <label>Status</label>
                    <select
                      disabled={!isEditing}      
                      required={isEditing}
                      value={dataD?.status_ibu ?? ""}    
                      onChange={(e) => setDataD({ ...dataD, status_ibu: e.target.value })}
                      className={`border rounded-lg px-3 py-2 ${
                        isEditing
                          ? "bg-white text-gray-700"
                          : "bg-gray-100 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      <option value="">Pilih Status</option>
                      <option value="Hidup">Hidup</option>
                      <option value="Meninggal">Meninggal</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex flex-col w-full md:w-1/7">
                    <label>Pendidikan</label>
                    <select
                      disabled={!isEditing}
                      required={isEditing}
                      value={dataD?.pendidikan_ibu ?? ""}
                      onChange={(e) => setDataD({ ...dataD, pendidikan_ibu: e.target.value })}
                      className={`border rounded-lg px-3 py-2 ${
                        isEditing ? "bg-white text-gray-700" : "bg-gray-100 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      <option value="">Pilih Pendidikan</option>
                      <option value="SD">SD</option>
                      <option value="SMP">SMP</option>
                      <option value="SMA">SMA</option>
                      <option value="D1">D1</option>
                      <option value="D2">D2</option>
                      <option value="D3">D3</option>
                      <option value="S1">S1</option>
                      <option value="S2">S2</option>
                      <option value="S3">S3</option>
                    </select>
                  </div>
                  <div className="flex flex-col w-full md:w-3/7">
                    <label>Pekerjaan</label>
                    <input
                      readOnly={!isEditing}
                      required={isEditing}
                      type="text"
                      value={dataD?.pekerjaan_ibu ?? ""}
                      onChange={(e) => setDataD({ ...dataD, pekerjaan_ibu: e.target.value })}
                      className ={`border rounded-lg px-3 py-2 ${
                        isEditing
                          ? "bg-white text-gray-700"
                          : "bg-gray-100 text-gray-500 cursor-not-allowed"
                      }`}
                    />
                  </div>
                  <div className="flex flex-col w-full md:w-3/7">
                    <label>Penghasilan</label>
                    <select
                      disabled={!isEditing}
                      required={isEditing}
                      value={dataD?.penghasilan_ibu ?? ""}
                      onChange={(e) => setDataD({ ...dataD, penghasilan_ibu: e.target.value })}
                      className={`border rounded-lg px-3 py-2 ${
                        isEditing ? "bg-white text-gray-700" : "bg-gray-100 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                      <option value="">Pilih Penghasilan</option>
                      <option value="<1 juta">&lt;1 juta</option>
                      <option value="1-3 juta">1–3 juta</option>
                      <option value="3-5 juta">3–5 juta</option>
                      <option value="5-10 juta">5–10 juta</option>
                      <option value=">10 juta">&gt;10 juta</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col mt-4">
                  <label>Alamat Orang Tua</label>
                  <textarea
                    readOnly={!isEditing}
                    required={isEditing}
                    value={dataD?.alamat_ortu ?? ""}
                    onChange={(e) => setDataD({ ...dataD, alamat_ortu: e.target.value })}
                    className ={`border rounded-lg px-3 py-2 ${
                      isEditing
                        ? "bg-white text-gray-700"
                        : "bg-gray-100 text-gray-500 cursor-not-allowed"
                    }`}
                  />
                </div>
              </div>

              {/* Wali */}
              <div className="p-4 border rounded-lg bg-white">
                <h2 className="bg-blue-900 text-white px-4 py-2 font-bold">Biodata Wali</h2>
                <div className="flex flex-col mt-3">
                  <label>Nama Wali</label>
                  <input
                    readOnly={!isEditing}
                    type="text"
                    value={dataE?.nama_wali ?? ""}
                    onChange={(e) => setDataE({ ...dataE, nama_wali: e.target.value })}
                    className ={`border rounded-lg px-3 py-2 ${
                      isEditing
                        ? "bg-white text-gray-700"
                        : "bg-gray-100 text-gray-500 cursor-not-allowed"
                    }`}
                  />
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex flex-col w-full md:w-1/2">
                    <label>NIK</label>
                    <input
                      readOnly={!isEditing}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={16}
                      value={dataE?.nik_wali ?? ""}
                      onChange={(e) => setDataE({ ...dataE, nik_wali: e.target.value })}
                      className ={`border rounded-lg px-3 py-2 ${
                        isEditing
                          ? "bg-white text-gray-700"
                          : "bg-gray-100 text-gray-500 cursor-not-allowed"
                      }`}
                    />
                  </div>
                  <div className="flex flex-col w-full md:w-1/2">
                    <label>No. Telepon Wali</label>
                    <input
                      readOnly={!isEditing}
                      type="tel"
                      value={dataE?.no_telp_wali ?? ""}
                      onChange={(e) => setDataE({ ...dataE, no_telp_wali: e.target.value })}
                      className ={`border rounded-lg px-3 py-2 ${
                        isEditing
                          ? "bg-white text-gray-700"
                          : "bg-gray-100 text-gray-500 cursor-not-allowed"
                      }`}
                    />
                  </div>  
                </div>
                <div className="flex flex-col  md:flex-row gap-4">
                  <div className="flex flex-col w-full md:w-1/7">
                    <label>Pendidikan</label>
                    <select
                      disabled={!isEditing}
                      value={dataE?.pendidikan_wali ?? ""}
                      onChange={(e) => setDataE({ ...dataE, pendidikan_wali: e.target.value })}
                      className={`border rounded-lg px-3 py-2 ${
                        isEditing ? "bg-white text-gray-700" : "bg-gray-100 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      <option value="">Pilih Pendidikan</option>
                      <option value="SD">SD</option>
                      <option value="SMP">SMP</option>
                      <option value="SMA">SMA</option>
                      <option value="D1">D1</option>
                      <option value="D2">D2</option>
                      <option value="D3">D3</option>
                      <option value="S1">S1</option>
                      <option value="S2">S2</option>
                      <option value="S3">S3</option>
                    </select>
                  </div>
                  <div className="flex flex-col w-full md:w-3/7">
                    <label>Pekerjaan</label>
                    <input
                      readOnly={!isEditing}
                      type="text"
                      value={dataE?.pekerjaan_wali ?? ""}
                      onChange={(e) => setDataE({ ...dataE, pekerjaan_wali: e.target.value })}
                      className ={`border rounded-lg px-3 py-2 ${
                        isEditing
                          ? "bg-white text-gray-700"
                          : "bg-gray-100 text-gray-500 cursor-not-allowed"
                      }`}
                    />
                  </div>
                  <div className="flex flex-col w-full md:w-3/7">
                    <label>Penghasilan</label>
                    <select
                      disabled={!isEditing}
                      value={dataE?.penghasilan_wali ?? ""}
                      onChange={(e) => setDataE({ ...dataE, penghasilan_wali: e.target.value })}
                      className={`border rounded-lg px-3 py-2 ${
                        isEditing ? "bg-white text-gray-700" : "bg-gray-100 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                      <option value="">Pilih Penghasilan</option>
                      <option value="<1 juta">&lt;1 juta</option>
                      <option value="1-3 juta">1-3 juta</option>
                      <option value="3-5 juta">3-5 juta</option>
                      <option value="5-10 juta">5-10 juta</option>
                      <option value=">10 juta">&gt;10 juta</option>
                    </select>
                  </div>
                </div>
              </div>
              
             {/* Status Rumah Tinggal Sama & Alamat */}
            <div className="p-4 border rounded-lg bg-white">
              <h2 className="bg-blue-900 text-white px-4 py-2 font-bold">
                STATUS TEMPAT TINGGAL DAN ALAMAT SISWA
              </h2>

              {/* Status Rumah */}
              <div className="flex items-start gap-2 mt-4">
                <label className="w-32 font-semibold">Status Rumah :</label>
                <div className="flex flex-wrap gap-4">
                  {["Nenek", "Ortu", "Saudara", "Dinas", "Sewa/Kontrak"].map((val) => (
                    <label key={val} className="flex items-center gap-1">
                      <input
                        type="radio"
                        name="statusRumah"
                        readOnly={!isEditing}
                        required={isEditing}
                        value={val}
                        checked={dataF?.status_rumah === val}
                        onChange={(e) =>
                          setDataF((prev) => ({
                            ...prev,
                            status_rumah: e.target.value,
                          }))
                        }
                        className="w-4 h-4"
                      />
                      {val}
                    </label>
                  ))}
                </div>
              </div>

              {/* Tinggal Sama */}
              <div className="flex items-start gap-2 mt-4">
                <label className="w-32 font-semibold">Tinggal Sama :</label>
                <div className="flex flex-wrap gap-4">
                  {["Ortu", "Wali", "Saudara", "Panti", "Pesantren"].map((val) => (
                    <label key={val} className="flex items-center gap-1">
                      <input
                        type="radio"
                        name="tinggalBersama"
                        readOnly={!isEditing}
                        required={isEditing}
                        value={val}
                        checked={dataF?.tinggal_bersama === val}
                        onChange={(e) =>
                          setDataF((prev) => ({
                            ...prev,
                            tinggal_bersama: e.target.value,
                          }))
                        }
                        className="w-4 h-4"
                      />
                      {val}
                    </label>
                  ))}
                </div>
              </div>

              {/* Alamat */}
              <div className="flex items-start gap-2 mt-4">
                <label className="w-32 font-semibold">Alamat :</label>
                <textarea
                  readOnly={!isEditing}
                  required={isEditing}
                  className="flex-1 border rounded-lg px-3 py-2"
                  value={dataF?.alamat || ""}
                  onChange={(e) =>
                    setDataF((prev) => ({
                      ...prev,
                      alamat: e.target.value,
                    }))
                  }
                  rows={3}
                  placeholder="Tulis alamat lengkap..."
                />
              </div>
            </div>


              {error && <p className="text-red-500">{error}</p>}

              <div className="flex flex-col md:flex-row gap-4 mt-4">
                {isEditing ? (
                  <button
                    type="submit"
                    disabled={loading}
                    className={`bg-blue-600 text-white py-1 px-4 rounded-lg hover:bg-blue-700 transition-all duration-150`}
                  >
                    {loading ? "Menyimpan..." : "Submit Biodata"}
                  </button>
                ) : (
                  <button
                    type="submit"
                    onClick={() => setIsEditing(true)}
                    className="mt-4 bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
                  >
                    Edit Biodata
                  </button>
                )}
              </div>

            </form>
          </section>
        </div>
    </main>
  ); 
}
