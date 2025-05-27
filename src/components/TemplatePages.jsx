import React, { useState } from 'react';
import { Rocket, PenTool, Share2, Mail, Megaphone, FileText, Zap, MessageSquare, Send, Target, ArrowLeft, Loader2, Copy, Check } from "lucide-react";
import BlogPostTemplate from './Templates/BlogPostTemplate.jsx';
import BlogOutlineTemplate from './Templates/BlogOutlineTemplate.jsx';
import SocialPostTemplate from './Templates/SocialPostTemplate';
import SocialCampaignTemplate from './Templates/SocialCampaignTemplate.jsx';
import NewsletterTemplate from './Templates/NewsletterTemplate';
import PromotionalEmailTemplate from './Templates/PromotionalEmailTemplate.jsx';
import FollowupEmailTemplate from './Templates/FollowupEmailTemplate.jsx';
import AdCopyTemplate from './Templates/AdCopyTemplate';
import AdHeadlineTemplate from './Templates/AdHeadlineTemplate';





export const TemplatePages = {
    "blog-post": {
        title: "Blog Post Template",
        icon: FileText,
        content: <BlogPostTemplate />
    },
    "social-post": {
        title: "Social Post Template",
        icon: Share2,
        content: <SocialPostTemplate/>
    
    }
        ,

    "newsletter": {
        title: "Newsletter Template",
        icon: Mail,
        content: < NewsletterTemplate/>
    },

    "ad-copy": {
        title: "Ad Copy Template",
        icon: Megaphone,
        content: < AdCopyTemplate />
    },

    // Add other templates following the same pattern...
    "blog-outline": {
        title: "Blog Outline Template",
        icon: PenTool,
        content: <BlogOutlineTemplate />
    },

    "social-campaign": {
        title: "Social Campaign Template", 
        icon: Rocket,
        content: <SocialCampaignTemplate />
    },

    "promotional-email": {
        title: "Promotional Email Template",
        icon: Send,
        content: <PromotionalEmailTemplate />
    },

    "followup-email": {
        title: "Follow-up Email Template",
        icon: FileText,
        content: <FollowupEmailTemplate/>
    },

  "ad-headline": {
    title: "Ad Headline Template",
    icon: PenTool,
    content: < AdHeadlineTemplate/>
  }
};

export default TemplatePages;
