import PpdbForm from "./PpdbForm";

export const metadata = {
  title: "PPDB Online | MIS No. 32/E.3 Ujung Pasir",
};

export default function PpdbPage() {
  return (
    <div className="flex flex-col gap-12 pb-16">
      <section className="bg-primary px-4 py-20 text-center text-primary-foreground">
        <h1 className="mb-4 font-heading text-4xl font-bold">
          Pendaftaran PPDB Online
        </h1>
        <p className="mx-auto max-w-2xl text-lg opacity-90">
          Daftarkan putra-putri Anda di MIS No. 32/E.3 Ujung Pasir dengan mudah
          melalui formulir online ini.
        </p>
      </section>

      <PpdbForm />
    </div>
  );
}
