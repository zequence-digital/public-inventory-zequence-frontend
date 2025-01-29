"use client";

import { BackButton } from "@/components/auth/back-button";
import { Header } from "@/components/auth/header";
import { Social } from "@/components/auth/social";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { StaticImageData } from "next/image";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel?: string;
  backButtonHref?: string;
  message?: string;
  logo?: StaticImageData | string;
  showSocial?: boolean;
  socialLabel?: string;
  socialActionFn?: () => void;
  isSocialPending?: boolean;
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
  socialLabel,
  socialActionFn,
  isSocialPending,
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
          <Social
            socialActionFn={socialActionFn}
            isSocialPending={isSocialPending}
            socialLabel={socialLabel}
            className="mt-4"
          />
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
