import { PostService } from "@/services/post.service";
import { type Post } from "@/types/Post";

import HeroSection from "@/components/public/sections/HeroSection";
import LatestPostsSection from "@/components/public/sections/LatestPostsSection";

export default async function HomePage() {
  const featuredPosts = (await PostService.getFeaturedPosts({
    limit: 5,
  })) as Post[];

  const { data: latestPosts } = await PostService.getAll({ limit: 6 });

  return (
    <div className=" w-full mx-auto">
      <HeroSection posts={featuredPosts} />

      <LatestPostsSection posts={latestPosts as Post[]} />
      {/* <AboutSection />
      <SkillsSection />
      <CertificatesSection />
      <ProjectsSection /> */}
      {/* <ContactSection /> */}
    </div>
  );
}
