import { Box, Text } from "@mantine/core";
import NavbarMobile from "../components/NavbarMobile";

const PlantLibrary = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "calc(100vh - 100px)",
      }}
    >
      <Text size="xl" weight="bold" align="center">
        library
      </Text>
      <NavbarMobile/>
    </Box>
  );
};

export default PlantLibrary;