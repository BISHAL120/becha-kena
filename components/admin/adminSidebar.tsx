"use client";

import {
  BikeIcon,
  FolderTree,
  Handshake,
  Home,
  Settings,
  Settings2,
  Store,
  UserCheck2Icon,
  Users2,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

const mainMenuItems = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: Home,
  },
];

const benefitsMenuItems = [
  {
    title: "Benefits",
    url: "/benefits",
    icon: Handshake,
    subItems: [
      {
        title: "Add Benefits",
        url: "/admin/benefits",
      },
      {
        title: "History",
        url: "/admin/benefits/history",
      },
    ],
  },
];

const userMenuItems = [
  {
    title: "Users",
    url: "/users",
    icon: Users2,
    subItems: [
      {
        title: "All Users",
        url: "/admin/users/all",
      },
      {
        title: "In-Active Users",
        url: "/admin/users/inActive",
      },
      {
        title: "Merchants",
        url: "/admin/users/merchants",
      },
    ],
  },
];

const Accounts = [
  {
    title: "Account Activations",
    url: "/settings",
    icon: Settings,
    subItems: [
      {
        title: "User List",
        url: "/admin/settings/id-active/allActivation",
      },
      {
        title: "Merchant List",
        url: "/admin/settings/merchant-upgrade/allUpgrade",
      },
      /* {
        title: "Active Pricing",
        url: "/admin/settings/id-active/new",
      },
      {
        title: "Price History",
        url: "/admin/settings/id-active",
      },
      {
        title: "Merchant Pricing",
        url: "/admin/settings/merchant-upgrade/new",
      },
      {
        title: "Price History",
        url: "/admin/settings/merchant-upgrade",
      }, */
    ],
  },
];

const ActivationPricing = [
  {
    title: "Activations Pricing",
    url: "/settings",
    icon: UserCheck2Icon,
    subItems: [
      {
        title: "History",
        url: "/admin/settings/id-active",
      },
      {
        title: "Add New",
        url: "/admin/settings/id-active/new",
      },
    ],
  },
];

const MerchantPricing = [
  {
    title: "Merchants Pricing",
    url: "/settings",
    icon: Settings2,
    subItems: [
      {
        title: "History",
        url: "/admin/settings/merchant-upgrade",
      },
      {
        title: "Add New",
        url: "/admin/settings/merchant-upgrade/new",
      },
    ],
  },
];

const partnersMenuItems = [
  {
    title: "Partners",
    url: "/partners",
    icon: BikeIcon,
    subItems: [
      {
        title: "All Partners",
        url: "/admin/partners",
      },
      {
        title: "Add Partners",
        url: "/admin/partners/new",
      },
    ],
  },
];
const productMenuItems = [
  {
    title: "Categories",
    url: "/categories",
    icon: FolderTree,
    subItems: [
      {
        title: "All Categories",
        url: "/admin/categories",
      },
      {
        title: "Add Category",
        url: "/admin/categories/new",
      },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (url: string) => {
    if (url === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(url);
  };

  type TypeActiveSubitem = {
    title: string;
    url: string;
  };

  const hasActiveSubItem = (subItems: TypeActiveSubitem[] | []) => {
    return subItems?.some((item) => pathname.startsWith(item.url));
  };

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="border-b p-4 h-16">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Store className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Becha-Kena Admin</span>
            <span className="text-xs text-muted-foreground">
              Product Reselling Platform
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="pb-16 gap-1">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {pathname !== "/admin" && (
                <SidebarMenuItem>
                  <SidebarMenuButton className="w-full p-2">
                    <Link
                      href={"/admin"}
                      className="w-full flex gap-2 items-center"
                    >
                      <Home className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
              {mainMenuItems.map((item, index) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <Link
                      href={item.url}
                      className={`${
                        index === 0 && pathname !== "/admin" ? "hidden" : ""
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Users Management */}
        <SidebarGroup>
          <SidebarGroupLabel>Users Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {userMenuItems.map((item) => (
                <Collapsible
                  key={item.title}
                  defaultOpen={hasActiveSubItem(item.subItems || [])}
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton isActive={isActive(item.url)}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    {item.subItems && (
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.subItems.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={pathname === subItem.url}
                              >
                                <Link href={subItem.url}>
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    )}
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Benefits Management */}
        <SidebarGroup>
          <SidebarGroupLabel>Users Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {benefitsMenuItems.map((item) => (
                <Collapsible
                  key={item.title}
                  defaultOpen={hasActiveSubItem(item.subItems || [])}
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton isActive={isActive(item.url)}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    {item.subItems && (
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.subItems.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={pathname === subItem.url}
                              >
                                <Link href={subItem.url}>
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    )}
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Account Management */}
        <SidebarGroup>
          <SidebarGroupLabel>Accounts Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {Accounts.map((item) => (
                <Collapsible
                  key={item.title}
                  defaultOpen={hasActiveSubItem(item.subItems || [])}
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton isActive={isActive(item.url)}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    {item.subItems && (
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.subItems.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={pathname === subItem.url}
                              >
                                <Link href={subItem.url}>
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    )}
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Activation Management */}
        <SidebarGroup>
          <SidebarGroupLabel>Users</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {ActivationPricing.map((item) => (
                <Collapsible
                  key={item.title}
                  defaultOpen={hasActiveSubItem(item.subItems || [])}
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton isActive={isActive(item.url)}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    {item.subItems && (
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.subItems.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={pathname === subItem.url}
                              >
                                <Link href={subItem.url}>
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    )}
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Merchants Management */}
        <SidebarGroup>
          <SidebarGroupLabel>Merchants</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {MerchantPricing.map((item) => (
                <Collapsible
                  key={item.title}
                  defaultOpen={hasActiveSubItem(item.subItems || [])}
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton isActive={isActive(item.url)}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    {item.subItems && (
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.subItems.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={pathname === subItem.url}
                              >
                                <Link href={subItem.url}>
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    )}
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Users Management */}
        <SidebarGroup>
          <SidebarGroupLabel>Categories Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {productMenuItems.map((item) => (
                <Collapsible
                  key={item.title}
                  defaultOpen={hasActiveSubItem(item.subItems || [])}
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton isActive={isActive(item.url)}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    {item.subItems && (
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.subItems.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={pathname === subItem.url}
                              >
                                <Link href={subItem.url}>
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    )}
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Courier  Management */}
        <SidebarGroup>
          <SidebarGroupLabel>Courier Partners</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {partnersMenuItems.map((item) => (
                <Collapsible
                  key={item.title}
                  defaultOpen={hasActiveSubItem(item.subItems || [])}
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton isActive={isActive(item.url)}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    {item.subItems && (
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.subItems.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={pathname === subItem.url}
                              >
                                <Link href={subItem.url}>
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    )}
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* s */}
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Admin User</span>
            <span className="text-xs text-muted-foreground">
              admin@example.com
            </span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
