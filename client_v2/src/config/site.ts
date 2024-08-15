export type SiteConfig = typeof siteConfig;

export const siteConfig = {
    name: "Vite + NextUI",
    description:
        "Make beautiful websites regardless of your design experience.",
    navItems: [
        {
            label: "Random Recipe",
            href: "/random-recipe",
        },
        {
            label: "AI Analyzer",
            href: "/",
        },
        {
            label: "Log",
            href: "/log",
        },
    ],
    navMenuItems: [
        {
            label: "Profile",
            href: "/profile",
        },
        {
            label: "Dashboard",
            href: "/dashboard",
        },
        {
            label: "Projects",
            href: "/projects",
        },
        {
            label: "Team",
            href: "/team",
        },
        {
            label: "Calendar",
            href: "/calendar",
        },
        {
            label: "Settings",
            href: "/settings",
        },
        {
            label: "Help & Feedback",
            href: "/help-feedback",
        },
        {
            label: "Logout",
            href: "/logout",
        },
    ],
    links: {
        github: "https://github.com/ashubanjara",
        twitter: "https://twitter.com/getnextui",
        docs: "https://nextui-docs-v2.vercel.app",
        discord: "https://discord.gg/9b6yyZKmH4",
        sponsor: "https://patreon.com/jrgarciadev",
    },
};