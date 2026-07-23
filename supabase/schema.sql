-- Hapus tabel jika sudah ada (Opsional untuk testing, hati-hati di production)
-- DROP TABLE IF EXISTS ...

-- 1. Profiles (Extend Supabase Auth Users)
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'Operator' CHECK (role IN ('Super Admin', 'Kepala Sekolah', 'Operator', 'Guru')),
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone." ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile." ON profiles FOR UPDATE USING (auth.uid() = id);

-- 2. Teachers (Guru & Tenaga Kependidikan)
CREATE TABLE teachers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    nip VARCHAR(50),
    position VARCHAR(100) NOT NULL,
    subject VARCHAR(100),
    photo_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Teachers are viewable by everyone." ON teachers FOR SELECT USING (true);
CREATE POLICY "Admins can insert teachers." ON teachers FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins can update teachers." ON teachers FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can delete teachers." ON teachers FOR DELETE USING (auth.role() = 'authenticated');

-- 3. News (Berita)
CREATE TABLE news (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    thumbnail_url TEXT,
    author_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    status VARCHAR(50) DEFAULT 'Draft' CHECK (status IN ('Draft', 'Published', 'Archived')),
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE news ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published news are viewable by everyone." ON news FOR SELECT USING (status = 'Published' OR auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can insert news." ON news FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update news." ON news FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete news." ON news FOR DELETE USING (auth.role() = 'authenticated');

-- 4. Announcements (Pengumuman)
CREATE TABLE announcements (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Active announcements viewable by everyone." ON announcements FOR SELECT USING (is_active = true OR auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage announcements." ON announcements FOR ALL USING (auth.role() = 'authenticated');

-- 5. Achievements (Prestasi)
CREATE TABLE achievements (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    student_name VARCHAR(255) NOT NULL,
    level VARCHAR(100) NOT NULL,
    year INTEGER NOT NULL,
    description TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Achievements viewable by everyone." ON achievements FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage achievements." ON achievements FOR ALL USING (auth.role() = 'authenticated');

-- 6. Galleries (Galeri)
CREATE TABLE galleries (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    category VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE galleries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Galleries viewable by everyone." ON galleries FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage galleries." ON galleries FOR ALL USING (auth.role() = 'authenticated');

-- 7. Videos (Video Kegiatan)
CREATE TABLE videos (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    youtube_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Videos viewable by everyone." ON videos FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage videos." ON videos FOR ALL USING (auth.role() = 'authenticated');

-- 8. Downloads (Dokumen Unduhan)
CREATE TABLE downloads (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    file_url TEXT NOT NULL,
    category VARCHAR(100),
    is_public BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE downloads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public downloads viewable by everyone." ON downloads FOR SELECT USING (is_public = true OR auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage downloads." ON downloads FOR ALL USING (auth.role() = 'authenticated');

-- 9. PPDB (Penerimaan Peserta Didik Baru)
CREATE TABLE ppdb (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    registration_number VARCHAR(50) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    nisn VARCHAR(20),
    nik VARCHAR(20) NOT NULL,
    birth_place VARCHAR(100) NOT NULL,
    birth_date DATE NOT NULL,
    gender VARCHAR(10) CHECK (gender IN ('Laki-laki', 'Perempuan')),
    religion VARCHAR(50),
    address TEXT NOT NULL,
    parent_name VARCHAR(255) NOT NULL,
    parent_phone VARCHAR(20) NOT NULL,
    previous_school VARCHAR(255),
    status VARCHAR(50) DEFAULT 'Pending' CHECK (status IN ('Pending', 'Approved', 'Rejected')),
    documents JSONB, -- Simpan URL dokumen pendukung
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE ppdb ENABLE ROW LEVEL SECURITY;
-- PPDB can be inserted by anyone (public registration)
CREATE POLICY "Anyone can insert PPDB registration." ON ppdb FOR INSERT WITH CHECK (true);
-- PPDB details only viewable by authenticated users (Admin/Operator) or by matching registration_number (could use edge function for checking)
CREATE POLICY "Admins can view and manage PPDB." ON ppdb FOR ALL USING (auth.role() = 'authenticated');

-- 10. Agendas (Agenda Sekolah)
CREATE TABLE agendas (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE,
    location VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE agendas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Agendas viewable by everyone." ON agendas FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage agendas." ON agendas FOR ALL USING (auth.role() = 'authenticated');

-- 11. Settings (Pengaturan Web)
CREATE TABLE settings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    key VARCHAR(100) UNIQUE NOT NULL,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Settings viewable by everyone." ON settings FOR SELECT USING (true);
CREATE POLICY "Only admins can manage settings." ON settings FOR ALL USING (auth.role() = 'authenticated'); -- Di real app, gunakan role super admin

-- Storage Buckets Configuration (Run in Supabase Dashboard SQL Editor or via API)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('logo', 'logo', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('teachers', 'teachers', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('news', 'news', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('gallery', 'gallery', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('achievement', 'achievement', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('ppdb', 'ppdb', false);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('downloads', 'downloads', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('banner', 'banner', true);