import TerminalUI from '@/components/terminal/TerminalUI';

interface ShellProps {
  open: boolean;
  onClose: () => void;
  isBooting?: boolean;
}
export default function Shell({ open, onClose, isBooting = false }: ShellProps) {
  return <TerminalUI open={open} onClose={onClose} isBooting={isBooting} />;
}