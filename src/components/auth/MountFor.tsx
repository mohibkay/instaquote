interface MountForProps {
  children: React.ReactNode;
  allowMount: boolean;
}

const MountFor = ({ children, allowMount }: MountForProps) => {
  return allowMount ? children : null;
};

export default MountFor;
