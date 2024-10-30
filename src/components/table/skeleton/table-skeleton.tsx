export const TableSkeleton = () => {
  return (
    <div className="SA-table-holder mt-10">
      <table className="border-block w-full table-auto border-collapse ">
        <tbody className="bg-1000px [&>*:nth-child(odd)]:animate-shimmer [&>*:nth-child(odd)]:bg-shimmer">
          {Array.from({ length: 10 }, () => null).map((_, idx) => (
            <tr key={idx}>
              <td className="mb-3 h-10 w-full animate-shimmer bg-1000px"></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
