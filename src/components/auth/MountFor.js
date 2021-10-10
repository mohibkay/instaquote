const MountFor = ({ children, allowMount }) => {
  return allowMount ? children : null;
};

export default MountFor;
