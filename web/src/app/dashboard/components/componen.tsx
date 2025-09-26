// /dashboard/components/componen.tsx
import React, { useState } from "react";
import InputBio from "./biodata";
import ViewBio from "./input";

export const StepContents = (
  userId: string | number | null,
  onStepComplete: () => void
) => { const [isEditing, setIsEditing] = useState(false);
  return {
    1: {
      ongoing: (
        <p>
          Silakan lakukan registrasi akun dengan mengisi data dasar Anda untuk
          memulai proses pendaftaran.
        </p>
      ),
      complete: (
        <p>
          Registrasi akun berhasil dilakukan. Anda dapat melanjutkan ke tahap
          berikutnya.
        </p>
      ),
    },
    2: {
      ongoing: (
        <p>
          Silakan melakukan pembayaran biaya formulir pendaftaran melalui
          transfer bank sesuai instruksi yang tertera. Setelah pembayaran,
          jangan lupa lakukan konfirmasi agar proses registrasi dapat
          dilanjutkan.
        </p>
      ),
      complete: (
        <p>
          Pembayaran formulir berhasil dikonfirmasi. Terima kasih, proses
          registrasi Anda akan dilanjutkan ke tahap berikutnya.
        </p>
      ),
    },
    3: {
      ongoing: (
        <InputBio
          userId={userId}
          onComplete={() => {
            onStepComplete();   // ✅ tetap mark step complete di dashboard
            setIsEditing(false); // ✅ kembali ke view setelah save
          }}
        />
      ),
      complete: isEditing ? (
        <InputBio
          userId={userId}
          onComplete={() => {
            onStepComplete();
            setIsEditing(false);
          }}
        />
      ) : (
        <ViewBio userId={userId} onEdit={() => setIsEditing(true)} />
      ),
    },
    4: {
      ongoing: (
        <p>
          Silakan mengikuti ujian masuk sesuai jadwal yang sudah ditentukan.
          Informasi detail terkait jadwal dan lokasi ujian dapat dilihat pada
          dashboard Anda.
        </p>
      ),
      complete: (
        <p>
          Ujian masuk telah selesai dilaksanakan. Hasil ujian akan segera
          diumumkan sesuai jadwal.
        </p>
      ),
    },
    5: {
      ongoing: (
        <p>
          Anda diminta untuk menandatangani surat persetujuan. Silakan unduh,
          baca, dan tanda tangani dokumen sesuai instruksi.
        </p>
      ),
      complete: (
        <p>
          Surat persetujuan sudah diterima. Terima kasih atas kerjasamanya,
          dokumen ini akan digunakan untuk tahap validasi berikutnya.
        </p>
      ),
    },
    6: {
      ongoing: (
        <p>
          Data dan dokumen Anda sedang divalidasi oleh tim administrasi. Proses
          ini mungkin memerlukan waktu beberapa hari.
        </p>
      ),
      complete: (
        <p>
          Validasi berhasil dilakukan. Semua data dan dokumen Anda telah
          dinyatakan lengkap dan sesuai.
        </p>
      ),
    },
    7: {
      ongoing: (
        <p>
          Harap menunggu, pengumuman resmi akan segera dipublikasikan pada
          tanggal yang ditentukan. Silakan pantau dashboard Anda secara
          berkala.
        </p>
      ),
      complete: (
        <p>
          Selamat! Pengumuman resmi sudah diterbitkan. Silakan cek hasil dan
          informasi tindak lanjut pada dashboard Anda.
        </p>
      ),
    },
  };
};
