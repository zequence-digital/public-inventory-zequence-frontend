import { SettingsTabs } from "@/components/dashboard/settings/settings-tabs";
import { Suspense } from "react";

const SettingsPage = () => {
  return (
    <Suspense>
      <SettingsTabs />
    </Suspense>
  );
};

export default SettingsPage;
