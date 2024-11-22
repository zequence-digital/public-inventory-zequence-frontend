import { CSVLink } from "react-csv";
import CustomButton from "@/components/dashboard/custom-button";
import { Data } from "react-csv/lib/core";
import exportIcon from "/public/icons/import.svg";

interface Props<TItems> {
  items: TItems;
  fileName: string;
  csvData: string | Data | (() => string | Data);
}

export function ExportToCsv<TItems>({
  items,
  csvData,
  fileName,
}: Props<TItems>) {
  return (
    <>
      {Array.isArray(items) && items.length > 0 && (
        <CSVLink filename={fileName} data={csvData}>
          <CustomButton src={exportIcon} alt="Export Icon" label="Export" />
        </CSVLink>
      )}
    </>
  );
}
