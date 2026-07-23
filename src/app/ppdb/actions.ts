"use server";

import { createClient } from "@/utils/supabase/server";

export async function submitPpdb(formData: {
  fullName: string;
  nisn?: string;
  nik: string;
  birthPlace: string;
  birthDate: string;
  gender: string;
  religion: string;
  address: string;
  parentName: string;
  parentPhone: string;
  previousSchool?: string;
}) {
  try {
    const supabase = await createClient();

    // Generate registration number
    const today = new Date();
    const dateStr = today.toISOString().slice(0, 10).replace(/-/g, "");
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const registrationNumber = `PPDB-${dateStr}-${randomNum}`;

    const { data, error } = await supabase
      .from("ppdb")
      .insert([
        {
          registration_number: registrationNumber,
          full_name: formData.fullName,
          nisn: formData.nisn || null,
          nik: formData.nik,
          birth_place: formData.birthPlace,
          birth_date: formData.birthDate,
          gender: formData.gender,
          religion: formData.religion,
          address: formData.address,
          parent_name: formData.parentName,
          parent_phone: formData.parentPhone,
          previous_school: formData.previousSchool || null,
          status: "Pending",
        },
      ])
      .select();

    if (error) {
      console.error("Supabase insert error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data: data?.[0] };
  } catch (error: unknown) {
    console.error("PPDB Action error:", error);
    const message = error instanceof Error ? error.message : "Terjadi kesalahan server";
    return { success: false, error: message };
  }
}