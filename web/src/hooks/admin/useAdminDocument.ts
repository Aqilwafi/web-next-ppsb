// hooks/admin/useAdminDocuments.ts
"use client";

import { useState, useEffect } from "react";
import {
  Student,
  DocumentStatus,
  fetchStudents,
  upsertDocumentStatus,
} from "@/services/admin/serviceDokumen";

export function useAdminDocuments() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [docStatus, setDocStatus] = useState<Record<string, DocumentStatus>>({});

  // 🔹 Fetch data siswa saat mount
  useEffect(() => {
    let isMounted = true;

    const loadStudents = async () => {
      setLoading(true);
      try {
        const data = await fetchStudents();
        if (!isMounted) return;
        setStudents(data);
      } catch (err) {
        console.error(err);
        if (isMounted) setError("Gagal mengambil data siswa");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadStudents();

    return () => {
      isMounted = false;
    };
  }, []);

  // 🔹 Buka modal detail
  const openModal = (student: Student) => {
    setSelectedStudent(student);
    setDocStatus({ ...student.statusDokumen });
  };

  const closeModal = () => {
    setSelectedStudent(null);
    setDocStatus({});
  };

  // 🔹 Aksi approve / reject / edit dokumen
  const handleApprove = (doc: keyof Student["statusDokumen"]) => {
    setDocStatus((prev) => ({ ...prev, [doc]: "approved" }));
  };

  const handleReject = (doc: keyof Student["statusDokumen"]) => {
    setDocStatus((prev) => ({ ...prev, [doc]: "rejected" }));
  };

  const handleEdit = (doc: keyof Student["statusDokumen"]) => {
    setDocStatus((prev) => ({ ...prev, [doc]: "pending" }));
  };

  // 🔹 Submit semua status dokumen untuk siswa yang sedang dibuka modal
  const submitStatus = async () => {
    if (!selectedStudent) return;

    try {
      for (const doc of Object.keys(docStatus) as (keyof Student["statusDokumen"])[]) {
        if (docStatus[doc] !== selectedStudent.statusDokumen[doc]) {
          await upsertDocumentStatus(selectedStudent.id, doc, docStatus[doc]);
        }
      }

      // update lokal supaya tabel utama sync
      setStudents((prev) =>
        prev.map((s) =>
          s.id === selectedStudent.id ? { ...s, statusDokumen: { ...docStatus } } : s
        )
      );

      closeModal();
    } catch (err) {
      console.error(err);
      alert("Gagal submit status dokumen");
    }
  };

  return {
    students,
    loading,
    error,
    selectedStudent,
    docStatus,
    openModal,
    closeModal,
    handleApprove,
    handleReject,
    handleEdit,
    submitStatus,
  };
}
