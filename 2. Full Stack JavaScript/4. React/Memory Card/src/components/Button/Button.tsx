export default function Button({
  onClick,
  children,
}: {
  onClick: React.EventHandler<any>;
  children: React.ReactNode;
}) {
  return <button onClick={onClick}>{children}</button>;
}
