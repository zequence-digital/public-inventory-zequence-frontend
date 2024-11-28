type Props = {
  children: React.ReactNode;
  stockRequestModal: React.ReactNode;
};

export default function StockRequestModalLayout({
  children,
  stockRequestModal,
}: Props) {
  return (
    <div>
      {children}
      {stockRequestModal}
    </div>
  );
}
