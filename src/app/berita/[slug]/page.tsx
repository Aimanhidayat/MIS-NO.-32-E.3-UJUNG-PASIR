import { notFound } from "next/navigation";
import Image from "next/image";
import { CalendarDays, User } from "lucide-react";
import { createClient } from "@/utils/supabase/server";

interface NewsDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: newsItem } = await supabase
    .from("news")
    .select("title, content")
    .eq("slug", slug)
    .eq("status", "Published")
    .single();

  if (!newsItem) {
    return {
      title: "Berita Tidak Ditemukan | MIS No. 32/E.3 Ujung Pasir",
    };
  }

  const plainText = newsItem.content.replace(/<[^>]+>/g, "");

  return {
    title: `${newsItem.title} | MIS No. 32/E.3 Ujung Pasir`,
    description: `${plainText.substring(0, 150)}...`,
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: newsItem, error } = await supabase
    .from("news")
    .select("*")
    .eq("slug", slug)
    .eq("status", "Published")
    .single();

  if (error || !newsItem) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <article className="rounded-xl border bg-white p-6 shadow-sm md:p-8">
        <h1 className="mb-6 font-heading text-3xl font-bold text-primary md:text-4xl">
          {newsItem.title}
        </h1>
        <div className="mb-6 flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <User size={16} className="text-primary" />
            <span>{newsItem.author || "Admin Sekolah"}</span>
          </div>
          <div className="flex items-center gap-1">
            <CalendarDays size={16} className="text-primary" />
            <span>
              {new Date(
                newsItem.published_at || newsItem.created_at,
              ).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>

        {newsItem.image_url ? (
          <div className="relative mb-8 h-64 w-full overflow-hidden rounded-lg md:h-96">
            <Image
              src={newsItem.image_url}
              alt={newsItem.title}
              fill
              className="object-cover"
            />
          </div>
        ) : null}

        <div
          className="prose prose-lg max-w-none leading-relaxed text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: newsItem.content }}
        />
      </article>
    </div>
  );
}