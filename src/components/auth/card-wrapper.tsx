"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { BackButton } from "@/components/auth/back-button";
import { Header } from "@/components/auth/header";
import { Social } from "@/components/auth/social";
import { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel?: string;
  backButtonHref?: string;
  message?: string;
  logo?: StaticImageData | string;
  showSocial?: boolean;
  actionLabel?: string;
  className?: string;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  message,
  logo,
  showSocial,
  actionLabel,
  className,
}: CardWrapperProps) => {
  return (
    <Card
      className={cn(`max-w-2xl w-full shadow-none border-none p-0`, className)}
    >
      <CardHeader>
        <Header
          logo={typeof logo === "string" ? logo : logo?.src}
          message={message}
          label={headerLabel}
        />
      </CardHeader>
      <CardContent className="p-0">{children}</CardContent>
      {showSocial && (
        <CardFooter className="p-0">
          <Social className="mt-4" />
        </CardFooter>
      )}
      <CardFooter>
        {backButtonHref && (
          <BackButton
            label={backButtonLabel || ""}
            href={backButtonHref}
            actionLabel={actionLabel}
          />
        )}
      </CardFooter>
    </Card>
  );
};
