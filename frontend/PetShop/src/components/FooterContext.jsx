import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TikTokIcon from "@mui/icons-material/MusicNote";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";
// eslint-disable-next-line no-unused-vars
import React from "react";

const FooterContext = () => {
  return (
    <div className="text-center bg-[#1769aa] text-white  p-5 m-0 mt-10">
      <h1 className="text-3xl font-bold mb-4">PetShop</h1>
      <p className="text-xl mb-6">
        &quot;Where Every Pet Finds a Home and Every Owner Finds a Friend.&quot;
        — My shop
      </p>
      <div className="flex justify-center space-x-4">
        <a href="https://www.facebook.com/?locale=vi_VN">
          <FacebookIcon className="text-2xl hover:text-gray-300 transition-colors" />
        </a>
        <a href="https://www.instagram.com/">
          <InstagramIcon className="text-2xl hover:text-gray-300 transition-colors" />
        </a>
        <a href="https://www.youtube.com/">
          <YouTubeIcon className="text-2xl hover:text-gray-300 transition-colors" />
        </a>
        <a href="https://x.com/?lang=vi&mx=2">
          <XIcon className="text-2xl hover:text-gray-300 transition-colors" />
        </a>
        <a href="https://www.linkedin.com/feed/">
          <LinkedInIcon className="text-2xl hover:text-gray-300 transition-colors" />
        </a>
        <a href="https://www.tiktok.com/">
          <TikTokIcon className="text-2xl hover:text-gray-300 transition-colors" />
        </a>
      </div>
      <p className="mt-6 text-sm">Copyright © 2025, PetShop, Inc.</p>
    </div>
  );
};

export default FooterContext;
