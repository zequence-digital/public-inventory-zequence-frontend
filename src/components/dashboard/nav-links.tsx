"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { ApiErrorMessage } from "../messages/api-error-message";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { links } from "@/routes";
import { useNotificationStatus } from "@/hooks/use-notifications";
import { useNotifications } from "@/queries/notifications";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();
  const { readStatus } = useNotificationStatus();
  const {
    data: notifications,
    isError,
    isPending,
    error,
  } = useNotifications(readStatus);

  return (
    <>
      <Accordion
        type="single"
        collapsible
        className="flex md:flex-col md:gap-2 flex-row w-fit md:w-full"
      >
        {links.map((link) => {
          const Icon = link.IconComponent;

          return (
            <AccordionItem
              key={link.name}
              value={link.name}
              className="md:flex-grow flex-grow-0 border-none md:[&>svg]:block [&>svg]:hidden  "
            >
              <AccordionTrigger
                className={cn(
                  `hover:no-underline flex  items-center group py-2 px-3 rounded-md text-sm font-medium grow  hover:bg-primary-100/80  md:flex-none md:justify-start data-[state=open]:bg-primary-100 hover:text-white [&[data-state=open]>*]:text-white [&>svg]:hover:text-white md:w-full w-fit [&>svg]:ml-auto [&[data-state=open]>div>svg]:stroke-white`,
                  {},
                )}
              >
                <div className="flex items-center gap-2 svg__sibling shrink-0">
                  <Icon
                    className={cn(
                      `size-5 
												 inline-block
												stroke-muted-200 group-hover:stroke-white transition-all duration-300 ease-in-out`,
                    )}
                  />
                  <p className="hidden md:block">{link.name}</p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="flex-grow">
                {link.subLinks && (
                  <ul className="flex flex-col gap-1">
                    {link.subLinks.map((subLink) => {
                      const activeLink = pathname === subLink.href;
                      return (
                        <li
                          key={subLink.name}
                          className={cn(
                            `group hover:text-primary-100/80 px-3 py-2 text-sm font-medium transition-all duration-300 ease-in-out rounded-md mt-2 hover:bg-muted-700`,
                            {
                              "bg-muted-700": activeLink,
                            },
                          )}
                        >
                          <Link
                            href={subLink.href}
                            className={cn(
                              `flex items-center gap-2 w-full h-full`,
                              {
                                "font-semibold text-primary-100": activeLink,
                              },
                            )}
                          >
                            <p className="flex items-center justify-between gap-2 w-full">
                              <span className=" inline-block md:ml-8">
                                {subLink.name}
                              </span>

                              {subLink.name === "Notifications" && (
                                <span className="bg-secondary-200/20 text-secondary-200 rounded-full min-w-[36px] min-h-6 inline-flex items-center justify-center ml-auto">
                                  {isError && (
                                    <ApiErrorMessage message={error.message} />
                                  )}
                                  {isPending && (
                                    <span className="animate-pulse bg-slate-300 size-4 rounded-full" />
                                  )}
                                  {notifications?.data &&
                                  notifications?.data?.length > 99
                                    ? "99+"
                                    : notifications?.data?.length}
                                </span>
                              )}
                            </p>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </>
  );
}
