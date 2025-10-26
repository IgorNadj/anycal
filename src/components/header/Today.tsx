import { Button } from "@mui/material";

type Props = {
  setCurrentDate: (newDate: Date) => void;
};

export const Today = ({ setCurrentDate }: Props) => {
  const onClick = () => {
    setCurrentDate(new Date());
  };

  return (
    <Button variant="outlined" onClick={onClick}>
      Today
    </Button>
  );
};
