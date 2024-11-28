type Props = {
  children: React.ReactNode;
  stockTransferModal: React.ReactNode;
};

export default function AddStockTransferModalLayout({
  children,
  stockTransferModal,
}: Props) {
  return (
    <div>
      {children}
      {stockTransferModal}
    </div>
  );
}
