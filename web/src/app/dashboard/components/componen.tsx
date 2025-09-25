"use client";

import React from "react";
import InputBio from "./input";

export const StepContents = (userId: string | number | null) => {
  return {
    1: <p>Form registrasi user telah diisi.</p>,
    2: (
      <>
        <p>Terima kasih telah bergabung di Yayasan ABC. Proses registrasi Anda akan segera dilanjutkan setelah pembayaran formulir diterima.</p>
        <p>Pembayaran dapat dilakukan melalui transfer bank ke rekening berikut:</p>
        <ul>
          <li>Bank ABC</li>
          <li>Nomor Rekening: 123-456-789</li>
          <li>Atas Nama: Yayasan ABC</li>
        </ul>
        <p>Setelah melakukan pembayaran, harap konfirmasi melalui email atau nomor telepon yang tertera di website kami.</p>
      </>
    ),
    3: <InputBio userId={userId} />,
    4: <p>Selamat! Anda telah menyelesaikan ujian masuk. Kami akan segera menginformasikan hasilnya.</p>,
    5: <p>Terima kasih telah menyetujui syarat dan ketentuan yang berlaku...</p>,
    6: <p>Data Anda telah berhasil divalidasi. Terima kasih atas kerjasama Anda...</p>,
    7: <p>Selamat! Anda telah diterima di Yayasan ABC...</p>,
  };
};
