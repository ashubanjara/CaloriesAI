import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import {
    Navbar as NextUINavbar,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    NavbarBrand,
} from "@nextui-org/navbar";
import { link as linkStyles } from "@nextui-org/theme";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
    GithubIcon,
    SearchIcon,
} from "@/components/icons";
import { Logo } from "@/components/icons";
import { title } from "./primitives";
import { useLocation } from "react-router-dom"

export const Navbar = () => {

    const location = useLocation()


    return (
        <NextUINavbar
        classNames={{
          item: [
            "flex",
            "relative",
            "h-full",
            "items-center",
            "transition",
            "data-[active=true]:after:content-['']",
            "data-[active=true]:after:absolute",
            "data-[active=true]:after:bottom-0",
            "data-[active=true]:after:left-0",
            "data-[active=true]:after:right-0",
            "data-[active=true]:after:h-[2px]",
            "data-[active=true]:after:rounded-[2px]",
            "data-[active=true]:after:bg-secondary",
          ],
        }}
      >
            <NavbarBrand
                className="hidden sm:flex sm:basis-full"
            >
                <p className={title({color: "violet", size:"sm"})}>Nutrition AI</p>
            </NavbarBrand>
            
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                {siteConfig.navItems.map((item) => (
                    <NavbarItem key={item.href} isActive={location.pathname === item.href}>
                        <Link
                            className={"text-large font-medium"}
                            color="foreground"
                            href={item.href}
                        >
                            {item.label}
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarContent>

            <NavbarContent
                className="hidden sm:flex basis-1/5 sm:basis-full"
                justify="end"
            >
                <NavbarItem className="hidden sm:flex gap-2">
                    <Link isExternal href={siteConfig.links.github}>
                        <GithubIcon className="text-default-500" />
                    </Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
                <Link isExternal href={siteConfig.links.github}>
                    <GithubIcon className="text-default-500" />
                </Link>
                <ThemeSwitch />
                <NavbarMenuToggle />
            </NavbarContent>

            <NavbarMenu>
                <div className="mx-4 mt-2 flex flex-col gap-2">
                    {siteConfig.navMenuItems.map((item, index) => (
                        <NavbarMenuItem key={`${item}-${index}`}>
                            <Link
                                color={
                                    index === 2
                                        ? "primary"
                                        : index ===
                                            siteConfig.navMenuItems.length - 1
                                          ? "danger"
                                          : "foreground"
                                }
                                href="#"
                                size="lg"
                            >
                                {item.label}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                </div>
            </NavbarMenu>
        </NextUINavbar>
    );
};

