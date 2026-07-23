export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-8 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} MIS No. 32/E.3 Ujung Pasir. All rights reserved.
        </p>
        <p className="text-xs mt-2">
          Desa Ujung Pasir, Kecamatan Tanah Cogok, Kabupaten Kerinci, Provinsi Jambi
        </p>
      </div>
    </footer>
  );
}