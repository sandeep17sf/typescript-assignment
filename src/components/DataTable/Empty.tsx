import { Box, Typography } from "@mui/material";

interface EmptyBoxProps {
  message?: string;
}

export default function EmptyBox(props: EmptyBoxProps) {
  const { message = "No Data" } = props;
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flex: "1 1 100%",
        alignItems: "center",
         height: 300
      }}
    >
      <Typography  id="tableTitle" component="div">
        {message}
      </Typography>
    </Box>
  );
}
