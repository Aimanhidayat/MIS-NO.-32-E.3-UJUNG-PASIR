"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/toast";

export default function PpdbForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    nisn: "",
    nik: "",
    birthPlace: "",
    birthDate: "",
    gender: "",
    religion: "",
    address: "",
    parentName: "",
    parentPhone: "",
    previousSchool: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    console.log("Form Data Submitted:", formData);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast.add({
      title: "Pendaftaran Berhasil!",
      description:
        "Terima kasih telah mendaftar PPDB. Kami akan segera memproses data Anda.",
      type: "success",
    });

    setIsLoading(false);
    setFormData({
      fullName: "",
      nisn: "",
      nik: "",
      birthPlace: "",
      birthDate: "",
      gender: "",
      religion: "",
      address: "",
      parentName: "",
      parentPhone: "",
      previousSchool: "",
    });
  };

  return (
    <section className="container mx-auto max-w-3xl px-4">
      <div className="rounded-2xl border bg-white p-8 shadow-sm">
        <h2 className="mb-8 text-center font-heading text-2xl font-bold text-primary">
          Formulir Pendaftaran
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <fieldset className="space-y-4 rounded-lg border p-6">
            <legend className="px-2 text-lg font-semibold text-foreground">
              Data Calon Siswa
            </legend>
            <div>
              <Label htmlFor="fullName">Nama Lengkap</Label>
              <Input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="nisn">NISN (Opsional)</Label>
                <Input
                  id="nisn"
                  type="text"
                  value={formData.nisn}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="nik">NIK</Label>
                <Input
                  id="nik"
                  type="text"
                  value={formData.nik}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="birthPlace">Tempat Lahir</Label>
                <Input
                  id="birthPlace"
                  type="text"
                  value={formData.birthPlace}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="birthDate">Tanggal Lahir</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="gender">Jenis Kelamin</Label>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange("gender", value ?? "")
                  }
                  value={formData.gender}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Jenis Kelamin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                    <SelectItem value="Perempuan">Perempuan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="religion">Agama</Label>
                <Input
                  id="religion"
                  type="text"
                  value={formData.religion}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="address">Alamat Lengkap</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
          </fieldset>

          <fieldset className="space-y-4 rounded-lg border p-6">
            <legend className="px-2 text-lg font-semibold text-foreground">
              Data Orang Tua/Wali
            </legend>
            <div>
              <Label htmlFor="parentName">Nama Orang Tua/Wali</Label>
              <Input
                id="parentName"
                type="text"
                value={formData.parentName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="parentPhone">Nomor Telepon Orang Tua/Wali</Label>
              <Input
                id="parentPhone"
                type="tel"
                value={formData.parentPhone}
                onChange={handleChange}
                required
              />
            </div>
          </fieldset>

          <fieldset className="space-y-4 rounded-lg border p-6">
            <legend className="px-2 text-lg font-semibold text-foreground">
              Data Sekolah Asal
            </legend>
            <div>
              <Label htmlFor="previousSchool">Nama Sekolah Asal</Label>
              <Input
                id="previousSchool"
                type="text"
                value={formData.previousSchool}
                onChange={handleChange}
              />
            </div>
          </fieldset>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90"
            disabled={isLoading}
          >
            {isLoading ? "Mengirim..." : "Daftar Sekarang"}
          </Button>
        </form>
      </div>
    </section>
  );
}